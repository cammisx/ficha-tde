import { useEffect, useRef } from 'react'

export function useDebouncedEffect(effect, deps, delayMs) {
  const cleanupRef = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => {
      if (cleanupRef.current) cleanupRef.current()
      cleanupRef.current = effect() || null
    }, delayMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
