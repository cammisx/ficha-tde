import React from 'react'
import { Field, TextArea } from '../../components/Field'
import RepeaterTable from '../../components/RepeaterTable'

const COLS = [
  { key: 'name', label: 'Magia/Ritual' },
  { key: 'test', label: 'Teste' },
  { key: 'gp', label: 'GP' },
  { key: 'cost', label: 'Custo' },
  { key: 'castTime', label: 'Tempo conj.' },
  { key: 'range', label: 'Alcance' },
  { key: 'duration', label: 'Duração' },
  { key: 'property', label: 'Propriedade' },
  { key: 'he', label: 'HE' },
  { key: 'effect', label: 'Efeito' },
  { key: 'page', label: 'Pág.' },
]
const EMPTY = { name:'', test:'', gp:'', cost:'', castTime:'', range:'', duration:'', property:'', he:'', effect:'', page:'' }

export default function Magic({ data, update }) {
  const mods = data.magic.attributeMods || {}
  return (
    <div className="stack">
      <div className="card">
        <div className="card__title">Energia Arcana</div>
        <div className="grid4">
          <Field label="EA Máx" type="number" value={data.magic.aeMax} onChange={(v) => update('magic.aeMax', v)} />
          <Field label="EA Atual" type="number" value={data.magic.aeCurrent} onChange={(v) => update('magic.aeCurrent', v)} />
          <Field label="Atributo primário" value={data.magic.primaryAttribute} onChange={(v) => update('magic.primaryAttribute', v)} />
          <Field label="Tradição" value={data.magic.tradition} onChange={(v) => update('magic.tradition', v)} />
        </div>
        <Field label="Propriedade" value={data.magic.property} onChange={(v) => update('magic.property', v)} />
      </div>

      <RepeaterTable
        title="Magias & rituais"
        columns={COLS}
        rows={data.magic.spells}
        onChange={(rows) => update('magic.spells', rows)}
        emptyRow={EMPTY}
      />

      <div className="card">
        <div className="card__title">Modificadores de atributos (magia)</div>
        <div className="grid8">
          {['COU','SGC','INT','CHA','DEX','AGI','CON','STR'].map(k => (
            <Field key={k} label={k} type="number" value={mods[k]} onChange={(v) => update(`magic.attributeMods.${k}`, v)} />
          ))}
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card__title">Habilidades especiais mágicas</div>
          <TextArea label="" value={data.magic.specialAbilities} onChange={(v) => update('magic.specialAbilities', v)} rows={10} />
        </div>
        <div className="card">
          <div className="card__title">Truques</div>
          <TextArea label="" value={data.magic.cantrips} onChange={(v) => update('magic.cantrips', v)} rows={10} />
        </div>
      </div>
    </div>
  )
}
