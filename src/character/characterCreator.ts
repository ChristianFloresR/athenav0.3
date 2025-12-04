import { Attributes, Info, Skills, CharacterSheet } from "./characterSheet";
import { computeCharacterStats, computeCharacterData } from "./characterStats";
import { validateCharacter } from "./validation";
import { APIResult } from "../data/saveLoad";

export class CharacterCreator {

    /**
     * Creates a new CharacterSheet from raw inputs.
     */
    static create(
        info: Info,
        attributes: Attributes,
        skills: Skills
    ): APIResult<CharacterSheet> {

        const result = validateCharacter(info, attributes, skills);

        if (!result.valid) {
            return { success: false, errors: result.errors };
        }

        const character: CharacterSheet = {
            info,
            attributes,
            skills,
            stats: computeCharacterStats(attributes, info),
            data: computeCharacterData(attributes)
        };

        return { success: true, data: character };
    }

    /**
     * Recalculates stats & data.
     */
    static recalculate(character: CharacterSheet): APIResult<CharacterSheet> {

        const result = validateCharacter(
            character.info,
            character.attributes,
            character.skills
        );

        if (!result.valid) {
            return { success: false, errors: result.errors };
        }

        const updatedStats = computeCharacterStats(
            character.attributes,
            character.info
        );

        const updatedData = computeCharacterData(character.attributes);

        const updatedCharacter: CharacterSheet = {
            ...character,
            stats: {
                ...updatedStats,
                hp: Math.min(character.stats.hp, updatedStats.maxhp),
                psi: Math.min(character.stats.psi, updatedStats.maxpsi)
            },
            data: updatedData
        };

        return { success: true, data: updatedCharacter };
    }
}