import { Divider } from "../../components/fantasy/Ornaments";
import { SCHOOLS } from "./homeContent";

const GLYPHS = {
  // stacked tablets: layers of an application
  "full-stack": "M12 3l8 4-8 4-8-4z M4 12l8 4 8-4 M4 16.5l8 4 8-4",
  // scrying orb with a spark
  ai: "M12 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14 M8 21h8 M12 7.5v3 M10.5 9h3",
  // shield with keyhole
  security: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z M12 10a1.6 1.6 0 1 0 0 .01 M12 11.5v3",
  // looping rune: repeatable work
  automation: "M7 8a6 6 0 0 1 10 0 M17 8V4.5 M17 8h-3.5 M17 16a6 6 0 0 1-10 0 M7 16v3.5 M7 16h3.5",
};

export default function SchoolsPage() {
  return (
    <div className="pv-schools">
      <p className="pv-book-eyebrow">The disciplines I practise</p>
      <h2 className="pv-book-title">Schools of Magic</h2>
      <p className="pv-page-header__plain">What I build</p>
      <Divider className="pv-book-divider" />
      <ul className="pv-schools__list">
        {SCHOOLS.map((school) => (
          <li key={school.id} className="pv-schools__item">
            <svg className="pv-schools__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={GLYPHS[school.id]} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <h3 className="pv-schools__title">{school.title}</h3>
              <p className="pv-schools__description">{school.description}</p>
              <ul className="pv-tags" aria-label={`Technologies for ${school.title}`}>
                {school.tech.map((t) => (
                  <li key={t} className="pv-tag">{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
