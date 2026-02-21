import React, { useMemo, useState } from 'react'
import { Link, NavLink, useParams, useNavigate } from 'react-router-dom'
import { useCharacter } from '../lib/useCharacter'
import AutosaveBadge from '../components/AutosaveBadge'
import ThemePicker from '../components/ThemePicker'
import { downloadJson, readJsonFile } from '../lib/exportImport'
import { useAuth } from '../auth/AuthProvider'

import Personal from './pages/Personal'
import Skills from './pages/Skills'
import Combat from './pages/Combat'
import Gear from './pages/Gear'
import Magic from './pages/Magic'
import Liturgy from './pages/Liturgy'

const TABS = [
  { key: 'personal', label: 'Pessoal' },
  { key: 'skills', label: 'Perícias' },
  { key: 'combat', label: 'Combate' },
  { key: 'gear', label: 'Pertences' },
  { key: 'magic', label: 'Magias' },
  { key: 'liturgy', label: 'Liturgias' },
]

export default function Sheet() {
  const { id } = useParams()
  const { data, update, loading, saveState, error, setData } = useCharacter(id)
  const { logout } = useAuth()
  const nav = useNavigate()

  const [tab, setTab] = useState('personal')

  const title = useMemo(() => data?.meta?.name?.trim() || `Personagem: ${id}`, [data, id])

  async function onImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const obj = await readJsonFile(file)
      setData(obj)
    } catch (err) {
      alert('Falha ao importar JSON: ' + (err?.message || String(err)))
    } finally {
      e.target.value = ''
    }
  }

  if (loading) return <div className="center">Carregando ficha…</div>

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__left">
          <div className="brand">
            <div className="brand__title">{title}</div>
            <div className="brand__sub">
              <span className="muted">/c/{id}</span> · <AutosaveBadge state={saveState} />
            </div>
          </div>
        </div>

        <div className="topbar__right">
          <ThemePicker />
          <button className="btn" type="button" onClick={() => window.print()}>Imprimir</button>

          <button className="btn" type="button" onClick={() => downloadJson(`tde-${id}.json`, data)}>
            Exportar JSON
          </button>

          <label className="btn btn--ghost" style={{ cursor: 'pointer' }}>
            Importar JSON
            <input type="file" accept="application/json" onChange={onImport} style={{ display: 'none' }} />
          </label>

          <button className="btn btn--ghost" type="button" onClick={async () => { await logout(); nav('/login', { replace: true }) }}>
            Sair
          </button>
        </div>
      </header>

      <nav className="tabs" aria-label="Navegação">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`tab ${tab === t.key ? 'tab--active' : ''}`}
            onClick={() => setTab(t.key)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {error ? <div className="error">Erro: {String(error?.message || error)}</div> : null}

        {tab === 'personal' && <Personal data={data} update={update} />}
        {tab === 'skills' && <Skills data={data} update={update} />}
        {tab === 'combat' && <Combat data={data} update={update} />}
        {tab === 'gear' && <Gear data={data} update={update} />}
        {tab === 'magic' && <Magic data={data} update={update} />}
        {tab === 'liturgy' && <Liturgy data={data} update={update} />}
      </main>

      <footer className="footer">
        <div className="muted tiny">
          Dica: você pode criar um novo personagem mudando a URL para <code>/c/qualquer-id</code> (ex: <code>/c/chloe</code>).
        </div>
      </footer>
    </div>
  )
}
