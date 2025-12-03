// imports
import { fetchPkmnStatic } from "./methods/fetch.js";
import { parseStats } from "./methods/dice.js";
import { findMove } from "./methods/moves.js";
import {
  natureDropdown,
  displayDiceStats,
  displayPokemonStats,
  displayMoveStats,
} from "./methods/display.js";

// pokemon search form
const pkmnSearch = document.getElementById("pokemon-search");
const pkmnSearchInput = document.getElementById("pokemon-name");

pkmnSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  // get input
  const formData = new FormData(pkmnSearch);
  const pkmn = formData.get("name").toLowerCase();
  pkmnSearchInput.value = "";

  try {
    const pkmnStaticData = await fetchPkmnStatic(pkmn);

    // get img
    let pkmnImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnStaticData.pokedexNumber}.png`;

    // get dice stats
    let pkmnStats = await parseStats(pkmnStaticData);

    return displayInfo({
      pkmnImg,
      pkmnStats,
      pkmnStaticData,
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
  const moveName = formData.get("name").toLowerCase();

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

    // pokemon stats
    const pkmnLabel = document.createElement("label");
    pkmnLabel.innerHTML = "pokemon info"
    const pkmnInfo = await displayPokemonStats(info);
 

    // pokemondb links
    const typesLink = document.createElement("a");
    typesLink.innerHTML = "see type effectiveness";
    typesLink.setAttribute("href", `https://pokemondb.net/pokedex/${info.input}#dex-stats`);
    typesLink.setAttribute("id", `types-link`);
    const movesLink = document.createElement("a");
    movesLink.innerHTML = "see moveset";
    movesLink.setAttribute("href", `https://pokemondb.net/pokedex/${info.input}#dex-moves`);
    movesLink.setAttribute("id", `moves-link`);

    const linksContainer = document.createElement("div");
    linksContainer.setAttribute("id", "pkmndb-links");
    linksContainer.append(typesLink, movesLink);
    
    infoBox.append(pkmnLabel, pkmnInfo.statList, linksContainer);

    // dice stats
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
  } else {
    // move
    const moveData = await displayMoveStats(info);
    infoBox.appendChild(moveData.moveList);
  }
};
