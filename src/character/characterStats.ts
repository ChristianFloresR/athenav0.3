// characterCalculations.ts
import { Attributes, Info, Stats, Data, CharacterSheet } from "./characterSheet"

export function computeCharacterData(attributes: Attributes): Data {
    const { agility, wisdom, strength, mental, vitality } = attributes

    return {
        def_physical: 10 + Math.floor(agility / 2),
        def_mental: 10 + Math.floor(mental / 2),
        base_dmgred: Math.ceil(vitality / 2),
        reflexes: Math.floor(agility * 1.5),
        willpower: Math.floor(mental * 1.5),
        constitution: Math.floor(vitality * 1.5),
        mobility: computeMobility(agility),
        carrycap: 8 + vitality,
        inspiration: 0 // Not defined yet — placeholder
    }
}

export function computeCharacterStats(attributes: Attributes, info: Info): Stats {
    const { mental, vitality } = attributes
    const { level } = info

    const maxhp = 5 + (level * 5) + (vitality * 2)
    const maxpsi = mental * 3

    return {
        maxcondition: 3, // Left static for now (condition handled later)
        condition: 3,
        maxhp,
        hp: maxhp,
        maxpsi,
        psi: maxpsi,
        maxstamina: 0, // removed for now, placeholder for future version
        stamina: 0
    }
}

// ---- Helpers ----

function computeMobility(agility: number): number {
    let oddCount = 0
    for (let i = 1; i <= agility; i += 2) oddCount++
    return 7.5 + (oddCount * 1.5)
}

// ---- Builder function to assemble full CharacterSheet ----

export function createCharacter(info: Info, attributes: Attributes, skills: any): CharacterSheet {
    return {
        info,
        attributes,
        skills,          // ⚠️ skills remain untouched, as provided
        stats: computeCharacterStats(attributes, info),
        data: computeCharacterData(attributes)
    }
}