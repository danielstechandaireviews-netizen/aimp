import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CA, EU, GB, NG, US } from "country-flag-icons/string/3x2";
import QRCode from "qrcode";
import { stats } from "@/content/about";
import { bootcamp, bootcampMonthNames, nextBootcampStart } from "@/content/bootcamps";
import { courses } from "@/content/courses";
import { siteConfig } from "@/content/site";
import { trainingOfferings } from "@/content/training";

const fontDir = join(process.cwd(), "src", "assets", "fonts");
const fonts = Promise.all([readFile(join(fontDir, "bricolage-600.woff")), readFile(join(fontDir, "bricolage-800.woff"))]);
const portrait = readFile(join(process.cwd(), "public", "images", "daniel-makonor.jpg"))
  .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`)
  .catch(() => null);
const qr = QRCode.toDataURL(siteConfig.url, { margin: 1, width: 300, color: { dark: "#100e22", light: "#ffffff" } });

/** Where students have been taught, shown as flags. */
const flags = [
  { svg: CA, label: "Canada" },
  { svg: US, label: "USA" },
  { svg: GB, label: "UK" },
  { svg: NG, label: "Nigeria" },
  { svg: EU, label: "Europe" },
].map((f) => ({ ...f, src: `data:image/svg+xml;base64,${Buffer.from(f.svg).toString("base64")}` }));

const green = "#3ee08f";
const gold = "#f7c948";
const ink = "#100e22";
const muted = "#b9b6d3";

/**
 * Shareable promo flyer (1080×1350 portrait PNG): /flyer
 * Prices, bootcamp dates and stats come from the content files, so it never goes stale.
 */
export async function GET() {
  const [[semibold, extrabold], photo, qrCode] = await Promise.all([fonts, portrait, qr]);

  const mentorship = trainingOfferings.find((o) => o.id === "mentorship")?.tiers.find((t) => /mentorship/i.test(t.name));
  const offers = [
    { name: "Self-paced course", detail: "Learn at your own pace", price: courses[0].price.USD },
    { name: "Interactive bootcamp", detail: "1 month · live cohort", price: bootcamp.price.USD, featured: true },
    { name: "1-on-1 mentorship", detail: "Work directly with Daniel", price: mentorship?.price?.USD ?? 350 },
  ];
  const nextCohort = nextBootcampStart().toLocaleString("en", { month: "long", year: "numeric" });
  const proof = stats.filter((s) => !/track/i.test(s.label)).map((s) => `${s.value} ${s.label.replace(" globally", "").replace(" online", "")}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 64px",
          background: ink,
          backgroundImage: `radial-gradient(circle at 0% 0%, rgba(62,224,143,0.30), transparent 40%), radial-gradient(circle at 100% 8%, rgba(168,120,255,0.32), transparent 42%), radial-gradient(circle at 80% 100%, rgba(247,201,72,0.22), transparent 45%)`,
          color: "#f2f1fa",
          fontFamily: "Bricolage",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
          <div style={{ display: "flex", fontSize: 22, fontWeight: 600, color: ink, background: gold, padding: "8px 20px", borderRadius: 999 }}>
            100% online · worldwide
          </div>
        </div>

        {/* Headline + portrait */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 30, gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: green }}>
              Learn AI · Build with AI · Earn with AI
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 800, lineHeight: 1.02, marginTop: 14 }}>
              <span>Learn AI skills.</span>
              <span style={{ color: green }}>Build multiple</span>
              <span style={{ color: gold }}>streams of income.</span>
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: muted, marginTop: 20 }}>
              AI App Development · AI Automation · AI Agents
            </div>
          </div>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              width={290}
              height={350}
              style={{ objectFit: "cover", objectPosition: "top", borderRadius: 36, border: `5px solid ${green}` }}
            />
          )}
        </div>

        {/* Offers */}
        <div style={{ display: "flex", gap: 18, marginTop: 30 }}>
          {offers.map((o) => (
            <div
              key={o.name}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "24px 24px",
                borderRadius: 28,
                background: o.featured ? "rgba(62,224,143,0.16)" : "rgba(255,255,255,0.06)",
                border: `2px solid ${o.featured ? green : "rgba(255,255,255,0.14)"}`,
              }}
            >
              <div style={{ display: "flex", fontSize: 26, fontWeight: 800 }}>{o.name}</div>
              <div style={{ display: "flex", fontSize: 19, fontWeight: 600, color: muted, marginTop: 6 }}>{o.detail}</div>
              <div style={{ display: "flex", fontSize: 60, fontWeight: 800, color: o.featured ? green : gold, marginTop: 14 }}>${o.price}</div>
            </div>
          ))}
        </div>

        {/* Bootcamp banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 18,
            padding: "18px 26px",
            borderRadius: 22,
            background: gold,
            color: ink,
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          <span>Next live bootcamp: {nextCohort}</span>
          <span style={{ fontWeight: 600 }}>Every {bootcampMonthNames.map((m) => m.slice(0, 3)).join(", ")}</span>
        </div>

        {/* Businesses + communities */}
        <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
          {[
            { title: "For businesses", text: "AI software, automations & AI agents built for small and medium businesses." },
            { title: "For communities", text: "License the courses with your brand name, plus live Q&A. Pricing negotiable." },
          ].map((c) => (
            <div
              key={c.title}
              style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 24px", borderRadius: 24, background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.14)" }}
            >
              <div style={{ display: "flex", fontSize: 24, fontWeight: 800, color: green }}>{c.title}</div>
              <div style={{ display: "flex", fontSize: 21, fontWeight: 600, color: "#e4e2f2", marginTop: 6, lineHeight: 1.3 }}>{c.text}</div>
            </div>
          ))}
        </div>

        {/* Proof + flags */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, fontSize: 24, fontWeight: 600, color: muted }}>
          {proof.map((p) => (
            <span key={p} style={{ display: "flex" }}>
              {p}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
            paddingBottom: 20,
            borderBottom: "2px solid rgba(255,255,255,0.12)",
          }}
        >
          <span style={{ display: "flex", fontSize: 22, fontWeight: 600, color: muted }}>Students taught in</span>
          {flags.map((f) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt="" width={48} height={32} style={{ borderRadius: 5, border: "1px solid rgba(255,255,255,0.25)" }} />
              <span style={{ display: "flex", fontSize: 22, fontWeight: 600, color: "#e4e2f2" }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Contact + QR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 800 }}>
              {siteConfig.owner.name} · AI Skill Educator
            </div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: gold }}>{siteConfig.domain}</div>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#e4e2f2" }}>
              WhatsApp {siteConfig.contact.whatsappDisplay} · {siteConfig.contact.email}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCode} alt="" width={150} height={150} style={{ borderRadius: 14 }} />
            <span style={{ display: "flex", fontSize: 17, fontWeight: 600, color: muted }}>Scan to visit</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      fonts: [
        { name: "Bricolage", data: semibold, weight: 600, style: "normal" },
        { name: "Bricolage", data: extrabold, weight: 800, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
