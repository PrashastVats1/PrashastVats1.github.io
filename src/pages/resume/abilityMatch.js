const unique = (list) => [...new Set(list)];

const entryItems = (entry) => entry.groups.flatMap((group) => group.items);

/** Technologies shown on an entry: its stack line, else what its items name. */
export function entryTech(entry) {
  return entry.stack || unique(entryItems(entry).flatMap((item) => item.tech));
}

/** The technologies/areas of one item that count toward the ability. */
export function itemMatches(item, ability) {
  if (!ability) return [];
  return [...item.tech, ...(item.areas || [])].filter((t) => ability.matches.includes(t));
}

/**
 * How an entry relates to the selected ability.
 * `reasons` lists every matching technology/area, so the UI can say why.
 * `byItem` is true when individual achievements match (not only the stack).
 */
export function entryMatch(entry, ability) {
  if (!ability) return { matches: true, reasons: [], byItem: false };
  const fromItems = entryItems(entry).flatMap((item) => itemMatches(item, ability));
  const fromStack = entryTech(entry).filter((t) => ability.matches.includes(t));
  const reasons = unique([...fromItems, ...fromStack]);
  return { matches: reasons.length > 0, reasons, byItem: fromItems.length > 0 };
}
