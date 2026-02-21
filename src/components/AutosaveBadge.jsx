import React from 'react'

export default function AutosaveBadge({ state }) {
  if (state === 'saving') return <span className="badge">Salvando…</span>
  if (state === 'saved') return <span className="badge badge--ok">Salvo</span>
  if (state === 'error') return <span className="badge badge--err">Erro ao salvar</span>
  return <span className="badge badge--idle">Auto-save</span>
}
