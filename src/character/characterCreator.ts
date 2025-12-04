import { Attributes, Info, Skills, CharacterSheet } from "./characterSheet"
import { computeCharacterStats, computeCharacterData } from "./characterStats"
import { validateInfo, validateAttributes, validateSkills } from "./validation"

export class CharacterCreator {

    /** Creates a new CharacterSheet from raw inputs */
    static create(info: Info, attributes: Attributes, skills: Skills): CharacterSheet {
        // 🔎 Validate raw inputs BEFORE creation
        validateInfo(info)
        validateAttributes(attributes)
        validateSkills(skills)

        return {
            info,
            attributes,
            skills, // ⚠ Player-defined skills remain EXACTLY as provided
            stats: computeCharacterStats(attributes, info),
            data: computeCharacterData(attributes)
        }
    }

    /**
     * Recalculates stats & data if attributes or level change,
     * while preserving player-chosen skills and current HP/conditions.
     */
    static recalculate(character: CharacterSheet): CharacterSheet {
        // 🔎 Validate only attributes + info; skills not recalculated
        validateInfo(character.info)
        validateAttributes(character.attributes)

        const updatedStats = computeCharacterStats(character.attributes, character.info)
        const updatedData = computeCharacterData(character.attributes)

        return {
            ...character,
            stats: {
                ...updatedStats,
                hp: Math.min(character.stats.hp, updatedStats.maxhp),  // preserve HP if max shrinks
                psi: Math.min(character.stats.psi, updatedStats.maxpsi) // preserve PSI if max shrinks
            },
            data: updatedData
        }
    }
}