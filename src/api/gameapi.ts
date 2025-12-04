import { Info, Attributes, Skills, CharacterSheet } from "../character/characterSheet";
import { CharacterCreator } from "../character/characterCreator";
import { validateCharacter } from "../character/validation";
import { SaveLoad, APIResult } from "../data/saveLoad";
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
    ): APIResult<CharacterSheet> {

        const validation = validateCharacter(info, attributes, skills);

        if (!validation.valid) {
            return { success: false, errors: validation.errors };
        }

        const created = CharacterCreator.create(info, attributes, skills);

        if (!created.success) {
            return { success: false, errors: created.errors };
        }

        return { success: true, data: created.character };
    }


    // ================================
    // 2. RECALCULATE CHARACTER
    // ================================
    static recalculateCharacter(character: CharacterSheet): APIResult<CharacterSheet> {
        return CharacterCreator.recalculate(character);
    }


    // ================================
    // 3. SAVE CHARACTER
    // ================================
    static saveCharacter(character: CharacterSheet): APIResult<null> {

        const saveDir = path.join(process.cwd(), "saves");

        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir);
        }

        const filename = path.join(saveDir, `${character.info.name}.json`);

        return SaveLoad.save(character, filename);
    }


    // ================================
    // 4. LOAD CHARACTER
    // ================================
    static loadCharacter(name: string): APIResult<CharacterSheet> {

        const filepath = path.join(process.cwd(), "saves", `${name}.json`);

        const loaded = SaveLoad.load(filepath);

        if (!loaded.success) {
            return { success: false, errors: loaded.errors };
        }

        return { success: true, data: loaded.data! };
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
            .filter(f => f.endsWith(".json"))
            .map(f => f.replace(".json", ""));
    }
}