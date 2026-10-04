import { useState } from "react";
import { Link } from "../router";
import { Divider } from "../components/fantasy/Ornaments";
import AbilityFilter from "./resume/AbilityFilter";
import ChronicleEntry from "./resume/ChronicleEntry";
import RecordCredentials from "./resume/RecordCredentials";
import RecordHeader from "./resume/RecordHeader";
import SectionHeading from "./resume/SectionHeading";
import { entryMatch } from "./resume/abilityMatch";
import { ABILITIES, ALL_ENTRIES, CONSULTING, EMPLOYMENT, PROJECTS, RECORD } from "./resume/resumeContent";

function describe(ability) {
  const total = ALL_ENTRIES.length;
  if (!ability) return `Showing the full record: all ${total} entries.`;
  const count = ALL_ENTRIES.filter((entry) => entryMatch(entry, ability).matches).length;
  return `${ability.label}: ${count} of ${total} entries reveal this ability.`;
}

export default function ResumePage() {
  const [abilityId, setAbilityId] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const ability = ABILITIES.find((a) => a.id === abilityId) || null;
  const reveals = (list) => (ability ? list.filter((entry) => entryMatch(entry, ability).matches) : list);
  const employment = reveals(EMPLOYMENT);
  const consulting = reveals(CONSULTING);
  const projects = reveals(PROJECTS);

  const select = (id) => {
    setAbilityId(id);
    setAnnouncement(describe(ABILITIES.find((a) => a.id === id)));
  };

  return (
    <div className="pv-record">
      <RecordHeader />

      <section className="pv-record__summary" aria-labelledby="pv-summary-title">
        <Divider className="pv-record__divider" />
        <SectionHeading id="pv-summary-title" title="The Tale So Far" plain="Professional summary" />
        <p className="pv-record__summary-text">{RECORD.summary}</p>
      </section>

      <AbilityFilter
        abilities={ABILITIES}
        selectedId={abilityId}
        onSelect={select}
        status={describe(ability)}
        announcement={announcement}
      />

      {(employment.length > 0 || consulting.length > 0) && (
        <section className="pv-record__section" aria-labelledby="pv-chronicle-title">
          <SectionHeading id="pv-chronicle-title" title="Quest Chronicle" plain="Professional experience" />
          {employment.length > 0 && (
            <>
              <h3 className="pv-record__subhead">Employment</h3>
              <div className="pv-record__entries">
                {employment.map((entry) => (
                  <ChronicleEntry key={entry.id} entry={entry} ability={ability} level={4} />
                ))}
              </div>
            </>
          )}
          {consulting.length > 0 && (
            <>
              <h3 className="pv-record__subhead">Consulting Experience</h3>
              <div className="pv-record__grid">
                {consulting.map((entry) => (
                  <ChronicleEntry key={entry.id} entry={entry} ability={ability} level={4} />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      <section className="pv-record__section" aria-labelledby="pv-quests-title">
        <SectionHeading id="pv-quests-title" title="Independent Quests" plain="Projects & independent work" />
        {projects.length > 0 && (
          <div className="pv-record__grid">
            {projects.map((entry) => (
              <ChronicleEntry key={entry.id} entry={entry} ability={ability} />
            ))}
          </div>
        )}
        <p className="pv-record__more">
          <Link to="/projects">Explore every artifact in the Hall of Artifacts (Projects)</Link>
        </p>
      </section>

      <RecordCredentials />
    </div>
  );
}
