import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

// Bricolage Grotesque (OFL) bundled locally so images render without network access.
const fontDir = join(process.cwd(), "src", "assets", "fonts");
const fonts = Promise.all([readFile(join(fontDir, "bricolage-600.woff")), readFile(join(fontDir, "bricolage-800.woff"))]);
// Daniel's portrait, embedded as a data URL so the image renders without a network fetch.
const portrait = readFile(join(process.cwd(), "public", "images", "daniel-makonor.jpg"))
  .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`)
  .catch(() => null);

/**
 * Dynamic Open Graph image: /og?title=...&eyebrow=...
 * Every page's metadata points here (see buildMetadata in src/lib/seo.ts),
 * so courses, blog posts and all other pages get a unique social image.
 */
export async function GET(request: Request) {
  const [[semibold, extrabold], photo] = await Promise.all([fonts, portrait]);
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? siteConfig.tagline).slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? siteConfig.name).slice(0, 60);
  const fontSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 80;

  const green = "#3ee08f";
  const gold = "#f7c948";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#100e22",
          backgroundImage: `radial-gradient(circle at 10% 0%, rgba(62,224,143,0.28), transparent 45%), radial-gradient(circle at 95% 10%, rgba(168,120,255,0.30), transparent 45%), radial-gradient(circle at 70% 115%, rgba(247,201,72,0.25), transparent 50%)`,
          color: "#f2f1fa",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 18,
                background: `linear-gradient(135deg, ${green}, ${gold})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#12102a",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              A
            </div>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 800 }}>
              <span>AIMoni</span>
              <span style={{ color: green }}>Point</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: "#12102a",
              background: gold,
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            Learn · Build · Earn
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: photo ? 760 : 1040 }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: green }}>
              {eyebrow}
            </div>
            <div style={{ display: "flex", fontSize: photo ? Math.round(fontSize * 0.86) : fontSize, fontWeight: 800, lineHeight: 1.05 }}>
              {title}
            </div>
          </div>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              width={250}
              height={300}
              style={{ objectFit: "cover", objectPosition: "top", borderRadius: 36, border: `4px solid ${green}` }}
            />
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 600, color: "#b9b6d3" }}>
          <div style={{ display: "flex" }}>{siteConfig.owner.name} · AI Skill Educator</div>
          <div style={{ display: "flex", color: gold }}>{siteConfig.domain}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Bricolage", data: semibold, weight: 600, style: "normal" },
        { name: "Bricolage", data: extrabold, weight: 800, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
