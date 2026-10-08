import { useEffect, useRef, useState } from "react";
import { Divider } from "../../components/fantasy/Ornaments";
import SafeImage from "../../components/fantasy/SafeImage";
import { SCENES, hasAsset } from "../../assets/manifest";
import InstrumentArt from "./InstrumentArt";
import { INSTRUMENTS, INSTRUMENT_KINDS } from "./instruments";

function LabScene() {
  if (!hasAsset(SCENES.tools)) return null;
  return (
    <div className="pv-lab-scene" aria-hidden="true">
      <SafeImage path={SCENES.tools} alt="" className="pv-lab-scene__image" decoding="async" fetchpriority="low" keepLayout />
    </div>
  );
}

function PrivacyNote() {
  return (
    <p className="pv-bench__privacy">
      <svg className="pv-bench__privacy-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 10 V7 a5 5 0 0 1 10 0 V10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="5" y="10" width="14" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="15.5" r="1.6" fill="currentColor" />
      </svg>
      <span>Runs entirely in this browser. Nothing you enter is sent anywhere.</span>
    </p>
  );
}

function AiNote() {
  return (
    <p className="pv-bench__privacy pv-bench__privacy--ai">
      <svg className="pv-bench__privacy-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 4 L13.4 10.6 L20 12 L13.4 13.4 L12 20 L10.6 13.4 L4 12 L10.6 10.6 Z" fill="currentColor" />
      </svg>
      <span>AI-powered. Your text is sent to OpenAI only when you press the button. Results are AI-generated and can be wrong.</span>
    </p>
  );
}

const GROUPS = Object.entries(INSTRUMENT_KINDS).map(([kind, info]) => ({
  kind,
  ...info,
  instruments: INSTRUMENTS.filter((i) => i.kind === kind),
}));
const LOCAL_COUNT = INSTRUMENTS.filter((i) => i.kind === "local").length;
const AI_COUNT = INSTRUMENTS.length - LOCAL_COUNT;

/**
 * The Wizard's Laboratory: a shelf of instruments and one workbench. Choosing an
 * instrument swaps the workbench in place (no route change, no page transition)
 * and every instrument keeps its inputs while another is in use.
 */
export default function WizardsLaboratory() {
  const [active, setActive] = useState(INSTRUMENTS[0].slug);
  const [announcement, setAnnouncement] = useState("");
  // { where: "bench" | "shelf" }: a fresh object per request so repeating the same move still runs the effect.
  const [focusRequest, setFocusRequest] = useState(null);
  const benchHeadings = useRef({});
  const shelfButtons = useRef({});

  useEffect(() => {
    if (!focusRequest) return;
    const target = (focusRequest.where === "bench" ? benchHeadings : shelfButtons).current[active];
    if (!target) return;
    target.focus({ preventScroll: true });
    const rect = target.getBoundingClientRect();
    // An instant jump: a smooth scroll started while the bench is being revealed can be dropped by the browser.
    if ((rect.top < 0 || rect.bottom > window.innerHeight) && target.scrollIntoView) {
      target.scrollIntoView({ block: focusRequest.where === "bench" ? "start" : "center" });
    }
  }, [focusRequest, active]);

  const open = (instrument) => {
    setActive(instrument.slug);
    setAnnouncement(`${instrument.name} is on the workbench.`);
    setFocusRequest({ where: "bench" });
  };

  const returnToShelf = () => {
    setAnnouncement("Back at the instrument shelf.");
    setFocusRequest({ where: "shelf" });
  };

  const current = INSTRUMENTS.find((i) => i.slug === active);

  return (
    <>
      <LabScene />
      <div className="pv-lab">
        <header className="pv-lab__header">
          <p className="pv-hall__eyebrow">Instruments forged for the modern spellcaster</p>
          <h1 className="pv-hall__title">Wizard's Laboratory</h1>
          <p className="pv-hall__plain">Interactive Tools</p>
          <Divider className="pv-hall__divider" />
          <p className="pv-hall__description">
            Small, working developer tools. Choose an instrument from the shelf and use it on the workbench below.
          </p>
          <p className="pv-hall__count">
            {INSTRUMENTS.length} instruments: {LOCAL_COUNT} running in your browser, {AI_COUNT} AI-powered
          </p>
        </header>

        <section className="pv-lab-shelf" aria-labelledby="pv-lab-shelf-title">
          <h2 id="pv-lab-shelf-title" className="pv-lab-shelf__title">
            Available instruments
          </h2>
          {GROUPS.filter((group) => group.instruments.length).map((group) => (
            <div key={group.kind} className="pv-lab-shelf__group" data-kind={group.kind}>
              <h3 className="pv-lab-shelf__group-title">{group.title}</h3>
              <p className="pv-lab-shelf__group-note">{group.description}</p>
              <ul className="pv-lab-shelf__list">
                {group.instruments.map((instrument) => {
                  const on = instrument.slug === active;
                  const id = `pv-instrument-${instrument.slug}`;
                  return (
                    <li key={instrument.slug} className="pv-lab-shelf__item">
                      <button
                        type="button"
                        ref={(el) => {
                          shelfButtons.current[instrument.slug] = el;
                        }}
                        className="pv-instrument"
                        data-accent={instrument.accent}
                        data-instrument={instrument.slug}
                        data-kind={instrument.kind}
                        aria-pressed={on}
                        aria-controls="pv-workbench"
                        aria-labelledby={`${id}-name ${id}-plain`}
                        aria-describedby={`${id}-kind ${id}-summary`}
                        onClick={() => open(instrument)}
                      >
                        <InstrumentArt instrument={instrument} />
                        <span className="pv-instrument__plate">
                          <span id={`${id}-kind`} className="pv-kind-badge" data-kind={instrument.kind}>
                            {INSTRUMENT_KINDS[instrument.kind].badge}
                          </span>
                          <span id={`${id}-name`} className="pv-instrument__name">
                            {instrument.name}
                          </span>
                          <span id={`${id}-plain`} className="pv-instrument__plain">
                            {instrument.plain}
                          </span>
                          <span id={`${id}-summary`} className="pv-instrument__summary">
                            {instrument.summary}
                          </span>
                          <span className="pv-instrument__state" aria-hidden="true">
                            {on ? "On the workbench" : "Use this instrument"}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        <section id="pv-workbench" className="pv-workbench" data-accent={current.accent} aria-labelledby={`pv-bench-${active}`}>
          {INSTRUMENTS.map(({ slug, kind, name, plain, summary, Component }) => (
            <div key={slug} className="pv-bench" data-instrument={slug} hidden={slug !== active}>
              <header className="pv-bench__header">
                <div className="pv-bench__heading">
                  <p className="pv-bench__eyebrow">On the workbench</p>
                  <h2
                    id={`pv-bench-${slug}`}
                    className="pv-bench__title"
                    tabIndex={-1}
                    ref={(el) => {
                      benchHeadings.current[slug] = el;
                    }}
                  >
                    {name}
                  </h2>
                  <p className="pv-bench__plain">{plain}</p>
                  <p className="pv-bench__summary">{summary}</p>
                </div>
                {kind === "ai" ? <AiNote /> : <PrivacyNote />}
              </header>
              <Component />
              <div className="pv-bench__footer">
                <button type="button" className="pv-bench__return" onClick={returnToShelf}>
                  Choose another instrument
                </button>
              </div>
            </div>
          ))}
        </section>

        <p className="pv-visually-hidden" role="status">
          {announcement}
        </p>
      </div>
    </>
  );
}
