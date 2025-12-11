// imports
import moves from "../data/moves.json" with { type: 'json' };

const findMove = async (moveName) => {
  if(moves[moveName]) {
    return moves[moveName]
  } else {
    return {
       "move": "error: move not found",
       "type": "x",
       "category": "x",
       "range": "x",
       "wounds": "x",
       "firstBullet": "x",
       "extDescEffect": "x",
       "pp": "x",
       "targetType": "x",
       "descEffects": "x"
    }
  }
};

export { findMove }