import { Divider } from "../../components/fantasy/Ornaments";
import { CERTIFICATIONS, EDUCATION, HONOURS, SKILL_GROUPS } from "./resumeContent";
import SectionHeading from "./SectionHeading";

/** Supporting credentials: skills beside certifications and honours, then a compact education line. */
export default function RecordCredentials() {
  return (
    <div className="pv-record__credentials">
      <Divider className="pv-record__divider" />
      <div className="pv-record__credentials-grid">
        <section className="pv-record__panel" aria-labelledby="pv-skills-title">
          <SectionHeading id="pv-skills-title" title="Abilities" plain="Technical skills" />
          <dl className="pv-skills">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className="pv-skills__group">
                <dt>{group.label}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="pv-record__credentials-side">
          <section className="pv-record__panel" aria-labelledby="pv-certifications-title">
            <SectionHeading id="pv-certifications-title" title="Certifications & Seals" plain="Certifications" />
            <ul className="pv-record__list">
              {CERTIFICATIONS.map((item) => (
                <li key={item.name}>
                  <p className="pv-record__list-title">{item.name}</p>
                  <p className="pv-record__list-detail">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="pv-record__panel" aria-labelledby="pv-honours-title">
            <SectionHeading id="pv-honours-title" title="Honours" plain="Recognition" />
            <ul className="pv-record__list pv-record__list--plain">
              {HONOURS.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="pv-record__education" aria-labelledby="pv-education-title">
        <h2 id="pv-education-title" className="pv-record__education-label">Education</h2>
        {EDUCATION.map((item) => (
          <p key={item.degree} className="pv-record__education-item">
            <span className="pv-record__list-title">{item.degree}</span>
            <span className="pv-record__list-detail">
              {item.institution} · {item.dates}
            </span>
          </p>
        ))}
      </section>
    </div>
  );
}
