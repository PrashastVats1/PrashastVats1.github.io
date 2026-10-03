import { useEffect, useRef, useState } from "react";
import { useIsSpread, usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { useSpellbook } from "./useSpellbook";

const FOLIOS = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
const SWIPE_MIN_PX = 50;

function Arrow({ direction }) {
  return (
    <svg className="pv-page-button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={direction === "next" ? "M5 12h13M13 6l6 6-6 6" : "M19 12H6M11 6l-6 6 6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function statusText(visible, total) {
  if (visible.length > 1) return `Pages ${visible[0] + 1}–${visible[visible.length - 1] + 1} of ${total}`;
  return `Page ${visible[0] + 1} of ${total}`;
}

/**
 * An open book. Desktop (>=1024px) shows a two-page spread; narrower screens
 * show one page at a time. Pages turn with the buttons below the book, the
 * curled page corners, the arrow keys while focus is inside the book, or a
 * horizontal swipe. This is separate from the global route transition.
 *
 * pages: [{ id, title, content }]
 */
export default function Spellbook({ label, pages }) {
  const isSpread = useIsSpread();
  const reducedMotion = usePrefersReducedMotion();
  const book = useSpellbook(pages.length, isSpread);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const lastControl = useRef(null);
  const touchStart = useRef(null);
  const announcedFirst = useRef(book.first);
  const [announcement, setAnnouncement] = useState("");

  const visibleTitles = book.visible.map((i) => pages[i].title).join(" and ");
  const status = statusText(book.visible, pages.length);

  useEffect(() => {
    // Only announce actual page turns, not layout changes on resize.
    if (announcedFirst.current === book.first) return;
    announcedFirst.current = book.first;
    setAnnouncement(`${status}: ${visibleTitles}`);
    // A button disabled while focused would drop focus to <body>.
    if (lastControl.current === "next" && !book.canNext && prevRef.current) prevRef.current.focus();
    if (lastControl.current === "prev" && !book.canPrev && nextRef.current) nextRef.current.focus();
    lastControl.current = null;
  }, [book.first, status, visibleTitles, book.canNext, book.canPrev]);

  const turnWithControl = (dir) => {
    lastControl.current = dir;
    if (dir === "next") book.next();
    else book.prev();
  };

  const onKeyDown = (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === "ArrowRight" && book.canNext) {
      e.preventDefault();
      turnWithControl("next");
    } else if (e.key === "ArrowLeft" && book.canPrev) {
      e.preventDefault();
      turnWithControl("prev");
    }
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
  };

  const onTouchEnd = (e) => {
    const start = touchStart.current;
    const t = e.changedTouches[0];
    touchStart.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) book.next();
    else book.prev();
  };

  return (
    <section
      className="pv-spellbook"
      aria-label={label}
      aria-roledescription="book"
      data-layout={isSpread ? "spread" : "single"}
      data-motion={reducedMotion ? "reduced" : "full"}
      data-direction={book.direction || "none"}
      data-testid="spellbook"
      onKeyDown={onKeyDown}
    >
      <div className="pv-book">
        <div className="pv-book__pages" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {pages.map((page, i) => {
            const current = book.visible.includes(i);
            const side = isSpread ? (i % 2 === 0 ? "left" : "right") : "single";
            return (
              <section
                key={page.id}
                className={`pv-book__page pv-book__page--${side}`}
                data-state={current ? "current" : "inactive"}
                data-page={page.id}
                aria-label={`${page.title}, page ${i + 1} of ${pages.length}`}
                aria-hidden={current ? undefined : true}
                inert={current ? undefined : ""}
              >
                <div className="pv-book__page-content">{page.content}</div>
                <span className="pv-book__folio" aria-hidden="true">{FOLIOS[i] || i + 1}</span>
              </section>
            );
          })}

          {book.canPrev && (
            <button type="button" className="pv-book__corner pv-book__corner--prev" tabIndex={-1} aria-hidden="true" onClick={book.prev} />
          )}
          {book.canNext && (
            <button type="button" className="pv-book__corner pv-book__corner--next" tabIndex={-1} aria-hidden="true" onClick={book.next} />
          )}
        </div>
      </div>

      <nav className="pv-book-controls" aria-label="Spellbook pages">
        <button
          ref={prevRef}
          type="button"
          className="pv-page-button"
          onClick={() => turnWithControl("prev")}
          disabled={!book.canPrev}
          aria-keyshortcuts="ArrowLeft"
        >
          <Arrow direction="prev" />
          <span>Previous page</span>
        </button>

        <p className="pv-book-controls__status">
          <span className="pv-book-controls__count">{status}</span>
          <span className="pv-book-controls__titles">{visibleTitles}</span>
        </p>

        <button
          ref={nextRef}
          type="button"
          className="pv-page-button"
          onClick={() => turnWithControl("next")}
          disabled={!book.canNext}
          aria-keyshortcuts="ArrowRight"
        >
          <span>Next page</span>
          <Arrow direction="next" />
        </button>
      </nav>

      <p className="pv-visually-hidden" aria-live="polite">{announcement}</p>
    </section>
  );
}
