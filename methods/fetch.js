// vars
import pokemon from "../data/pokemon.json" with { type: 'json' };
import abilities from "../data/abilities.json" with { type: 'json' };

// search for partial pokemon
const searchName = async (pkmn) => {
  const variations = [];

  for (let p in pokemon) {
    if (p.includes(pkmn)) {
      variations.push(pokemon[p]);
    }
  }

  return variations;
}

// fetch pokemon from sheets data 
const fetchPkmnStatic = async (pkmn) => {
  try {
    let pkmnData = pokemon[pkmn];

    if (!pkmnData) {
      const variations = await searchName(pkmn); 
      
      if(variations.length > 0) {
        pkmnData = variations;
      }
    }

    // set abilities
    let pkmnAbilities = await fetchAbilities(pkmnData);
    pkmnData["abilities"] = pkmnAbilities;
    
    // set types 
    pkmnData["types"] = pkmnData["type1"];
    if(pkmnData["type2"]) pkmnData["types"] += `, ${pkmnData["type2"]}`;
    
    return pkmnData;
  } catch (err) {
    return err;
  }
}

// fetch abilities possible for pokemon
const fetchAbilities = async (pkmn) => {
  const abilityKeys = ["ability1", "ability2", "hiddenAbility"];
  let pkmnAbilities = {};

  for (let i in abilityKeys) {
      let key = abilityKeys[i];
      if (pkmn[key]) {
        pkmnAbilities[pkmn[key]] = "";
      }
  }

  return await fetchAbilDesc(pkmnAbilities);

}

// fetch ability descs
const fetchAbilDesc = async (pkmnAbilities) => {
  for (let abil in pkmnAbilities) {
    pkmnAbilities[abil] = abilities[abil.split(" (")[0].toLowerCase()].description;
  }

  return pkmnAbilities;
}

export { fetchPkmnStatic, fetchAbilities, fetchAbilDesc };