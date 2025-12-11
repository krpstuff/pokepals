// imports
import {
  dice,
  diceStat,
  statThresholds,
  natures,
} from "../data/conversions.js";

// get original stats
const parseStats = async (pkmnData, nature = false) => {
  const origStats = {};
  for (const stat in diceStat) {
    origStats[stat] = dice.indexOf(pkmnData[stat].toUpperCase());
  }

  let diceStats = await convertStats(origStats);

  return { origStats, diceStats };
};

// adjust with nature
const adjustStats = async (stats, nature) => {
  let adjustedStats = { ...stats };

  if (nature !== "default") {
    // stats to adjust
    const add = natures[nature][0];
    const subtract = natures[nature][1]; 

    // adjust
    if (adjustedStats[add] < 5) adjustedStats[add] += 1;
    if (adjustedStats[subtract] > 0) adjustedStats[subtract] -= 1;
  }

  return convertStats(adjustedStats);
};

// convert to dice
const convertStats = async (stats) => {
  const convertedStats = {};
  for (const statName in stats) {
    convertedStats[statName] = dice[stats[statName]];
  }
  return convertedStats;
};

export { parseStats, adjustStats };
