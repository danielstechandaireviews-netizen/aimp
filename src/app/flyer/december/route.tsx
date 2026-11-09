import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import { bootcamp, currentCohort, getBootcampRoute, registrationPath, type BootcampRoute } from "@/content/bootcamps";
import { getCourse } from "@/content/courses";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

const fontDir = join(process.cwd(), "src", "assets", "fonts");
const fonts = Promise.all([readFile(join(fontDir, "bricolage-600.woff")), readFile(join(fontDir, "bricolage-800.woff"))]);
const portrait = readFile(join(process.cwd(), "public", "images", "daniel-makonor.jpg"))
  .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`)
  .catch(() => null);

const green = "#3ee08f";
const gold = "#f7c948";
const violet = "#a878ff";
const ink = "#100e22";
const muted = "#b9b6d3";
const soft = "#e4e2f2";

const accents: Record<BootcampRoute, string> = { "ai-app-development": green, "ai-automation": gold, "agentic-ai": violet };
const sizes = { portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 630] } as const;
type Format = keyof typeof sizes;

/**
 * December campaign banners. /flyer/december, plus:
 *   ?route=ai-app-development | ai-automation | agentic-ai   one skill route
 *   ?format=portrait (1080×1350) | story (1080×1920) | landscape (1200×630)
 * Price, routes and projects come from the content files. Each QR code opens that banner's registration link.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const requested = params.get("format");
  const format: Format = requested === "story" || requested === "landscape" ? requested : "portrait";
  const route = getBootcampRoute(params.get("route") ?? "");
  const [width, height] = sizes[format];
  const story = format === "story";
  const landscape = format === "landscape";

  const path = route ? registrationPath(route.route) : currentCohort.path;
  const [[semibold, extrabold], photo, qrCode] = await Promise.all([
    fonts,
    portrait,
    QRCode.toDataURL(`${absoluteUrl(path)}?ref=qr`, { margin: 1, width: 360, color: { dark: ink, light: "#ffffff" } }),
  ]);

  const accent = route ? accents[route.route] : green;
  const finale = accent === gold ? green : gold;
  const headline = route?.headline ?? ["Step into 2027", "with a new", "income stream."];
  const label = route ? `${route.track} bootcamp` : `${currentCohort.month} cohort`;
  const sub = route?.pitch ?? "One focused month. One AI skill that pays. Be ready to earn.";
  const listTitle = route ? "You'll build" : "Choose your route";
  const list = route ? (getCourse(route.slug)?.projects ?? []).map((p) => p.title) : bootcamp.courses.map((c) => c.track);
  const displayUrl = `${siteConfig.domain}${path}`;
  const price = `$${bootcamp.price.USD}`;

  const headlineSize = story ? 124 : landscape ? 70 : 106;
  const photoW = story ? 400 : landscape ? 340 : 300;
  const photoH = story ? 490 : landscape ? 470 : 366;
  const stickerSize = story ? 230 : landscape ? 170 : 190;

  const brandRow = (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${green}, ${gold})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: ink,
          fontSize: 32,
          fontWeight: 800,
        }}
      >
        A
      </div>
      <div style={{ display: "flex", fontSize: 38, fontWeight: 800 }}>
        <span>AIMoni</span>
        <span style={{ color: green }}>Point</span>
      </div>
    </div>
  );

  const labelPill = (
    <div
      style={{
        display: "flex",
        alignSelf: "flex-start",
        fontSize: landscape ? 20 : 25,
        fontWeight: 800,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: ink,
        background: accent,
        padding: "8px 24px",
        borderRadius: 999,
      }}
    >
      {label} · Live online
    </div>
  );

  const headlineBlock = (
    <div style={{ display: "flex", flexDirection: "column", fontSize: headlineSize, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
      <span>{headline[0]}</span>
      <span style={{ color: accent }}>{headline[1]}</span>
      <span style={{ color: finale }}>{headline[2]}</span>
    </div>
  );

  const dateTile = (month: string, day: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 108, borderRadius: 20, overflow: "hidden", background: "#fff" }}>
      <div style={{ display: "flex", width: "100%", justifyContent: "center", background: "#e5484d", color: "#fff", fontSize: 22, fontWeight: 800, padding: "4px 0" }}>{month}</div>
      <div style={{ display: "flex", color: ink, fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>{day}</div>
    </div>
  );

  const dateRow = (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {dateTile("DEC", "1")}
      <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>One month. One skill.</span>
        <div style={{ display: "flex", width: "100%", height: 6, borderRadius: 6, background: `linear-gradient(90deg, ${accent}, ${finale})` }} />
        <span style={{ display: "flex", fontSize: 24, fontWeight: 600, color: muted }}>100% online · open worldwide</span>
      </div>
      {dateTile("DEC", "31")}
    </div>
  );

  const photoBlock = (
    <div style={{ display: "flex", position: "relative", width: photoW + 10, height: photoH + 10 }}>
      {photo && (
        <div style={{ display: "flex", padding: 5, borderRadius: 40, background: `linear-gradient(160deg, ${accent}, ${finale})` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" width={photoW} height={photoH} style={{ objectFit: "cover", objectPosition: "top", borderRadius: 36 }} />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: -Math.round(stickerSize * 0.42),
          bottom: format === "portrait" ? 8 : -Math.round(stickerSize * 0.12),
          width: stickerSize,
          height: stickerSize,
          borderRadius: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${gold}, #ffdf80)`,
          color: ink,
          transform: "rotate(-10deg)",
          boxShadow: "0 14px 34px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ fontSize: Math.round(stickerSize * 0.34), fontWeight: 800, lineHeight: 1 }}>{price}</span>
        <span style={{ fontSize: Math.round(stickerSize * 0.11), fontWeight: 800, marginTop: 4 }}>USD · any route</span>
      </div>
    </div>
  );

  const listBlock = (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 12 }}>
      <div style={{ display: "flex", fontSize: 24, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: muted }}>{listTitle}</div>
      {list.map((item, i) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: story ? "20px 20px" : "14px 18px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.07)",
            border: "2px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 999,
              background: route ? accent : [green, gold, violet][i % 3],
              color: ink,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {i + 1}
          </div>
          <span style={{ display: "flex", fontSize: story ? 32 : 28, fontWeight: 800 }}>{item}</span>
        </div>
      ))}
    </div>
  );

  const ctaCard = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "22px 28px", borderRadius: 30, background: "#fff", color: ink }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", fontSize: story ? 54 : 46, fontWeight: 800, lineHeight: 1 }}>Register now</div>
        <div style={{ display: "flex", fontSize: story ? 29 : 27, fontWeight: 800, color: "#0f8a52" }}>{displayUrl}</div>
        <div style={{ display: "flex", fontSize: 22, fontWeight: 600, color: "#55526e" }}>
          With {siteConfig.owner.name} · WhatsApp {siteConfig.contact.whatsappDisplay}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qrCode} alt="" width={story ? 170 : 140} height={story ? 170 : 140} />
    </div>
  );

  const rings = [760, 540, 320].map((d) => (
    <div
      key={d}
      style={{
        position: "absolute",
        top: -d / 2 + 80,
        right: -d / 2 + 80,
        width: d,
        height: d,
        borderRadius: 999,
        border: `3px solid ${accent}`,
        opacity: 0.16,
      }}
    />
  ));

  const body = landscape ? (
    <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%", justifyContent: "space-between" }}>
        {brandRow}
        {labelPill}
        {headlineBlock}
        <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>{currentCohort.shortDates} · Live online</div>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 800, color: accent }}>{displayUrl}</div>
      </div>
      {photoBlock}
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
      {brandRow}
      {labelPill}
      {headlineBlock}
      <div style={{ display: "flex", fontSize: story ? 36 : 30, fontWeight: 600, color: soft, lineHeight: 1.3 }}>{sub}</div>
      {dateRow}
      <div style={{ display: "flex", alignItems: "center", gap: story ? 36 : 44 }}>
        {listBlock}
        {photoBlock}
      </div>
      {ctaCard}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          // Stories leave room for the app's own controls at the top and bottom.
          padding: story ? "150px 60px 210px" : landscape ? "36px 44px" : "48px 60px",
          background: ink,
          backgroundImage: `radial-gradient(circle at 100% 0%, ${accent}55, transparent 46%), radial-gradient(circle at 0% 45%, rgba(168,120,255,0.26), transparent 42%), radial-gradient(circle at 60% 100%, rgba(247,201,72,0.24), transparent 48%)`,
          color: "#f2f1fa",
          fontFamily: "Bricolage",
          overflow: "hidden",
        }}
      >
        {rings}
        {body}
      </div>
    ),
    {
      width,
      height,
      fonts: [
        { name: "Bricolage", data: semibold, weight: 600, style: "normal" },
        { name: "Bricolage", data: extrabold, weight: 800, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
