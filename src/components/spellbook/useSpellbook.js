import { useCallback, useState } from "react";

/**
 * Page-turn state for a book of `pageCount` leaves. One page index is kept
 * regardless of layout; a two-page spread shows the even/odd pair containing
 * it, so resizing between layouts keeps the reader on the same content.
 */
export function useSpellbook(pageCount, isSpread) {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const step = isSpread ? 2 : 1;
  const first = isSpread ? pageIndex - (pageIndex % 2) : pageIndex;
  const visible = isSpread ? [first, first + 1].filter((i) => i < pageCount) : [first];
  const canPrev = first > 0;
  const canNext = first + step < pageCount;

  const next = useCallback(() => {
    if (!canNext) return;
    setDirection("next");
    setPageIndex(first + step);
  }, [canNext, first, step]);

  const prev = useCallback(() => {
    if (!canPrev) return;
    setDirection("prev");
    setPageIndex(Math.max(0, first - step));
  }, [canPrev, first, step]);

  return { first, visible, canPrev, canNext, next, prev, direction };
}
