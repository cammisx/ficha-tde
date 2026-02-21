import React from 'react'
import { Field, TextArea } from '../../components/Field'
import RepeaterTable from '../../components/RepeaterTable'

function DerivedRow({ label, basePath, data, update }) {
  const row = data?.derived?.[basePath] || {}
  return (
    <div className="grid5">
      <div className="muted">{label}</div>
      <Field label="Valor" type="number" value={row.value} onChange={(v) => update(`derived.${basePath}.value`, v)} />
      <Field label="Bônus/Penal." type="number" value={row.bonusPenalty} onChange={(v) => update(`derived.${basePath}.bonusPenalty`, v)} />
      <Field label="Comprado" type="number" value={row.bought} onChange={(v) => update(`derived.${basePath}.bought`, v)} />
      <Field label="Máx" type="number" value={row.max} onChange={(v) => update(`derived.${basePath}.max`, v)} />
    </div>
  )
}

export default function Personal({ data, update }) {
  const attrs = data.attributes || {}
  return (
    <div className="stack">
      <section className="card">
        <div className="card__title">Atributos</div>
        <div className="grid8">
          {['COU','SGC','INT','CHA','DEX','AGI','CON','STR'].map(k => (
            <Field
              key={k}
              label={k}
              type="number"
              value={attrs[k]}
              onChange={(v) => update(`attributes.${k}`, v)}
            />
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card__title">Informações pessoais</div>
        <div className="grid3">
          <Field label="Nome" value={data.meta.name} onChange={(v) => update('meta.name', v)} />
          <Field label="Família" value={data.meta.family} onChange={(v) => update('meta.family', v)} />
          <Field label="Cultura" value={data.meta.culture} onChange={(v) => update('meta.culture', v)} />

          <Field label="Profissão" value={data.meta.profession} onChange={(v) => update('meta.profession', v)} />
          <Field label="Título" value={data.meta.title} onChange={(v) => update('meta.title', v)} />
          <Field label="Status social" value={data.meta.socialStatus} onChange={(v) => update('meta.socialStatus', v)} />

          <Field label="Local de nascimento" value={data.meta.birthplace} onChange={(v) => update('meta.birthplace', v)} />
          <Field label="Data de nascimento" value={data.meta.birthdate} onChange={(v) => update('meta.birthdate', v)} />
          <Field label="Idade" value={data.meta.age} onChange={(v) => update('meta.age', v)} />

          <Field label="Gênero" value={data.meta.gender} onChange={(v) => update('meta.gender', v)} />
          <Field label="Raça" value={data.meta.race} onChange={(v) => update('meta.race', v)} />
          <Field label="Outras infos" value={data.meta.otherInfo} onChange={(v) => update('meta.otherInfo', v)} />

          <Field label="Tamanho" value={data.meta.height} onChange={(v) => update('meta.height', v)} />
          <Field label="Peso" value={data.meta.weight} onChange={(v) => update('meta.weight', v)} />
          <Field label="Características" value={data.meta.features} onChange={(v) => update('meta.features', v)} />

          <Field label="Cabelo" value={data.meta.hair} onChange={(v) => update('meta.hair', v)} />
          <Field label="Olhos" value={data.meta.eyes} onChange={(v) => update('meta.eyes', v)} />
          <Field label="Título (extra)" value={data.meta.title} onChange={(v) => update('meta.title', v)} />
        </div>
      </section>

      <section className="card">
        <div className="card__title">Progressão</div>
        <div className="grid4">
          <Field label="Nível de experiência" value={data.progression.experienceLevel} onChange={(v) => update('progression.experienceLevel', v)} />
          <Field label="PA total" type="number" value={data.progression.apTotal} onChange={(v) => update('progression.apTotal', v)} />
          <Field label="PA adquirido" type="number" value={data.progression.apGained} onChange={(v) => update('progression.apGained', v)} />
          <Field label="PA gasto" type="number" value={data.progression.apSpent} onChange={(v) => update('progression.apSpent', v)} />
        </div>
      </section>

      <section className="card">
        <div className="card__title">Recursos derivados</div>
        <div className="stack">
          <DerivedRow label="Pontos de Vida (PV)" basePath="lp" data={data} update={update} />
          <DerivedRow label="Energia Arcana (EA)" basePath="ae" data={data} update={update} />
          <DerivedRow label="Pontos de Karma (PK)" basePath="kp" data={data} update={update} />
          <DerivedRow label="Espírito (ESP)" basePath="sp" data={data} update={update} />
          <DerivedRow label="Tenacidade (TEN)" basePath="ten" data={data} update={update} />
          <DerivedRow label="Esquiva" basePath="dodge" data={data} update={update} />
          <DerivedRow label="Iniciativa" basePath="ini" data={data} update={update} />
          <DerivedRow label="Movimento" basePath="mov" data={data} update={update} />
        </div>
      </section>

      <section className="card">
        <div className="card__title">Pontos de Destino</div>
        <div className="grid4">
          <Field label="Inicial" type="number" value={data.fatePoints.initial} onChange={(v) => update('fatePoints.initial', v)} />
          <Field label="Bônus" type="number" value={data.fatePoints.bonus} onChange={(v) => update('fatePoints.bonus', v)} />
          <Field label="Máx" type="number" value={data.fatePoints.max} onChange={(v) => update('fatePoints.max', v)} />
          <Field label="Atual" type="number" value={data.fatePoints.current} onChange={(v) => update('fatePoints.current', v)} />
        </div>
      </section>

      <section className="card">
        <div className="card__title">Vantagens / Desvantagens / Habilidades especiais (gerais)</div>
        <div className="grid3">
          <TextArea label="Vantagens" value={data.advantages} onChange={(v) => update('advantages', v)} rows={8} />
          <TextArea label="Desvantagens" value={data.disadvantages} onChange={(v) => update('disadvantages', v)} rows={8} />
          <TextArea label="Habilidades especiais (gerais)" value={data.generalSpecialAbilities} onChange={(v) => update('generalSpecialAbilities', v)} rows={8} />
        </div>
      </section>
    </div>
  )
}
