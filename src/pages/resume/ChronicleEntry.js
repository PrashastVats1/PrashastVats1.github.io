import { entryMatch, entryTech, itemMatches } from "./abilityMatch";

/**
 * One experience or project entry. With an ability selected, only matching
 * evidence is shown: entries without a match render nothing, and achievements
 * that do not match are left out (unless the match is the entry's stack).
 */
export default function ChronicleEntry({ entry, ability, level = 3 }) {
  const Heading = `h${level}`;
  const SubHeading = `h${level + 1}`;
  const match = entryMatch(entry, ability);
  if (ability && !match.matches) return null;

  const onlyMatching = Boolean(ability) && match.byItem;
  const groups = entry.groups
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => ({ item, hits: itemMatches(item, ability) }))
        .filter(({ hits }) => !onlyMatching || hits.length > 0),
    }))
    .filter((group) => group.items.length > 0);
  const tech = entryTech(entry);

  return (
    <article
      className={`pv-entry${entry.current ? " pv-entry--current" : ""}`}
      data-entry={entry.id}
      data-match={ability ? "match" : "all"}
    >
      <header className="pv-entry__header">
        <div className="pv-entry__heading">
          <Heading className="pv-entry__company">
            {entry.company}
            {entry.context && <span className="pv-entry__context"> ({entry.context})</span>}
          </Heading>
          {entry.title && <p className="pv-entry__role">{entry.title}</p>}
        </div>
        <div className="pv-entry__meta">
          {entry.current && <p className="pv-entry__badge">Current role</p>}
          {entry.status && <p className="pv-entry__status">{entry.status}</p>}
          <p className="pv-entry__dates">{entry.dates}</p>
        </div>
      </header>

      {ability && (
        <p className="pv-entry__why">
          <span className="pv-entry__why-label">Reveals {ability.label}:</span> {match.reasons.join(", ")}
        </p>
      )}
      {entry.summary && <p className="pv-entry__summary">{entry.summary}</p>}
      <div className="pv-entry__groups">
        {groups.map((group, index) => (
          <div key={group.heading || index} className="pv-entry__group">
            {group.heading && <SubHeading className="pv-entry__group-title">{group.heading}</SubHeading>}
            <ul className="pv-entry__items">
              {group.items.map(({ item, hits }) => (
                <li key={item.text} className="pv-entry__item" data-match={onlyMatching ? "match" : undefined}>
                  {onlyMatching && <span className="pv-entry__item-match">{hits.join(", ")}</span>}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {tech.length > 0 && (
        <div className="pv-entry__tech">
          <span className="pv-entry__tech-label" id={`pv-tech-${entry.id}`}>Technology</span>
          <ul className="pv-tags" aria-labelledby={`pv-tech-${entry.id}`}>
            {tech.map((t) => {
              const hit = Boolean(ability) && ability.matches.includes(t);
              return (
                <li key={t} className={`pv-tag${hit ? " pv-tag--match" : ""}`}>
                  {t}
                  {hit && <span className="pv-visually-hidden"> (matches {ability.label})</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {entry.links && (
        <ul className="pv-entry__links" aria-label={`Links for ${entry.company}`}>
          {entry.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
