import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import { siteConfig, whatsappUrl } from "@/content/site";
import { howItWorks, trainingOfferings } from "@/content/training";

const fontDir = join(process.cwd(), "src", "assets", "fonts");
const fonts = Promise.all([readFile(join(fontDir, "bricolage-600.woff")), readFile(join(fontDir, "bricolage-800.woff"))]);
const portrait = readFile(join(process.cwd(), "public", "images", "daniel-makonor.jpg"))
  .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`)
  .catch(() => null);
const qr = QRCode.toDataURL(whatsappUrl("Hi Daniel, I'd like to apply for 1-on-1 AI income mentorship."), {
  margin: 1,
  width: 320,
  color: { dark: "#100e22", light: "#ffffff" },
});

const green = "#3ee08f";
const gold = "#f7c948";
const violet = "#a878ff";
const ink = "#100e22";
const muted = "#b9b6d3";
const soft = "#e4e2f2";

/** Sparkles kept to the margins: [x, y, size, colour] for each format. */
const sparkles: Record<"landscape" | "portrait", [number, number, number, string][]> = {
  landscape: [
    [620, 40, 4, gold], [1000, 70, 5, green], [1560, 300, 5, gold], [30, 420, 4, violet],
    [1570, 640, 4, soft], [880, 860, 4, gold], [40, 860, 3, green],
  ],
  portrait: [
    [560, 40, 4, gold], [1040, 170, 5, green], [30, 420, 4, violet], [1046, 700, 4, gold],
    [30, 980, 4, soft], [600, 1320, 4, gold], [1040, 1180, 3, green],
  ],
};

/**
 * 1-on-1 mentorship banner: /flyer/mentorship (1600×900 landscape)
 * or /flyer/mentorship?format=portrait (1080×1350).
 * Price, benefits and steps come from src/content/training.ts.
 */
export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get("format") === "portrait" ? "portrait" : "landscape";
  const tall = format === "portrait";
  const [[semibold, extrabold], photo, qrCode] = await Promise.all([fonts, portrait, qr]);

  const tier = trainingOfferings.find((o) => o.id === "mentorship")?.tiers.find((t) => /mentorship/i.test(t.name));
  const benefits = (tier?.features ?? [])
    .filter((f) => !/async/i.test(f))
    .slice(0, 4)
    .map((f) => f.replace(/^Help packaging/, "Packaging"));
  const price = tier?.price?.USD;

  const brand = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${green}, ${gold})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: ink,
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          A
        </div>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 800 }}>
          <span>AIMoni</span>
          <span style={{ color: green }}>Point</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: tall ? 19 : 21,
          fontWeight: 800,
          letterSpacing: 2,
          color: green,
          border: `2px solid ${green}`,
          background: "rgba(62,224,143,0.12)",
          padding: "8px 22px",
          borderRadius: 999,
        }}
      >
        1-ON-1 AI INCOME MENTORSHIP
      </div>
    </div>
  );

  const headline = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", fontSize: 24, fontWeight: 800, letterSpacing: 4, color: gold }}>YOUR NEXT INCOME STREAM</div>
      <div
        style={{ display: "flex", flexDirection: "column", fontSize: tall ? 86 : 78, fontWeight: 800, lineHeight: 1, letterSpacing: -1.5, marginTop: 14 }}
      >
        <span>Build an AI income</span>
        <span>
          stream, <span style={{ color: green, marginLeft: 20 }}>1-on-1</span>
        </span>
        <span style={{ color: gold }}>with a mentor.</span>
      </div>
      <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: muted, marginTop: 20, lineHeight: 1.35, maxWidth: 880 }}>
        A personal plan from learning AI to your first paying clients, built around your background, time and income goals.
      </div>
    </div>
  );

  const benefitList = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, ...(tall ? { flexDirection: "column", flex: 1 } : { marginTop: 26 }) }}>
      {benefits.map((b, i) => (
        <div
          key={b}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: tall ? "100%" : 498,
            padding: tall ? "20px 20px" : "14px 18px",
            borderRadius: 18,
            background: "rgba(255,255,255,0.06)",
            border: "2px solid rgba(255,255,255,0.13)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 999,
              background: [green, gold, violet, green][i],
              color: ink,
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {i + 1}
          </div>
          <span style={{ display: "flex", fontSize: 22, fontWeight: 600, color: soft }}>{b}</span>
        </div>
      ))}
    </div>
  );

  const journey = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {howItWorks.map((s, i) => {
        const last = i === howItWorks.length - 1;
        return (
          <div key={s.title} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                fontSize: 21,
                fontWeight: 800,
                padding: "10px 18px",
                borderRadius: 999,
                color: last ? ink : soft,
                background: last ? gold : "rgba(255,255,255,0.08)",
                border: `2px solid ${last ? gold : "rgba(255,255,255,0.16)"}`,
              }}
            >
              {s.title}
            </div>
            {!last && <div style={{ display: "flex", width: tall ? 34 : 26, height: 3, background: `linear-gradient(90deg, ${green}, ${gold})` }} />}
          </div>
        );
      })}
    </div>
  );

  const photoCard = (
    <div style={{ display: "flex", position: "relative" }}>
      {photo && (
        <div style={{ display: "flex", padding: 5, borderRadius: 40, background: `linear-gradient(160deg, ${green}, ${gold})` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" width={330} height={400} style={{ objectFit: "cover", objectPosition: "top", borderRadius: 36 }} />
        </div>
      )}
      {price != null && (
        <div
          style={{
            position: "absolute",
            left: tall ? -40 : -70,
            bottom: -26,
            display: "flex",
            flexDirection: "column",
            padding: "12px 22px",
            borderRadius: 22,
            background: `linear-gradient(135deg, ${gold}, #ffdf80)`,
            color: ink,
            boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <span style={{ fontSize: 54, fontWeight: 800, lineHeight: 1 }}>${price}</span>
            <span style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>USD</span>
          </div>
          <span style={{ display: "flex", fontSize: 18, fontWeight: 600 }}>1-on-1 mentorship</span>
        </div>
      )}
    </div>
  );

  const cta = (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qrCode} alt="" width={tall ? 130 : 112} height={tall ? 130 : 112} style={{ borderRadius: 12, border: `4px solid ${green}` }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", fontSize: tall ? 30 : 26, fontWeight: 800, color: green }}>Apply now</div>
        <div style={{ display: "flex", fontSize: tall ? 22 : 19, fontWeight: 600, color: soft }}>WhatsApp {siteConfig.contact.whatsappDisplay}</div>
        <div style={{ display: "flex", fontSize: tall ? 22 : 19, fontWeight: 600, color: muted }}>{siteConfig.domain}</div>
      </div>
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
          flexDirection: "column",
          padding: tall ? "56px 64px" : "52px 64px",
          background: ink,
          backgroundImage: `radial-gradient(circle at 0% 0%, rgba(62,224,143,0.26), transparent 38%), radial-gradient(circle at 100% 0%, rgba(168,120,255,0.32), transparent 42%), radial-gradient(circle at 75% 100%, rgba(247,201,72,0.22), transparent 45%)`,
          color: "#f2f1fa",
          fontFamily: "Bricolage",
          overflow: "hidden",
        }}
      >
        {sparkles[format].map(([x, y, s, c], i) => (
          <div
            key={i}
            style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: 999, background: c, boxShadow: `0 0 ${s * 3}px ${c}` }}
          />
        ))}

        {brand}

        {tall ? (
          <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: 40 }}>
            {headline}
            <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 40 }}>
              {benefitList}
              {photoCard}
            </div>
            <div style={{ display: "flex", marginTop: 62 }}>{journey}</div>
            <div
              style={{
                display: "flex",
                marginTop: "auto",
                paddingTop: 28,
                borderTop: "2px solid rgba(255,255,255,0.12)",
              }}
            >
              {cta}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flex: 1, gap: 56, marginTop: 34 }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {headline}
              {benefitList}
              <div style={{ display: "flex", marginTop: "auto" }}>{journey}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 400 }}>
              {photoCard}
              <div style={{ display: "flex", marginTop: "auto" }}>{cta}</div>
            </div>
          </div>
        )}
      </div>
    ),
    {
      width: tall ? 1080 : 1600,
      height: tall ? 1350 : 900,
      fonts: [
        { name: "Bricolage", data: semibold, weight: 600, style: "normal" },
        { name: "Bricolage", data: extrabold, weight: 800, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
