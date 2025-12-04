// vars
import pokemon from "../data/pokemon.json" with { type: 'json' };

// search for partial 
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
export const fetchPkmnStatic = async (pkmn) => {
  try {
    let pkmnData = pokemon[pkmn];

    if (!pkmnData) {
      const variations = await searchName(pkmn); 
      
      if(variations.length > 0) {
        pkmnData = variations;
      }
    }

    return pkmnData;
  } catch (err) {
    return err;
  }
}
