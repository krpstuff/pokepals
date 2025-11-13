// imports
import moves from "../data/moves.json" with { type: 'json' };

const findMove = async (moveName) => {
  if(moves[moveName]) {
    return moves[moveName]
  } else {
    return error;
  }
};

export { findMove }