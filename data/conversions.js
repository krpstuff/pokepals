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

const evoMult = [[15], [10, 20], [5, 15, 25]];

const evoThresholds = {
  1: {
    maxLevel: 10,
    expNeeded: 0,
  },
  2: {
    maxLevel: 20,
    expNeeded: 1000,
  },
  3: {
    maxLevel: 30,
    expNeeded: 3000,
  },
  4: {
    maxLevel: 40,
    expNeeded: 6000,
  },
  5: {
    maxLevel: 50,
    expNeeded: 10000,
  },
  6: {
    maxLevel: 60,
    expNeeded: 15000,
  },
  7: {
    maxLevel: 70,
    expNeeded: 21000,
  },
  8: {
    maxLevel: 80,
    expNeeded: 28000,
  },
  9: {
    maxLevel: 90,
    expNeeded: 36000,
  },
  10: {
    maxLevel: 100,
    expNeeded: 45000,
  },
};

const neededMoveInfo = {
  descEffects: "description",
  type: "type",
  category: "category",
  wounds: "wounds",
  pp: "pp",
  priority: "priority",
  range: "range",
};

export {
  dice,
  diceStat,
  statThresholds,
  natures,
  evoMult,
  evoThresholds,
  neededMoveInfo,
};
