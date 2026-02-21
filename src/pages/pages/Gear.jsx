import React, { useMemo } from 'react'
import { Field, TextArea } from '../../components/Field'
import RepeaterTable from '../../components/RepeaterTable'

const ITEM_COLS = [
  { key: 'item', label: 'Item' },
  { key: 'weight', label: 'Peso' },
  { key: 'carried', label: 'Carregado?' },
]
const ITEM_EMPTY = { item:'', weight:'', carried:'' }

export default function Gear({ data, update }) {
  const money = data.gear.money || {}

  const totalWeight = useMemo(() => {
    const w = (data.gear.items || []).reduce((sum, r) => sum + (Number(r.weight) || 0), 0)
    return Math.round(w * 100) / 100
  }, [data.gear.items])

  const carryCapacity = useMemo(() => {
    const str = Number(data.attributes?.STR) || 0
    return str * 4
  }, [data.attributes?.STR])

  // atualiza campos calculados (mantém simples e sobrescrevível se você quiser depois)
  if (data.gear.totalWeight !== totalWeight) update('gear.totalWeight', totalWeight)
  if (data.gear.carryCapacity !== carryCapacity) update('gear.carryCapacity', carryCapacity)

  return (
    <div className="stack">
      <RepeaterTable
        title="Equipamento"
        columns={ITEM_COLS}
        rows={data.gear.items}
        onChange={(rows) => update('gear.items', rows)}
        emptyRow={ITEM_EMPTY}
      />

      <div className="grid3">
        <div className="card">
          <div className="card__title">Peso</div>
          <div className="grid2">
            <Field label="Peso total (kg)" type="number" value={data.gear.totalWeight} onChange={(v) => update('gear.totalWeight', v)} />
            <Field label="Capacidade de carga (FOR x 4)" type="number" value={data.gear.carryCapacity} onChange={(v) => update('gear.carryCapacity', v)} />
          </div>
          <div className="muted tiny">A capacidade é calculada automaticamente; se quiser, pode sobrescrever.</div>
        </div>

        <div className="card">
          <div className="card__title">Algibeira (moedas)</div>
          <div className="grid2">
            <Field label="Ducados" type="number" value={money.ducats} onChange={(v) => update('gear.money.ducats', v)} />
            <Field label="Táleres de prata" type="number" value={money.silver} onChange={(v) => update('gear.money.silver', v)} />
            <Field label="Haleres" type="number" value={money.halers} onChange={(v) => update('gear.money.halers', v)} />
            <Field label="Kreuzeres" type="number" value={money.kreuzers} onChange={(v) => update('gear.money.kreuzers', v)} />
          </div>
          <TextArea label="Gemas" value={money.gems} onChange={(v) => update('gear.money.gems', v)} rows={3} />
          <TextArea label="Joias / outros" value={money.jewelryAndOther} onChange={(v) => update('gear.money.jewelryAndOther', v)} rows={3} />
        </div>

        <div className="card">
          <div className="card__title">Animal</div>
          <div className="grid2">
            <Field label="Nome" value={data.animal.name} onChange={(v) => update('animal.name', v)} />
            <Field label="Tipo" value={data.animal.type} onChange={(v) => update('animal.type', v)} />
            <Field label="Size category" value={data.animal.sizeCategory} onChange={(v) => update('animal.sizeCategory', v)} />
          </div>
          <div className="muted tiny">Detalhes completos do animal ficam no final desta página.</div>
        </div>
      </div>

      <div className="card">
        <div className="card__title">Animal (detalhado)</div>
        <div className="grid4">
          <Field label="PV" type="number" value={data.animal.derived.lp} onChange={(v) => update('animal.derived.lp', v)} />
          <Field label="EA" type="number" value={data.animal.derived.ae} onChange={(v) => update('animal.derived.ae', v)} />
          <Field label="ESP" type="number" value={data.animal.derived.sp} onChange={(v) => update('animal.derived.sp', v)} />
          <Field label="TEN" type="number" value={data.animal.derived.ten} onChange={(v) => update('animal.derived.ten', v)} />
          <Field label="PRO" type="number" value={data.animal.derived.pro} onChange={(v) => update('animal.derived.pro', v)} />
          <Field label="INI" type="number" value={data.animal.derived.ini} onChange={(v) => update('animal.derived.ini', v)} />
          <Field label="MOV" type="number" value={data.animal.derived.mov} onChange={(v) => update('animal.derived.mov', v)} />
        </div>

        <div className="card__subtitle">Atributos (animal)</div>
        <div className="grid8">
          {['COU','SGC','SGCa','INT','CHA','DEX','AGI','CON','STR'].map(k => (
            <Field
              key={k}
              label={k}
              type="number"
              value={data.animal.attributes[k]}
              onChange={(v) => update(`animal.attributes.${k}`, v)}
            />
          ))}
        </div>

        <div className="card__subtitle">Ataque</div>
        <div className="grid4">
          <Field label="AT" value={data.animal.attack.at} onChange={(v) => update('animal.attack.at', v)} />
          <Field label="AP" value={data.animal.attack.ap} onChange={(v) => update('animal.attack.ap', v)} />
          <Field label="DN" value={data.animal.attack.dn} onChange={(v) => update('animal.attack.dn', v)} />
          <Field label="AL" value={data.animal.attack.reach} onChange={(v) => update('animal.attack.reach', v)} />
        </div>

        <div className="grid2">
          <TextArea label="Ações" value={data.animal.actions} onChange={(v) => update('animal.actions', v)} rows={6} />
          <TextArea label="Habilidades especiais" value={data.animal.specialAbilities} onChange={(v) => update('animal.specialAbilities', v)} rows={6} />
        </div>
      </div>
    </div>
  )
}
