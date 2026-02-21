import React, { useEffect, useMemo, useState } from 'react'

export default function CollapsibleCard({ title, storageKey, defaultOpen = true, right = null, children }) {
  const key = useMemo(() => `tde_coll_${storageKey}`, [storageKey])
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    const raw = localStorage.getItem(key)
    if (raw === '0') setOpen(false)
    if (raw === '1') setOpen(true)
  }, [key])

  function toggle() {
    setOpen(v => {
      const next = !v
      localStorage.setItem(key, next ? '1' : '0')
      return next
    })
  }

  return (
    <section className="card">
      <div className="collHead">
        <button className="collBtn" type="button" onClick={toggle} aria-expanded={open}>
          <span className="collChevron">{open ? '▾' : '▸'}</span>
          <span className="collTitle">{title}</span>
        </button>
        <div className="collRight">{right}</div>
      </div>
      {open ? <div className="collBody">{children}</div> : null}
    </section>
  )
}
