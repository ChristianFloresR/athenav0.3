import { Info, Attributes, Skills, CharacterSheet } from "../character/characterSheet";
import { CharacterCreator } from "../character/characterCreator";
import { validateCharacter } from "../character/validation";
import { SaveLoad } from "../data/saveLoad";
import * as fs from "fs";
import * as path from "path";

export class GameAPI {

    // ================================
    // 1. CHARACTER CREATION
    // ================================
    static createCharacter(
        info: Info,
        attributes: Attributes,
        skills: Skills
    ): { ok: true, character: CharacterSheet } | { ok: false, errors: string[] } {

        // Validate input first
        const validation = validateCharacter(info, attributes, skills);
        if (!validation.valid) {
            return { ok: false, errors: validation.errors };
        }

        // Create final character sheet
        const character = CharacterCreator.create(info, attributes, skills);
        return { ok: true, character };
    }


    // ================================
    // 2. RECALCULATE CHARACTER
    // ================================
    static recalculateCharacter(character: CharacterSheet): CharacterSheet {
        return CharacterCreator.recalculate(character);
    }


    // ================================
    // 3. SAVE CHARACTER
    // ================================
    static saveCharacter(character: CharacterSheet): void {

        const saveDir = path.join(process.cwd(), "saves");

        // Make sure /saves exists
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir);
        }

        const filename = path.join(saveDir, `${character.info.name}.json`);
        SaveLoad.save(character, filename);
    }


    // ================================
    // 4. LOAD CHARACTER
    // ================================
    static loadCharacter(name: string): CharacterSheet | null {
        const filepath = path.join(process.cwd(), "saves", `${name}.json`);
        return SaveLoad.load(filepath);
    }


    // ================================
    // 5. LIST CHARACTERS
    // ================================
    static listCharacters(): string[] {
        const saveDir = path.join(process.cwd(), "saves");

        if (!fs.existsSync(saveDir)) {
            return [];
        }

        return fs.readdirSync(saveDir)
            .filter(file => file.endsWith(".json"))
            .map(file => file.replace(".json", ""));
    }


    // ================================
    // 6. VALIDATION ACCESS
    // ================================
    static validate(info: Info, attributes: Attributes, skills: Skills) {
        return validateCharacter(info, attributes, skills);
    }
}