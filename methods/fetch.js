// vars
import pokemon from "../data/pokemon.json" with { type: 'json' };

// fetch pokemon from sheets data 
export const fetchPkmnStatic = async (pkmn) => {
  try {
    const pkmnData = pokemon[pkmn];
    return pkmnData;
  } catch (err) {
    return err;
  }
}