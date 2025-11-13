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
  for (const stat in pkmnData.stats) {
    let statName = pkmnData.stats[stat].stat.name;
    let statVal = pkmnData.stats[stat].base_stat;

    for (const thresh in statThresholds) {
      if (statVal <= Number(thresh)) {
        origStats[statName] = statThresholds[thresh];
        break;
      }
    }
  }

  let diceStats = await convertStats(origStats);

  return { origStats, diceStats };
};

// adjust with nature
const adjustStats = async (stats, nature) => {
  let adjustedStats = { ...stats };

  if (nature !== "default") {
    // stats to adjust
    const add = diceStat[natures[nature][0]];
    const subtract = diceStat[natures[nature][1]];

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
