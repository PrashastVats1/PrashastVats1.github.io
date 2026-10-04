import { useRef } from "react";

/**
 * The record's single filter: one ability (or all) at a time.
 * Toggle buttons with aria-pressed; Escape inside the group clears it.
 */
export default function AbilityFilter({ abilities, selectedId, onSelect, status, announcement }) {
  const allRef = useRef(null);

  const clear = () => {
    onSelect(null);
    allRef.current?.focus();
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape" && selectedId) {
      event.preventDefault();
      clear();
    }
  };

  return (
    <div className="pv-abilities" role="group" aria-labelledby="pv-abilities-label" onKeyDown={onKeyDown}>
      <p id="pv-abilities-label" className="pv-abilities__label">
        Select an ability
        <span className="pv-abilities__hint">Filter the record by technology or area of work</span>
      </p>
      <ul className="pv-abilities__list">
        <li>
          <button
            ref={allRef}
            type="button"
            className="pv-ability pv-ability--all"
            aria-pressed={selectedId === null}
            onClick={() => onSelect(null)}
          >
            All abilities
          </button>
        </li>
        {abilities.map((ability) => (
          <li key={ability.id}>
            <button
              type="button"
              className="pv-ability"
              aria-pressed={selectedId === ability.id}
              onClick={() => onSelect(selectedId === ability.id ? null : ability.id)}
            >
              {ability.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="pv-abilities__status">
        <p className="pv-abilities__count">{status}</p>
        {selectedId && (
          <button type="button" className="pv-abilities__clear" onClick={clear}>
            Clear filter
          </button>
        )}
      </div>
      <p className="pv-visually-hidden" aria-live="polite">{announcement}</p>
    </div>
  );
}
