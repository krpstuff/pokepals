// imports
import { natures, diceStat, neededMoveInfo, neededPkmnInfo, dice } from "../data/conversions.js";
import { adjustStats, parseStats } from "./dice.js";
import { fetchAbilities } from "./fetch.js";
import { createMdFile } from "./gen-file.js";

// display info 
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
    let linkName = info.umbrellaName ? info.umbrellaName : info.input;

    const typesLink = document.createElement("a");
    typesLink.innerHTML = "see type effectiveness";
    typesLink.setAttribute("href", `https://pokemondb.net/pokedex/${linkName}#dex-stats`);
    typesLink.setAttribute("id", `types-link`);
    const movesLink = document.createElement("a");
    movesLink.innerHTML = "see moveset";
    movesLink.setAttribute("href", `https://pokemondb.net/pokedex/${linkName}#dex-moves`);
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

    // gen file form
    const fileForm = await displayGenFile(info);

    infoBox.append(statLabel, statList, natureDiv, fileForm);
  } else if (info.inputType == "move") {
    // move
    const moveData = await displayMoveStats(info);
    infoBox.appendChild(moveData.moveList);
  } else {
    // variations 
    const testingP = document.createElement("p");
    testingP.innerHTML = `there are multiple variations of <strong>${info.pkmn}</strong>, choose:`
    infoBox.appendChild(testingP);

    const variationBtns = await displayVariations(info.pkmnStaticData, info.pkmn);
    infoBox.appendChild(variationBtns);
  }
};

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

// display pokemon stats
const displayPokemonStats = async (info) => {
  const statList = document.createElement("ul");
  
  // abilities
  let abilitiesList = document.createElement("ul");

  for (let ability in info.pkmnStaticData["abilities"]) {
    let abilityElem = document.createElement("li");
    abilityElem.innerHTML = `<strong>${ability}</strong>: ${info.pkmnStaticData["abilities"][ability]}`;
    abilitiesList.appendChild(abilityElem);
  }

  // pokemon stats
  for (let stat in neededPkmnInfo) {
    let statElem = document.createElement("li");
    if (stat == "abilities") {
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

// display variation buttons 
const displayVariations = async (variations, umbrellaName) => {
  const variationsContainer = document.createElement("div");
  variationsContainer.setAttribute("id", "variations-container");

  for (let i in variations) {
    const variationBtn = document.createElement("div");
    variationBtn.setAttribute("class", "variation");
    variationBtn.setAttribute("id", variations[i].pokemonName.toLowerCase());

    variationBtn.innerHTML = variations[i].pokemonName;

    variationBtn.addEventListener("click", async (e) => {
      let variationInfo = variations[i];
      let variationName = variations[i].pokemonName.toLowerCase()

      // get img
      let pkdxNum = Number.isInteger(variations[i].pokedexNumber) 
        ? variations[i].pokedexNumber
        : variations[i].pokedexNumber.split("-")[0]

      let pkmnImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkdxNum}.png`;

      // get dice stats
      let pkmnStats = await parseStats(variations[i]);

      return displayInfo({
        pkmnImg,
        pkmnStats,
        pkmnStaticData: variationInfo,
        input: variationName,
        inputType: "pokemon",
        umbrellaName
      });
    })

    variationsContainer.appendChild(variationBtn);
  }

  return variationsContainer;
}

// display form to generate md file
const displayGenFile = async (info) => {
  // create form 
  const genFileForm = document.createElement("form");
  const genFileLabel = document.createElement("h2");

  genFileForm.setAttribute("id", "gen-md");
  genFileLabel.innerHTML = "create markdown file"
  
  // create ability radio inputs
  let abilityLabel = document.createElement("label");
  abilityLabel.innerHTML = "Select Ability";
  genFileForm.append(genFileLabel, abilityLabel);
  
  for (let ability in info.pkmnStaticData.abilities) {
    let radioInput = document.createElement("input");

    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute("name", "chosenAbility");
    radioInput.setAttribute("value", ability);

    genFileForm.append(radioInput, ability);
  }

  // create move inputs 
  let moveInputContainer = document.createElement("div");
  moveInputContainer.setAttribute("id", "move-inputs");

  let sampleMoves = ["growl", "thunder shock", "sunny day", "bite"]

  for (let i = 1; i <= 4; i++) {
    let move = document.createElement("div");

    let moveInputLabel = document.createElement("label");
    let moveInput = document.createElement("input");

    move.setAttribute("class", "input-container");
    moveInputLabel.setAttribute("for", `move${i}`);
    moveInput.setAttribute("type", "text");
    moveInput.setAttribute("name", `move${i}`);
    moveInput.setAttribute("placeholder", `ex: ${sampleMoves[i-1]}`);

    moveInputLabel.innerHTML = `Move ${i} Name`;

    move.append(moveInputLabel, moveInput);
    moveInputContainer.appendChild(move)
  }

  genFileForm.append(moveInputContainer);

  // create type effectiveness inputs 
  let effectiveness = ["Weaknesses", "Resistances", "Immunities"];
  let sampleEffs = ["Fire, ground", "Ice, fairy", "Ghost, rock, dark"]
  let effInputContainer = document.createElement("div");
  effInputContainer.setAttribute("id", "eff-inputs");

  for (let i in effectiveness) {
    let eff = document.createElement("div");
    let effLabel = document.createElement("label");
    let effInput = document.createElement("input");

    eff.setAttribute("class", "input-container");
    effLabel.setAttribute("for", effectiveness[i]);
    effInput.setAttribute("type", "text");
    effInput.setAttribute("name", effectiveness[i]);
    effInput.setAttribute("placeholder", `ex: ${sampleEffs[i]}`);

    effLabel.innerHTML = effectiveness[i];

    eff.append(effLabel, effInput);
    effInputContainer.appendChild(eff);
  }
  
  // create submit button 
  const submitGenFile = document.createElement("input");
  submitGenFile.setAttribute("type", "submit");
  submitGenFile.setAttribute("value", `Create MD File for ${info.pkmnStaticData.pokemonName}`);
  genFileForm.append(moveInputContainer, effInputContainer, submitGenFile);

  // add event listener to form submit 
  genFileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // delete old code block/copy button if any 
    let oldCode = document.getElementById("code-block");
    let oldBtn = document.getElementById("copy-btn");
    let oldBtnCopied = document.getElementById("copied");
    if(oldCode) {
      oldCode.remove();
      oldBtn?.remove();
      oldBtnCopied?.remove();
    }

    // get form info 
    let formData = new FormData(e.target);

    for (let pair of formData.entries()) {
      info.pkmnStaticData[pair[0]] = pair[1];
    }

    // get ability desc
    info.pkmnStaticData["chosenAbilityDesc"] = info.pkmnStaticData.abilities[info.pkmnStaticData["chosenAbility"]];
    
    // get current nature 
    let natureDd = document.getElementById("pokemon-nature").value;
    natureDd = natureDd.charAt(0).toUpperCase() + natureDd.slice(1);
    info.pkmnStaticData["chosenNature"] = natureDd;

    // get current dice 
    for (let stat in diceStat) {
      let statLi = document.querySelector(`[${stat}]`);
      let statDice = statLi.innerHTML.split(": ")[1];
      info.pkmnStaticData[`${stat}-dice`] = statDice;
    }

    // set img 
    info.pkmnStaticData["pkmnImg"] = info.pkmnImg;

    // generate file 
    const fileContents = await createMdFile(info.pkmnStaticData);
    const fileCode = document.createElement("pre");
    fileCode.setAttribute("id", "code-block");
    fileCode.innerHTML = `${fileContents}`;

    // copy button 
    let copyBtn = document.createElement("div");
    copyBtn.setAttribute("id", "copy-btn");
    copyBtn.innerHTML = "Copy MD File";
    copyBtn.addEventListener("click", (e) => {
      navigator.clipboard.writeText(fileContents);
      e.target.innerHTML = "Copied!";
      e.target.setAttribute("id", "copied")
    })

    genFileForm.append(fileCode, copyBtn);
  });

  return genFileForm;
}

export {
  displayInfo,
  getDiceStats,
  natureDropdown,
  displayDiceStats,
  displayPokemonStats,
  displayMoveStats,
  displayVariations
};
