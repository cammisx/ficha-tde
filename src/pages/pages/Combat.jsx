import React from 'react'
import { Field, TextArea } from '../../components/Field'
import RepeaterTable from '../../components/RepeaterTable'

const CT_COLS = [
  { key: 'technique', label: 'Técnica' },
  { key: 'primaryAttribute', label: 'Atributo primário' },
  { key: 'ca', label: 'CA' },
  { key: 'gtc', label: 'GTC' },
  { key: 'atCd', label: 'AT/CD' },
  { key: 'ap', label: 'AP' },
]
const CT_EMPTY = { technique:'', primaryAttribute:'', ca:'', gtc:'', atCd:'', ap:'' }

const MELEE_COLS = [
  { key: 'weapon', label: 'Arma' },
  { key: 'technique', label: 'Técnica' },
  { key: 'damageBonus', label: 'Bônus de dano' },
  { key: 'dn', label: 'DN' },
  { key: 'atMod', label: 'Mod AT' },
  { key: 'apMod', label: 'Mod AP' },
  { key: 'reach', label: 'Alcance' },
  { key: 'at', label: 'AT' },
  { key: 'ap', label: 'AP' },
  { key: 'weight', label: 'Peso' },
]
const MELEE_EMPTY = { weapon:'', technique:'', damageBonus:'', dn:'', atMod:'', apMod:'', reach:'', at:'', ap:'', weight:'' }

const RANGED_COLS = [
  { key: 'weapon', label: 'Arma' },
  { key: 'technique', label: 'Técnica' },
  { key: 'reload', label: 'Recarga' },
  { key: 'dn', label: 'DN' },
  { key: 'distance', label: 'Distância' },
  { key: 'cd', label: 'CD' },
  { key: 'ammo', label: 'Munição' },
  { key: 'weight', label: 'Peso' },
]
const RANGED_EMPTY = { weapon:'', technique:'', reload:'', dn:'', distance:'', cd:'', ammo:'', weight:'' }

const PARRY_COLS = [
  { key: 'item', label: 'Escudo/Arma de aparar' },
  { key: 'structure', label: 'Pontos de estrutura' },
  { key: 'atMod', label: 'Mod AT' },
  { key: 'paMod', label: 'Mod PA' },
  { key: 'weight', label: 'Peso' },
]
const PARRY_EMPTY = { item:'', structure:'', atMod:'', paMod:'', weight:'' }

export default function Combat({ data, update }) {
  const w = data.combat.wounds
  const cond = data.combat.conditions
  return (
    <div className="stack">
      <RepeaterTable
        title="Técnicas de combate"
        columns={CT_COLS}
        rows={data.combat.combatTechniques}
        onChange={(rows) => update('combat.combatTechniques', rows)}
        emptyRow={CT_EMPTY}
      />

      <div className="card">
        <div className="card__title">Pontos de vida / Ferimentos</div>
        <div className="grid4">
          <Field label="PV Máx" type="number" value={w.max} onChange={(v) => update('combat.wounds.max', v)} />
          <Field label="PV Atual" type="number" value={w.current} onChange={(v) => update('combat.wounds.current', v)} />
          <Field label="% perdido (faixa)" value={w.lostPercent} onChange={(v) => update('combat.wounds.lostPercent', v)} placeholder="Ex: 25% / 50% ..." />
          <div className="stack tight">
            <label className="check">
              <input type="checkbox" checked={!!w.at5OrLess} onChange={(e) => update('combat.wounds.at5OrLess', e.target.checked)} />
              <span>5 ou menos</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={!!w.at0OrLess} onChange={(e) => update('combat.wounds.at0OrLess', e.target.checked)} />
              <span>0 ou menos</span>
            </label>
          </div>
        </div>
      </div>

      <RepeaterTable
        title="Armas corpo a corpo"
        columns={MELEE_COLS}
        rows={data.combat.meleeWeapons}
        onChange={(rows) => update('combat.meleeWeapons', rows)}
        emptyRow={MELEE_EMPTY}
      />

      <RepeaterTable
        title="Armas à distância"
        columns={RANGED_COLS}
        rows={data.combat.rangedWeapons}
        onChange={(rows) => update('combat.rangedWeapons', rows)}
        emptyRow={RANGED_EMPTY}
      />

      <div className="grid2">
        <div className="card">
          <div className="card__title">Armadura</div>
          <div className="grid3">
            <Field label="PRO" type="number" value={data.combat.armor.protection} onChange={(v) => update('combat.armor.protection', v)} />
            <Field label="SOB" type="number" value={data.combat.armor.encumbrance} onChange={(v) => update('combat.armor.encumbrance', v)} />
            <Field label="AP" type="number" value={data.combat.armor.ap} onChange={(v) => update('combat.armor.ap', v)} />
            <Field label="Peso" type="number" value={data.combat.armor.weight} onChange={(v) => update('combat.armor.weight', v)} />
            <Field label="Penalidades" value={data.combat.armor.penalties} onChange={(v) => update('combat.armor.penalties', v)} />
            <Field label="Notas" value={data.combat.armor.notes} onChange={(v) => update('combat.armor.notes', v)} />
          </div>
        </div>

        <RepeaterTable
          title="Escudo / Armas de aparar"
          columns={PARRY_COLS}
          rows={data.combat.parryItems}
          onChange={(rows) => update('combat.parryItems', rows)}
          emptyRow={PARRY_EMPTY}
        />
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card__title">Habilidades especiais de combate</div>
          <TextArea label="" value={data.combat.combatSpecialAbilities} onChange={(v) => update('combat.combatSpecialAbilities', v)} rows={10} />
        </div>

        <div className="card">
          <div className="card__title">Condições</div>
          <div className="grid3">
            <Field label="Arrebentamento" type="number" value={cond.rupture} onChange={(v) => update('combat.conditions.rupture', v)} />
            <Field label="Confusão" type="number" value={cond.confusion} onChange={(v) => update('combat.conditions.confusion', v)} />
            <Field label="Dor" type="number" value={cond.pain} onChange={(v) => update('combat.conditions.pain', v)} />
            <Field label="Estupor" type="number" value={cond.stupor} onChange={(v) => update('combat.conditions.stupor', v)} />
            <Field label="Medo" type="number" value={cond.fear} onChange={(v) => update('combat.conditions.fear', v)} />
            <Field label="Paralisia" type="number" value={cond.paralysis} onChange={(v) => update('combat.conditions.paralysis', v)} />
            <Field label="Sobrecarga" type="number" value={cond.overburden} onChange={(v) => update('combat.conditions.overburden', v)} />
          </div>
          <div className="muted tiny">Na ficha original aparecem níveis (1–4 etc). Aqui fica numérico livre.</div>
        </div>
      </div>
    </div>
  )
}
