// imports
import { fetchPkmnStatic } from "./methods/fetch.js";
import { parseStats } from "./methods/dice.js";
import { findMove } from "./methods/moves.js";
import {
  displayInfo
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

    // if multiple variations 
    if(Array.isArray(pkmnStaticData)) {
      return displayInfo({
        pkmnStaticData,
        pkmn,
        inputType: "variations"
      })
    }

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