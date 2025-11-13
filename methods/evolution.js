import { evoThresholds } from "../data/conversions.js";

const getEvo = async (evoUrl, pkmn) => {
  try {
    const result = await fetch(evoUrl);
    if (!result.ok) {
      throw new Error(`Response status: ${result.status}`);
    }

    const evoData = await result.json();
    return await parseEvo(evoData.chain, pkmn);
  } catch (error) {
    return false;
  }
};

const parseEvo = async (evoData, pkmn) => {
  do {
    if (evoData.species.name == pkmn) {
      let evoInfo = evoData["evolves_to"][0]["evolution_details"][0];
      let evoPkmn = evoData["evolves_to"][0]["species"]["name"] ?? false;

      evoInfo = await parseInfo(evoInfo);
      return { info: evoInfo, name: evoPkmn };
    }
    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

  return false;
};

const parseInfo = async (evoInfo) => {
  let parsedInfo = {};

  for (let method in evoInfo) {
    if (evoInfo[method]) {
      parsedInfo[method] = evoInfo[method];
    }
  }

  if (parsedInfo.trigger.name == "level-up") {
    let convertedRank = await convertRank(parsedInfo.min_level);
    parsedInfo["rank"] = convertedRank.rank;
    parsedInfo["expNeeded"] = convertedRank.expNeeded;
  }
  return parsedInfo;
};

const convertRank = async (evoLevel) => {
  for (let rank in evoThresholds) {
    if (evoLevel <= evoThresholds[rank].maxLevel) {
      let expNeeded = evoThresholds[rank].expNeeded;
      return { rank, expNeeded };
    }
  }
};

export { getEvo };
