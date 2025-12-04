import { Attributes, Info, Skills, CharacterSheet } from "./characterSheet";
import { computeCharacterStats, computeCharacterData } from "./characterStats";
import { validateCharacter } from "./validation";
import { APIResult } from "../data/saveLoad";

export class CharacterCreator {

    /**
     * Creates a new CharacterSheet from raw inputs.
     */
    static createCharacter(
        info: Info,
        attributes: Attributes,
        skills: Skills
    ): APIResult<CharacterSheet> {

        const validation = validateCharacter(info, attributes, skills);

        if (!validation.valid) {
            return { success: false, errors: validation.errors };
        }

        const created = CharacterCreator.create(info, attributes, skills);

        if (!created.success) {
            return { success: false, errors: created.errors };
        }

        return { success: true, data: created.data };
    }

    /**
     * 🔧 Missing method — this actually creates the CharacterSheet
     */
    static create(
        info: Info,
        attributes: Attributes,
        skills: Skills
    ): APIResult<CharacterSheet> {

        try {
            const stats = computeCharacterStats(attributes, info);
            const data = computeCharacterData(attributes);

            const character: CharacterSheet = {
                info,
                attributes,
                skills,
                stats,
                data
            };

            return { success: true, data: character };

        } catch (err) {
            return {
                success: false,
                errors: ["Failed to create character: " + (err as Error).message]
            };
        }
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