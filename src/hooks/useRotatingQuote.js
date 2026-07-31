import { useCallback, useEffect, useState } from 'react'

/** Random index that is never the one already showing (unless there is only one). */
const pickIndex = (length, exclude) => {
  if (length <= 1) return 0
  if (exclude === null || exclude >= length) return Math.floor(Math.random() * length)
  // walk a random distance forward: uniform across every index except `exclude`
  return (exclude + 1 + Math.floor(Math.random() * (length - 1))) % length
}

/**
 * Picks a random saved Goodreads quote for the hero: once per page load, and
 * again every time the hero comes back into view after being scrolled past —
 * so scrolling up to the top swaps the quote instead of showing the same one.
 *
 * @param {Array} quotes  quote list (stable identity — see useMeData)
 * @param {object} targetRef  ref to the element whose re-entry triggers a swap
 */
export const useRotatingQuote = (quotes, targetRef) => {
  const [index, setIndex] = useState(0)

  const rotate = useCallback(() => {
    setIndex((current) => pickIndex(quotes.length, current))
  }, [quotes])

  // fresh quote on load, and again when the live list replaces the bundled one
  useEffect(() => {
    setIndex(pickIndex(quotes.length, null))
  }, [quotes])

  useEffect(() => {
    const node = targetRef.current
    if (!node || quotes.length < 2 || typeof IntersectionObserver === 'undefined') return

    // Only rotate on a real return trip: the hero has to leave first, then come
    // back far enough that the swap happens off-screen rather than under the eye.
    let away = false

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio <= 0.05) {
            away = true
          } else if (away && entry.intersectionRatio >= 0.5) {
            away = false
            rotate()
          }
        }
      },
      { threshold: [0, 0.05, 0.5] }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [quotes, rotate, targetRef])

  return { quote: quotes[index] || null, index, rotate }
}

export default useRotatingQuote
