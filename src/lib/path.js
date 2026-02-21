export function get(obj, path, fallback = undefined) {
  if (!path) return obj ?? fallback
  const parts = path.split('.').filter(Boolean)
  let cur = obj
  for (const p of parts) {
    if (cur == null) return fallback
    cur = cur[p]
  }
  return cur === undefined ? fallback : cur
}

export function set(obj, path, value) {
  const parts = path.split('.').filter(Boolean)
  const out = Array.isArray(obj) ? [...obj] : { ...(obj || {}) }
  let cur = out
  for (let i = 0; i < parts.length; i++) {
    const key = parts[i]
    const isLast = i === parts.length - 1
    const next = cur[key]
    if (isLast) {
      cur[key] = value
    } else {
      const nextIsArrayIndex = /^\d+$/.test(parts[i + 1])
      const base = next ?? (nextIsArrayIndex ? [] : {})
      cur[key] = Array.isArray(base) ? [...base] : { ...base }
      cur = cur[key]
    }
  }
  return out
}
