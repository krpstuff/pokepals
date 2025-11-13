// imports
import { natures, diceStat, neededMoveInfo } from "../data/conversions.js";
import { adjustStats } from "./dice.js";

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
    let statElem = document.createElement("li");
    statElem.innerHTML = `<b>${stat}</b>: ${info.pkmnStats.diceStats[stat]}`;
    statElem.setAttribute(stat, info.pkmnStats.origStats[stat]);
    statList.appendChild(statElem);
  }

  return statList;
};

// display evo stats
const displayEvoStats = async (info) => {
  const evoList = document.createElement("ul");
  let evoReqs = info.pkmnEvo.info;

  for (let req in evoReqs) {
    let reqElem = document.createElement("li");
    if (typeof evoReqs[req] == "object") {
      reqElem.innerHTML = `<b>${req}</b>: ${evoReqs[req].name}`;
      evoList.appendChild(reqElem);
    } else if (req != "min_level") {
      let reqElem = document.createElement("li");
      reqElem.innerHTML = `<b>${req}</b>: ${evoReqs[req]}`;
      evoList.appendChild(reqElem);
    }
  }
  return evoList;
};

// display move stats
const displayMoveStats = async (info) => {
  const moveList = document.createElement("ul");
  for (let move in neededMoveInfo) {
    let moveElem = document.createElement("li");
    moveElem.innerHTML = `<strong>${neededMoveInfo[move]}</strong>: ${info.moveData[move]}`;
    moveList.appendChild(moveElem);
  }
  return moveList;
};

export {
  getDiceStats,
  natureDropdown,
  displayDiceStats,
  displayEvoStats,
  displayMoveStats,
};
