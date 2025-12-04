import { CharacterSheet } from "../character/characterSheet";
import * as fs from "fs";

export type APIResult<T> =
    | { success: true; data: T }
    | { success: false; errors: string[] };

export class SaveLoad {

    static save(
        character: CharacterSheet,
        filepath: string
    ): APIResult<null> {

        try {
            fs.writeFileSync(filepath, JSON.stringify(character, null, 4));
            return { success: true, data: null };

        } catch (err) {
            return {
                success: false,
                errors: ["Failed to save file", String(err)]
            };
        }
    }

    static load(filepath: string): APIResult<CharacterSheet> {

        if (!fs.existsSync(filepath)) {
            return {
                success: false,
                errors: ["File does not exist."]
            };
        }

        try {
            const raw = fs.readFileSync(filepath, "utf8");
            const data = JSON.parse(raw);
            return { success: true, data };

        } catch (err) {
            return {
                success: false,
                errors: ["Failed to load file", String(err)]
            };
        }
    }
}