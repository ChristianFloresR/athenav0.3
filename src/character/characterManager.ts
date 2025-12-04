import { CharacterSheet } from "./characterSheet"

export class CharacterManager {
    private characters: CharacterSheet[] = []

    /** Add a new character */
    addCharacter(character: CharacterSheet): void {
        this.characters.push(character)
    }

    /** Get a character by ID */
    getCharacter(id: string): CharacterSheet | undefined {
        return this.characters.find(c => c.info.id === id)
    }

    /** Remove a character */
    removeCharacter(id: string): boolean {
        const index = this.characters.findIndex(c => c.info.id === id)
        if (index !== -1) {
            this.characters.splice(index, 1)
            return true
        }
        return false
    }

    /** Get all characters */
    getAllCharacters(): CharacterSheet[] {
        return this.characters
    }
}