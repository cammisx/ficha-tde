export const DEFAULT_CHARACTER = {
  meta: {
    name: '',
    family: '',
    birthplace: '',
    birthdate: '',
    age: '',
    gender: '',
    race: '',
    height: '',
    weight: '',
    hair: '',
    eyes: '',
    culture: '',
    profession: '',
    title: '',
    socialStatus: '',
    features: '',
    otherInfo: '',
  },
  progression: {
    experienceLevel: '',
    apTotal: 0,
    apGained: 0,
    apSpent: 0,
  },
  attributes: {
    COU: 0, SGC: 0, INT: 0, CHA: 0, DEX: 0, AGI: 0, CON: 0, STR: 0,
  },
  derived: {
    lp: { value: 0, bonusPenalty: 0, bought: 0, max: 0 },
    ae: { value: 0, bonusPenalty: 0, bought: 0, max: 0 },
    kp: { value: 0, bonusPenalty: 0, bought: 0, max: 0 },
    sp: { value: 0, bonusPenalty: 0, bought: 0, max: 0 }, // Espírito
    ten: { value: 0, bonusPenalty: 0, bought: 0, max: 0 }, // Tenacidade
    dodge: { value: 0, bonusPenalty: 0, bought: 0, max: 0 },
    ini: { value: 0, bonusPenalty: 0, bought: 0, max: 0 },
    mov: { value: 0, bonusPenalty: 0, bought: 0, max: 0 },
  },
  fatePoints: { initial: 0, bonus: 0, max: 0, current: 0 },

  advantages: '',
  disadvantages: '',
  generalSpecialAbilities: '',

  skills: {
    physical: [],
    social: [],
    nature: [],
    knowledge: [],
    craft: [],
    languages: '',
    scripts: '',
    attributeMods: { COU: 0, SGC: 0, INT: 0, CHA: 0, DEX: 0, AGI: 0, CON: 0, STR: 0 },
  },

  combat: {
    combatTechniques: [],
    wounds: { max: 0, current: 0, lostPercent: '', at5OrLess: false, at0OrLess: false },
    meleeWeapons: [],
    rangedWeapons: [],
    armor: { protection: 0, encumbrance: 0, penalties: '', ap: 0, weight: 0, notes: '' },
    parryItems: [],
    combatSpecialAbilities: '',
    conditions: {
      rupture: 0, confusion: 0, pain: 0, stupor: 0, fear: 0, paralysis: 0, overburden: 0,
    },
  },

  gear: {
    items: [],
    totalWeight: 0,
    money: {
      ducats: 0,
      silver: 0,
      halers: 0,
      kreuzers: 0,
      gems: '',
      jewelryAndOther: '',
    },
    carryCapacity: 0,
  },

  animal: {
    name: '',
    type: '',
    sizeCategory: '',
    attributes: { COU: 0, SGC: 0, INT: 0, CHA: 0, DEX: 0, AGI: 0, CON: 0, STR: 0, SGCa: 0 },
    derived: { lp: 0, ae: 0, sp: 0, ten: 0, pro: 0, ini: 0, mov: 0 },
    attack: { at: 0, ap: 0, dn: '', reach: '' },
    actions: '',
    specialAbilities: '',
  },

  magic: {
    aeMax: 0,
    aeCurrent: 0,
    primaryAttribute: '',
    property: '',
    tradition: '',
    attributeMods: { COU: 0, SGC: 0, INT: 0, CHA: 0, DEX: 0, AGI: 0, CON: 0, STR: 0 },
    specialAbilities: '',
    cantrips: '',
    spells: [],
  },

  liturgy: {
    kpMax: 0,
    kpCurrent: 0,
    primaryAttribute: '',
    aspect: '',
    tradition: '',
    attributeMods: { COU: 0, SGC: 0, INT: 0, CHA: 0, DEX: 0, AGI: 0, CON: 0, STR: 0 },
    specialAbilities: '',
    blessings: '',
    chants: [],
  },
}
