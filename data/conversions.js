const dice = ["D4", "D6", "D8", "D10", "D12", "D20"];
const diceStat = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

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
  default: [0, 0],
  playful: [0, 0],
  assertive: [1, 0],
  meticulous: [2, 0],
  analytical: [3, 0],
  vibrant: [4, 0],
  energetic: [5, 0],
  tactful: [0, 1],
  hardy: [1, 1],
  bold: [2, 1],
  modest: [3, 1],
  calm: [4, 1],
  timid: [5, 1],
  generous: [0, 2],
  lonely: [1, 2],
  docile: [2, 2],
  mild: [3, 2],
  gentle: [4, 2],
  hasty: [5, 2],
  optimistic: [0, 3],
  adamant: [1, 3],
  impish: [2, 3],
  bashful: [3, 3],
  careful: [4, 3],
  jolly: [5, 3],
  pragmatic: [0, 4],
  naughty: [1, 4],
  lax: [2, 4],
  rash: [3, 4],
  quirky: [4, 4],
  naive: [5, 4],
  resilient: [0, 5],
  brave: [1, 5],
  relaxed: [2, 5],
  quiet: [3, 5],
  sassy: [4, 5],
  serious: [5, 5],
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
  type: "type",
  evolutionRank: "evolution rank or method",
  size: "size",
  movement: "movement type",
  abilities: "abilities"
}

export {
  dice,
  diceStat,
  statThresholds,
  natures,
  neededMoveInfo,
  neededPkmnInfo
};
