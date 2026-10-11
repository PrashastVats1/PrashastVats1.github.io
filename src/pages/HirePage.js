import { Link } from "../router";
import FantasyButton from "../components/fantasy/FantasyButton";
import Avatar from "../components/fantasy/Avatar";
import { CornerFlourish, Divider } from "../components/fantasy/Ornaments";
import GuildHall from "./hire/GuildHall";
import WaxSeal from "./hire/WaxSeal";
import CopyAddress from "./hire/CopyAddress";
import { BASIS, CODE, CONTACT, ENGAGEMENTS, OPENING, PROOF, TRADES } from "./hire/guildContent";

const NEW_TAB = <span className="pv-visually-hidden"> (opens in a new tab)</span>;

function SectionHeading({ id, title, plain }) {
  return (
    <h2 id={id} className="pv-guild-heading">
      <span className="pv-guild-heading__title">{title}</span>
      <span className="pv-guild-heading__plain">{plain}</span>
    </h2>
  );
}

function RecruitmentNotice() {
  return (
    <section className="pv-notice" aria-labelledby="pv-notice-title">
      <span className="pv-notice__nail pv-notice__nail--left" aria-hidden="true" />
      <span className="pv-notice__nail pv-notice__nail--right" aria-hidden="true" />
      <CornerFlourish position="tl" />
      <CornerFlourish position="tr" />
      <CornerFlourish position="bl" />
      <CornerFlourish position="br" />

      <div className="pv-notice__body">
        <p className="pv-notice__eyebrow">Does thy guild have a quest worthy of an Archmage?</p>
        <h1 id="pv-notice-title" className="pv-notice__title">Guild Recruitment</h1>
        <p className="pv-notice__plain">Contact &amp; Hire Me</p>
        <Divider className="pv-notice__divider" />
        <p className="pv-notice__lead">{OPENING}</p>

        <div className="pv-notice__actions">
          <FantasyButton href={CONTACT.mailto} hint="Email me directly">
            Invite me to thy party
          </FantasyButton>
          <FantasyButton href={CONTACT.linkedin} target="_blank" rel="noreferrer" variant="secondary" hint="Message me on LinkedIn">
            Consult the guild{NEW_TAB}
          </FantasyButton>
          <FantasyButton href={CONTACT.resumeFile} download="Prashast_Vats_Resume.pdf" variant="secondary" hint="Download resume (PDF)">
            Summon my record
          </FantasyButton>
        </div>

        <p className="pv-notice__address">
          <span>Or write to </span>
          <a href={CONTACT.mailto}>{CONTACT.email}</a>
          <CopyAddress address={CONTACT.email} />
        </p>
      </div>

      <figure className="pv-notice__portrait">
        <Avatar variant="regular" size="lg" alt="Portrait of Prashast Vats as a software archmage" />
        <figcaption>
          <span className="pv-notice__name">Prashast Vats</span>
          <span>Software Engineer, {CONTACT.location}</span>
        </figcaption>
      </figure>

      <WaxSeal className="pv-notice__seal" />
    </section>
  );
}

function Trades() {
  return (
    <section className="pv-guild-section" aria-labelledby="pv-trades-title">
      <SectionHeading id="pv-trades-title" title="The Archmage's Trades" plain="What I can help with" />
      <p className="pv-guild-section__intro">
        Each trade is marked with where the experience comes from: my professional work, independent projects I have
        built and shipped, or both.
      </p>
      <ul className="pv-trades">
        {TRADES.map((trade) => (
          <li key={trade.id} className="pv-trade">
            <h3 className="pv-trade__title">{trade.title}</h3>
            <p className={`pv-trade__basis pv-trade__basis--${trade.basis}`}>
              <span className="pv-visually-hidden">Experience from: </span>
              {BASIS[trade.basis]}
            </p>
            <p className="pv-trade__text">{trade.text}</p>
            <ul className="pv-trade__evidence">
              {trade.evidence.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="pv-guild-section__more">
        <Link to="/resume">Read the full Character Record (Resume)</Link>
      </p>
    </section>
  );
}

function Proof() {
  return (
    <section className="pv-guild-section" aria-labelledby="pv-proof-title">
      <SectionHeading id="pv-proof-title" title="Quests Completed" plain="Selected proof of work" />
      <ol className="pv-bounties">
        {PROOF.map((item) => (
          <li key={item.slug} className="pv-bounty">
            <p className="pv-bounty__status">{item.status}</p>
            <h3 className="pv-bounty__name">{item.name}</h3>
            <p className="pv-bounty__subtitle">{item.subtitle}</p>
            <p className="pv-bounty__summary">{item.summary}</p>
            {item.result && <p className="pv-bounty__result">{item.result}</p>}
            <p className="pv-bounty__links">
              <Link to={item.record} aria-label={`Project record for ${item.name}`}>
                Project record
              </Link>
              <a
                href={item.external.href}
                target="_blank"
                rel="noreferrer"
                aria-describedby={item.external.note ? `pv-bounty-note-${item.slug}` : undefined}
              >
                {item.external.label}
                <span className="pv-visually-hidden"> for {item.name} (opens in a new tab)</span>
              </a>
            </p>
            {item.external.note && (
              <p id={`pv-bounty-note-${item.slug}`} className="pv-link-note">
                {item.external.note}
              </p>
            )}
          </li>
        ))}
      </ol>
      <p className="pv-guild-section__more">
        <Link to="/projects">See every project in the Hall of Artifacts</Link>
      </p>
    </section>
  );
}

function Code() {
  return (
    <section className="pv-guild-section" aria-labelledby="pv-code-title">
      <SectionHeading id="pv-code-title" title="The Guild Code" plain="How I work" />
      <ol className="pv-code">
        {CODE.map((rule) => (
          <li key={rule.title} className="pv-code__rule">
            <h3 className="pv-code__title">{rule.title}</h3>
            <p>{rule.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Engagements() {
  return (
    <section className="pv-guild-section" aria-labelledby="pv-terms-title">
      <SectionHeading id="pv-terms-title" title="Terms of Engagement" plain="Ways to work together" />
      <ul className="pv-terms">
        {ENGAGEMENTS.map((term) => (
          <li key={term.id} className="pv-term">
            <h3 className="pv-term__title">{term.title}</h3>
            <p>{term.text}</p>
            {term.link && (
              <FantasyButton
                href={term.link.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                hint={term.link.hint}
                className="pv-term__link"
              >
                {term.link.label}
                {NEW_TAB}
              </FantasyButton>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contract() {
  return (
    <section className="pv-contract" aria-labelledby="pv-contract-title">
      <WaxSeal className="pv-contract__seal" />
      <h2 id="pv-contract-title" className="pv-guild-heading pv-guild-heading--contract">
        <span className="pv-guild-heading__title">Seal the Contract</span>
        <span className="pv-guild-heading__plain">Get in touch</span>
      </h2>
      <p className="pv-contract__text">
        Send a note about the role, project, or idea, and what you would like help with.
      </p>
      <div className="pv-contract__actions">
        <FantasyButton href={CONTACT.mailto} hint={`Email ${CONTACT.email}`}>
          Send a raven
        </FantasyButton>
      </div>
      <ul className="pv-ledger" aria-label="Contact details">
        <li>
          <span className="pv-ledger__label">Email</span>
          <a href={CONTACT.mailto}>{CONTACT.email}</a>
        </li>
        <li>
          <span className="pv-ledger__label">LinkedIn</span>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/prashast-vats{NEW_TAB}
          </a>
        </li>
        <li>
          <span className="pv-ledger__label">GitHub</span>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">
            github.com/PrashastVats1{NEW_TAB}
          </a>
        </li>
        <li>
          <span className="pv-ledger__label">Fiverr</span>
          <a href={CONTACT.fiverr} target="_blank" rel="noopener noreferrer">
            fiverr.com/prashast_vats{NEW_TAB}
          </a>
        </li>
        <li>
          <span className="pv-ledger__label">Resume</span>
          <a href={CONTACT.resumeFile} download="Prashast_Vats_Resume.pdf">
            Prashast_Vats_Resume.pdf
          </a>
        </li>
        <li>
          <span className="pv-ledger__label">Based in</span>
          <span>{CONTACT.location}</span>
        </li>
      </ul>
    </section>
  );
}

export default function HirePage() {
  return (
    <GuildHall>
      <RecruitmentNotice />
      <Trades />
      <Proof />
      <Code />
      <Engagements />
      <Contract />
    </GuildHall>
  );
}
