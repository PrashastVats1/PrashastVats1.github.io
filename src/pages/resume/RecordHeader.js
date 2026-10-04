import config from "../../config";
import Avatar from "../../components/fantasy/Avatar";
import FantasyButton from "../../components/fantasy/FantasyButton";
import { RECORD } from "./resumeContent";

export default function RecordHeader() {
  const { current } = RECORD;
  return (
    <header className="pv-record__header">
      <Avatar variant="regular" size={168} className="pv-record__avatar" />

      <div className="pv-record__identity">
        <h1 className="pv-record__title">
          <span className="pv-record__kicker">
            Character Record <span className="pv-record__plain">Resume</span>
            <span className="pv-visually-hidden">, </span>
          </span>
          <span className="pv-record__name">{RECORD.name}</span>
        </h1>
        <p className="pv-record__profession">{RECORD.title}</p>
        <p className="pv-record__class">
          <span className="pv-visually-hidden">Fantasy class: </span>
          {RECORD.fantasyTitle}
        </p>
        <dl className="pv-record__facts">
          <div className="pv-record__fact">
            <dt>Experience</dt>
            <dd>{RECORD.experience}</dd>
          </div>
          <div className="pv-record__fact">
            <dt>Current role</dt>
            <dd>
              {current.title}, {current.company} ({current.context}), since {current.since}
            </dd>
          </div>
          <div className="pv-record__fact">
            <dt>Based in</dt>
            <dd>{RECORD.location}</dd>
          </div>
        </dl>
      </div>

      <div className="pv-record__actions">
        <FantasyButton href={config.resumeFile} download="Prashast_Vats_Resume.pdf" hint="Download resume (PDF)">
          Summon my record
        </FantasyButton>
        <ul className="pv-record__links" aria-label="Contact and profiles">
          <li>
            <a href={`mailto:${config.email}`}>Email</a>
          </li>
          <li>
            <a href={config.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </li>
          <li>
            <a href={config.github} target="_blank" rel="noreferrer">GitHub</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
