import { areas } from "@/content/areas";
import { courses } from "@/content/courses";
import { SiteHeader, type MegaMenuData } from "./site-header";

/** Server wrapper: builds a slim menu payload so the client bundle stays small. */
export function Header() {
  const data: MegaMenuData = {
    areas: areas.map((a) => ({
      slug: a.slug,
      title: a.title,
      summary: a.summary,
      icon: a.icon,
      kind: a.kind,
    })),
    courses: courses.map((c) => ({
      slug: c.slug,
      title: c.title,
      level: c.level,
      area: c.area,
    })),
  };
  return <SiteHeader data={data} />;
}
