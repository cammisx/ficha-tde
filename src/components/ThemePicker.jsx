import React, { useState } from 'react'
import { useTheme } from '../theme/ThemeProvider'

export default function ThemePicker() {
  const { themes, themeId, setThemeId } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="themePicker">
      <button className="btn" type="button" onClick={() => setOpen(v => !v)}>
        Tema
      </button>

      {open ? (
        <div className="themePicker__panel" role="dialog" aria-label="Selecionar tema">
          <div className="themePicker__head">
            <div className="themePicker__title">Temas</div>
            <button className="btn btn--ghost" type="button" onClick={() => setOpen(false)}>Fechar</button>
          </div>

          <div className="themeGrid">
            {themes.map(t => (
              <button
                key={t.id}
                type="button"
                className={`themeSwatch ${t.id === themeId ? 'themeSwatch--active' : ''}`}
                onClick={() => { setThemeId(t.id); setOpen(false) }}
                title={t.name}
              >
                <span className="themeSwatch__name">{t.name}</span>
                <span className="themeSwatch__dots">
                  <span className="dot" style={{ background: t.vars['--accent1'] }} />
                  <span className="dot" style={{ background: t.vars['--accent2'] }} />
                  <span className="dot" style={{ background: t.vars['--panel2'] }} />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
