import React from 'react'
import { Field, TextArea } from '../../components/Field'
import RepeaterTable from '../../components/RepeaterTable'

const COLS = [
  { key: 'skill', label: 'Perícia' },
  { key: 'test', label: 'Teste' },
  { key: 'sop', label: 'SOB' },
  { key: 'ca', label: 'CA' },
  { key: 'gp', label: 'GP' },
  { key: 'r', label: 'R' },
  { key: 'notes', label: 'Observações' },
]
const EMPTY = { skill: '', test: '', sop: '', ca: '', gp: '', r: '', notes: '' }

function AttrMods({ data, update }) {
  const mods = data.skills.attributeMods || {}
  return (
    <div className="card">
      <div className="card__title">Modificadores de atributos</div>
      <div className="grid8">
        {['COU','SGC','INT','CHA','DEX','AGI','CON','STR'].map(k => (
          <Field key={k} label={k} type="number" value={mods[k]} onChange={(v) => update(`skills.attributeMods.${k}`, v)} />
        ))}
      </div>
      <div className="muted tiny">Na ficha original isso é a grade -3 a +3. Aqui fica numérico (pode pôr negativo).</div>
    </div>
  )
}

export default function Skills({ data, update }) {
  return (
    <div className="stack">
      <RepeaterTable
        title="Perícias físicas"
        columns={COLS}
        rows={data.skills.physical}
        onChange={(rows) => update('skills.physical', rows)}
        emptyRow={EMPTY}
      />
      <RepeaterTable
        title="Perícias sociais"
        columns={COLS}
        rows={data.skills.social}
        onChange={(rows) => update('skills.social', rows)}
        emptyRow={EMPTY}
      />
      <RepeaterTable
        title="Perícias naturais"
        columns={COLS}
        rows={data.skills.nature}
        onChange={(rows) => update('skills.nature', rows)}
        emptyRow={EMPTY}
      />
      <RepeaterTable
        title="Perícias de conhecimento"
        columns={COLS}
        rows={data.skills.knowledge}
        onChange={(rows) => update('skills.knowledge', rows)}
        emptyRow={EMPTY}
      />
      <RepeaterTable
        title="Perícias de ofício"
        columns={COLS}
        rows={data.skills.craft}
        onChange={(rows) => update('skills.craft', rows)}
        emptyRow={EMPTY}
      />

      <div className="grid2">
        <div className="card">
          <div className="card__title">Idiomas</div>
          <TextArea label="" value={data.skills.languages} onChange={(v) => update('skills.languages', v)} rows={6} placeholder="Liste aqui os idiomas..." />
        </div>
        <div className="card">
          <div className="card__title">Escritas conhecidas (alfabetização)</div>
          <TextArea label="" value={data.skills.scripts} onChange={(v) => update('skills.scripts', v)} rows={6} placeholder="Liste aqui as escritas..." />
        </div>
      </div>

      <AttrMods data={data} update={update} />

      <div className="card">
        <div className="card__title">Tabela de referência</div>
        <div className="muted">
          A ficha original tem a tabela “Pontos de Perícia x Nível de Qualidade” como referência.
          Se você quiser, eu transformo isso em um painel calculável depois (por enquanto deixei simples).
        </div>
      </div>
    </div>
  )
}
