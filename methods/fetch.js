// vars
const apiUrl = "https://pokeapi.co/api/v2/pokemon";

// fetch pokemon
export const fetchPkmn = async (pkmn, species = false) => {
  let url = species ? `${apiUrl}-species/${pkmn}` : `${apiUrl}/${pkmn}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
