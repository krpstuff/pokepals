// imports
import { fetchPkmn } from "./methods/fetch.js";
import { parseStats } from "./methods/dice.js";
import { getEvo } from "./methods/evolution.js";
import { findMove } from "./methods/moves.js";
import {
  natureDropdown,
  displayDiceStats,
  displayEvoStats,
  displayMoveStats,
} from "./methods/display.js";

// pokemon search form
const pkmnSearch = document.getElementById("pokemon-search");
const pkmnSearchInput = document.getElementById("pokemon-name");

pkmnSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  // get input
  const formData = new FormData(pkmnSearch);
  const pkmn = formData.get("name");
  pkmnSearchInput.value = "";

  try {
    const pkmnData = await fetchPkmn(pkmn.toLowerCase());
    const speciesData = await fetchPkmn(pkmn.toLowerCase(), true);

    // get img
    let pkmnImg = pkmnData?.sprites.front_default;

    // get dice stats
    let pkmnStats = await parseStats(pkmnData);

    // get evo info
    let pkmnEvo = await getEvo(speciesData?.evolution_chain.url, pkmn);

    return displayInfo({
      pkmnImg,
      pkmnStats,
      pkmnEvo,
      input: pkmn,
      inputType: "pokemon",
    });
  } catch (error) {
    return displayInfo({ input: pkmn }, true);
  }
});

// move search form
const moveSearch = document.getElementById("move-search");
const moveSearchInput = document.getElementById("move-name");

moveSearch.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get move
  const formData = new FormData(moveSearch);
  const moveName = formData.get("name");

  moveSearchInput.value = "";

  try {
    const moveData = await findMove(moveName.toLowerCase());
    return displayInfo({
      moveData,
      input: moveName,
      inputType: "move",
    });
  } catch (error) {
    return displayInfo({ input: moveName }, true);
  }
});

// handle display
const displayInfo = async (info, error = false) => {
  const resultContainer = document.getElementById("results");
  const infoBox = document.getElementById("info-box");
  const infoLabel = document.getElementById("info-label");

  resultContainer.style.display = "block";
  infoBox.innerHTML = "";

  // error
  if (error) {
    infoLabel.innerHTML = "loading info . . .";
    infoBox.innerHTML = `Could not find information on <strong>${info.input}</strong>, please check for typos!`;
    return;
  }

  // label
  infoLabel.innerHTML = `loading info on ${info.input}. . .`;

  // pokemon
  if (info.inputType === "pokemon") {
    const screenImg = document.getElementById("screen-img");
    screenImg.setAttribute("src", info.pkmnImg);

    // dice
    const statLabel = document.createElement("label");
    statLabel.innerHTML = "dice stats";
    const statList = await displayDiceStats(info);

    const natureDiv = document.createElement("div");
    natureDiv.setAttribute("id", "nature-select");

    const natureLabel = document.createElement("p");
    natureLabel.innerHTML = "<strong>adjust by nature</strong>";

    const natureAdjustments = document.createElement("p");
    natureAdjustments.setAttribute("id", "nature-adjustments");

    const natureSelect = await natureDropdown();

    natureDiv.append(natureLabel, natureSelect, natureAdjustments);
    infoBox.append(statLabel, statList, natureDiv);

    // evo
    const evoLabel = document.createElement("label");
    const evolution = document.createElement("p");
    let evoList;

    if (info.pkmnEvo) {
      evoLabel.innerHTML = "evolution info";
      evolution.innerHTML = `<strong>${info.input}</strong> evolves into <strong>${info.pkmnEvo.name}</strong> and requires...`;

      evoList = await displayEvoStats(info);
    } else {
      evolution.innerHTML = `<strong>${info.input}</strong> is already at max evolution`;
    }

    infoBox.append(evoLabel, evolution, evoList);
  } else {
    // move
    const moveList = await displayMoveStats(info);
    infoBox.appendChild(moveList);
  }
};
