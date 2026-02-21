import React from 'react'
import { Field, TextArea } from '../../components/Field'
import RepeaterTable from '../../components/RepeaterTable'

const COLS = [
  { key: 'name', label: 'Cântico/Cerimônia' },
  { key: 'test', label: 'Teste' },
  { key: 'gp', label: 'GP' },
  { key: 'cost', label: 'Custo' },
  { key: 'litTime', label: 'Tempo lit.' },
  { key: 'range', label: 'Alcance' },
  { key: 'duration', label: 'Duração' },
  { key: 'aspect', label: 'Aspecto' },
  { key: 'he', label: 'HE' },
  { key: 'effect', label: 'Efeito' },
  { key: 'page', label: 'Pág.' },
]
const EMPTY = { name:'', test:'', gp:'', cost:'', litTime:'', range:'', duration:'', aspect:'', he:'', effect:'', page:'' }

export default function Liturgy({ data, update }) {
  const mods = data.liturgy.attributeMods || {}
  return (
    <div className="stack">
      <div className="card">
        <div className="card__title">Pontos de Karma</div>
        <div className="grid4">
          <Field label="PK Máx" type="number" value={data.liturgy.kpMax} onChange={(v) => update('liturgy.kpMax', v)} />
          <Field label="PK Atual" type="number" value={data.liturgy.kpCurrent} onChange={(v) => update('liturgy.kpCurrent', v)} />
          <Field label="Atributo primário" value={data.liturgy.primaryAttribute} onChange={(v) => update('liturgy.primaryAttribute', v)} />
          <Field label="Tradição" value={data.liturgy.tradition} onChange={(v) => update('liturgy.tradition', v)} />
        </div>
        <Field label="Aspecto" value={data.liturgy.aspect} onChange={(v) => update('liturgy.aspect', v)} />
      </div>

      <RepeaterTable
        title="Cânticos litúrgicos & cerimônias"
        columns={COLS}
        rows={data.liturgy.chants}
        onChange={(rows) => update('liturgy.chants', rows)}
        emptyRow={EMPTY}
      />

      <div className="card">
        <div className="card__title">Modificadores de atributos (liturgia)</div>
        <div className="grid8">
          {['COU','SGC','INT','CHA','DEX','AGI','CON','STR'].map(k => (
            <Field key={k} label={k} type="number" value={mods[k]} onChange={(v) => update(`liturgy.attributeMods.${k}`, v)} />
          ))}
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card__title">Habilidades especiais abençoadas</div>
          <TextArea label="" value={data.liturgy.specialAbilities} onChange={(v) => update('liturgy.specialAbilities', v)} rows={10} />
        </div>
        <div className="card">
          <div className="card__title">Bênçãos</div>
          <TextArea label="" value={data.liturgy.blessings} onChange={(v) => update('liturgy.blessings', v)} rows={10} />
        </div>
      </div>
    </div>
  )
}
