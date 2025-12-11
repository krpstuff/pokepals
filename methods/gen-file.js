// imports
import { template } from "../data/pkmn-template.js";
import { templateConversions } from "../data/conversions.js";
import { findMove } from "./moves.js";

const createMdFile = async (pokemon) => {
    let newTemplate = template;
    console.log(pokemon);

    for (let placeholder in templateConversions) {
        // moves
        if (placeholder == "MOVES") {
            newTemplate = await updateMoveTemplate(pokemon, newTemplate, templateConversions[placeholder]);
        }
        // pokemon
        newTemplate = newTemplate.replace(placeholder, pokemon[templateConversions[placeholder]]);
    }

    return newTemplate;
}

const updateMoveTemplate = async (pokemon, newTemplate, moveConversions) => {
    for (let i = 1; i <= 4; i++) {
        let moveInfo = await findMove(pokemon[`move${i}`]);
        
        // shorthand single / multi-target 
        if (moveInfo.targetType == "Single Target") {
            moveInfo.targetType = "ST";
        } else if (moveInfo.targetType == "Multi-Target") {
            moveInfo.targetType = "MT";
        }

        // update desc effect 
        moveInfo["extDescEffect"] = `${moveInfo.targetType}, ${moveInfo.descEffects}`;

        // create first bullet 
        if (pokemon.types.includes(moveInfo.type)) {
            moveInfo["firstBullet"] = `STAB`;
        } else {
            moveInfo["firstBullet"] = moveInfo.type;
        }
        moveInfo.firstBullet += `, ${moveInfo.pp} PP`;

        for (let placeholder in moveConversions) {
            newTemplate = newTemplate.replace(`${placeholder}${i}`, moveInfo[moveConversions[placeholder]]);
        }
    }

    return newTemplate;
}


export { createMdFile }