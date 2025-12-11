const dice = ["D4", "D6", "D8", "D10", "D12", "D20"];
const diceStat = {
  "hp": "hp",
  "attack": "att",
  "defense": "def",
  "special-attack": "sp. atk",
  "special-defense": "sp. def",
  "speed": "spd"
}

const statThresholds = {
  30: 0,
  60: 1,
  90: 2,
  120: 3,
  150: 4,
  5000: 5,
};

const natures = {
  // add, subtract
  default: ["hp", "hp"],
  playful: ["hp", "hp"],
  assertive: ["attack", "hp"],
  meticulous: ["defense", "hp"],
  analytical: ["special-attack", "hp"],
  vibrant: ["special-defense", "hp"],
  energetic: ["speed", "hp"],
  tactful: ["hp", "attack"],
  hardy: ["attack", "attack"],
  bold: ["defense", "attack"],
  modest: ["special-attack", "attack"],
  calm: ["special-defense", "attack"],
  timid: ["speed", "attack"],
  generous: ["hp", "defense"],
  lonely: ["attack", "defense"],
  docile: ["defense", "defense"],
  mild: ["special-attack", "defense"],
  gentle: ["special-defense", "defense"],
  hasty: ["speed", "defense"],
  optimistic: ["hp", "special-attack"],
  adamant: ["attack", "special-attack"],
  impish: ["defense", "special-attack"],
  bashful: ["special-attack", "special-attack"],
  careful: ["special-defense", "special-attack"],
  jolly: ["speed", "special-attack"],
  pragmatic: ["hp", "special-defense"],
  naughty: ["attack", "special-defense"],
  lax: ["defense", "special-defense"],
  rash: ["special-attack", "special-defense"],
  quirky: ["special-defense", "special-defense"],
  naive: ["speed", "special-defense"],
  resilient: ["hp", "speed"],
  brave: ["attack", "speed"],
  relaxed: ["defense", "speed"],
  quiet: ["special-attack", "speed"],
  sassy: ["special-defense", "speed"],
  serious: ["speed", "speed"],
};

const neededMoveInfo = {
  descEffects: "description",
  type: "type",
  category: "category",
  wounds: "wounds",
  pp: "pp",
  priority: "priority",
  range: "range",
  targetType: "target type"
};

const neededPkmnInfo = {
  pokemonName: "name",
  types: "types",
  evolutionRank: "evolution rank or method",
  size: "size",
  movement: "movement type",
  abilities: "abilities"
}

const templateConversions = {
  POKEMONNAME: "pokemonName",
  TYPEINFO: "types",
  "IMGNAME.png": "pkmnImg",
  WEAKINFO: "Weaknesses",
  RESISTINFO: "Resistances",
  IMMUNEINFO: "Immunities",
  HPDICE: "hp-dice",
  ATTDICE: "attack-dice",
  DEFDICE: "defense-dice",
  SPATDICE: "special-attack-dice",
  SPDEFDICE: "special-defense-dice",
  SPDDICE: "speed-dice",
  MOVEMENTINFO: "movement",
  SIZEINFO: "size",
  NATUREINFO: "chosenNature",
  ABILITYNAME: "chosenAbility",
  ABILITYDESC: "chosenAbilityDesc",
  MOVES: {
    MOVENAME: "move",
    MOVEELEMENT: "type",
    MOVETYPE: "category",
    RANGEINFO: "range",
    WOUNDINFO: "wounds",
    FIRSTBULLET: "firstBullet",
    MOVEDESC: "extDescEffect"
  }
}

export {
  dice,
  diceStat,
  statThresholds,
  natures,
  neededMoveInfo,
  neededPkmnInfo,
  templateConversions
};
