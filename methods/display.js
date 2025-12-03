// imports
import { natures, diceStat, neededMoveInfo, neededPkmnInfo } from "../data/conversions.js";
import { adjustStats } from "./dice.js";
import abilities from "../data/abilities.json" with { type: 'json' };

// get original dice stats
const getDiceStats = async () => {
  const origStats = {};
  const statList = document.getElementById("dice-stats");
  let indivStats = statList.children;

  for (let stat in indivStats) {
    if (indivStats[stat].attributes) {
      for (const attribute of indivStats[stat].attributes) {
        origStats[attribute.name] = Number(attribute.value);
      }
    }
  }
  return origStats;
};

// make nature dropdown
const natureDropdown = async () => {
  const dropDown = document.createElement("select");
  dropDown.setAttribute("name", "nature");
  dropDown.setAttribute("id", "pokemon-nature");

  for (let nature in natures) {
    let opt = document.createElement("option");
    opt.setAttribute("value", nature);
    opt.innerHTML = nature;
    dropDown.appendChild(opt);
  }

  dropDown.addEventListener("change", async () => {
    let origStats = await getDiceStats();
    let natureAdjust = dropDown.value;

    let add = diceStat[natures[natureAdjust][0]];
    let subtract = diceStat[natures[natureAdjust][1]];

    let natureAdjustments = document.getElementById("nature-adjustments");
    natureAdjustments.innerHTML = `<span id="add">+ ${add}</span> / <span id="subtract">- ${subtract}</span>`;

    return displayDiceStats(
      {
        pkmnStats: {
          origStats,
          diceStats: await adjustStats(origStats, natureAdjust),
        },
      },
      true
    );
  });

  return dropDown;
};

// display dice stats
const displayDiceStats = async (info, replace = false) => {
  let statList;

  if (replace) {
    statList = document.getElementById("dice-stats");
    statList.innerHTML = "";
  } else {
    statList = document.createElement("ul");
    statList.setAttribute("id", "dice-stats");
  }

  for (let stat in info.pkmnStats.diceStats) {
    console.log(stat)
    let statElem = document.createElement("li");
    statElem.innerHTML = `<b>${stat}</b>: ${info.pkmnStats.diceStats[stat]}`;
    statElem.setAttribute(stat, info.pkmnStats.origStats[stat]);
    statList.appendChild(statElem);
  }

  return statList;
};

// display pokemon stats
const displayPokemonStats = async (info) => {
  const statList = document.createElement("ul");
  
  // type(s)
  let pkmnTypes = info.pkmnStaticData["type1"];
  if(info.pkmnStaticData["type2"]) pkmnTypes += `, ${info.pkmnStaticData["type2"]}`;
  
  // abilities
  const pkmnAbilities = [info.pkmnStaticData["ability1"]]
  if(info.pkmnStaticData["ability2"]) pkmnAbilities.push(info.pkmnStaticData["ability2"])
  if(info.pkmnStaticData["hiddenAbility"]) pkmnAbilities.push(`${info.pkmnStaticData["hiddenAbility"]} (hidden)`)

  let abilitiesList = document.createElement("ul");

  for (let i in pkmnAbilities) {
    let abilityDesc = abilities[pkmnAbilities[i].split(" (")[0].toLowerCase()].description;
    let abilityElem = document.createElement("li");
    abilityElem.innerHTML = `<strong>${pkmnAbilities[i]}</strong>: ${abilityDesc}`;
    abilitiesList.appendChild(abilityElem);
  }

  // pokemon stats
  for (let stat in neededPkmnInfo) {
    let statElem = document.createElement("li");
    if (stat == "type") {
      statElem.innerHTML = `<strong>type(s):</strong> ${pkmnTypes}`;
    } else if (stat == "abilities") {
      statElem.innerHTML = `<strong>possible abilities</strong>:`;
      statElem.appendChild(abilitiesList);
    } 
    else {
      statElem.innerHTML = `<strong>${neededPkmnInfo[stat]}</strong>: ${info.pkmnStaticData[stat]}`;
    }
    statList.appendChild(statElem);
  }

  // return
  return {statList};
}

// display move stats
const displayMoveStats = async (info) => {
  const moveList = document.createElement("ul");
  
  // move stats
  for (let move in neededMoveInfo) {
    let moveElem = document.createElement("li");
    moveElem.innerHTML = `<strong>${neededMoveInfo[move]}</strong>: ${info.moveData[move]}`;
    moveList.appendChild(moveElem);
  }

  // return
  return {moveList};
};

export {
  getDiceStats,
  natureDropdown,
  displayDiceStats,
  displayPokemonStats,
  displayMoveStats,
};
