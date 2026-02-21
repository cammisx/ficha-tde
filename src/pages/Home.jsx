import React, { useEffect, useMemo, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { useAuth } from '../auth/AuthProvider'

function slugify(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function Home() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  const [openId, setOpenId] = useState('')
  const [newName, setNewName] = useState('')
  const [items, setItems] = useState([])
  const [err, setErr] = useState(null)

  const uid = user?.uid

  useEffect(() => {
    if (!uid) return
    const q = query(
      collection(db, 'characters'),
      where('ownerUid', '==', uid),
      orderBy('updatedAt', 'desc'),
      limit(20)
    )
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setItems(rows)
    }, (e) => setErr(e))
    return () => unsub()
  }, [uid])

  const suggestedId = useMemo(() => {
    const s = slugify(newName)
    return s || ''
  }, [newName])

  function goTo(id) {
    const clean = String(id || '').trim()
    if (!clean) return
    nav(`/c/${clean}`)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand__title">Ficha The Dark Eye</div>
          <div className="brand__sub muted">Seus personagens</div>
        </div>
        <div className="topbar__right">
          <button className="btn btn--ghost" type="button" onClick={async () => { await logout(); nav('/login', { replace: true }) }}>
            Sair
          </button>
        </div>
      </header>

      <main className="content">
        {err ? <div className="error">Erro: {String(err?.message || err)}</div> : null}

        <div className="grid2">
          <div className="card">
            <div className="card__title">Abrir personagem</div>
            <div className="stack">
              <label className="field">
                <div className="field__label">ID do personagem</div>
                <input className="input" value={openId} onChange={e => setOpenId(e.target.value)} placeholder="ex: chloe" />
              </label>
              <button className="btn btn--primary" type="button" onClick={() => goTo(openId)}>
                Abrir
              </button>
              <div className="muted tiny">Dica: o ID vira parte da URL: <code>/c/seu-id</code></div>
            </div>
          </div>

          <div className="card">
            <div className="card__title">Criar personagem</div>
            <div className="stack">
              <label className="field">
                <div className="field__label">Nome (gera um ID)</div>
                <input className="input" value={newName} onChange={e => setNewName(e.target.value)} placeholder="ex: Chloë" />
              </label>
              <div className="muted tiny">ID sugerido: <code>{suggestedId || '—'}</code></div>
              <button className="btn btn--primary" type="button" disabled={!suggestedId} onClick={() => goTo(suggestedId)}>
                Criar e abrir
              </button>
              <div className="muted tiny">A ficha é criada automaticamente quando você abrir.</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 14 }}>
          <div className="card__title">Recentes</div>
          {items.length === 0 ? (
            <div className="muted">Nenhuma ficha ainda.</div>
          ) : (
            <div className="list">
              {items.map(it => (
                <button key={it.id} className="listItem" type="button" onClick={() => goTo(it.id)}>
                  <div className="listItem__main">
                    <div className="listItem__title">{it?.meta?.name?.trim() || it.id}</div>
                    <div className="listItem__sub muted">/c/{it.id}</div>
                  </div>
                  <div className="listItem__chev">›</div>
                </button>
              ))}
            </div>
          )}
          <div className="muted tiny" style={{ marginTop: 8 }}>
            *Se o Firestore reclamar de índice, crie o índice sugerido no link que o console mostra (ownerUid + updatedAt).
          </div>
        </div>
      </main>
    </div>
  )
}
