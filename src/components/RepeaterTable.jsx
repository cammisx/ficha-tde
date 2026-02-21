import React from 'react'

export default function RepeaterTable({ title, columns, rows, onChange, emptyRow }) {
  function setCell(i, key, value) {
    const next = rows.map((r, idx) => idx === i ? { ...r, [key]: value } : r)
    onChange(next)
  }
  function addRow() {
    onChange([...(rows || []), { ...emptyRow }])
  }
  function removeRow(i) {
    onChange(rows.filter((_, idx) => idx !== i))
  }

  return (
    <div className="card">
      <div className="card__head">
        <div className="card__title">{title}</div>
        <button className="btn" type="button" onClick={addRow}>+ Linha</button>
      </div>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              {columns.map(c => <th key={c.key}>{c.label}</th>)}
              <th className="thSmall"> </th>
            </tr>
          </thead>
          <tbody>
            {(rows || []).length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="muted">Sem linhas ainda.</td></tr>
            ) : (rows || []).map((r, i) => (
              <tr key={i}>
                {columns.map(c => (
                  <td key={c.key}>
                    <input
                      className="input input--table"
                      value={r?.[c.key] ?? ''}
                      onChange={(e) => setCell(i, c.key, e.target.value)}
                      placeholder={c.placeholder || ''}
                    />
                  </td>
                ))}
                <td className="tdActions">
                  <button className="btn btn--ghost" type="button" onClick={() => removeRow(i)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
