import { CharacterSheet } from "../character/characterSheet";
import { CharacterCreator } from "../character/characterCreator";
import * as fs from "fs";

export class SaveLoad {

    /** Saves a character to a JSON file */
    static save(character: CharacterSheet, filename: string): void {
        try {
            const data = JSON.stringify(character, null, 4);
            fs.writeFileSync(filename, data, "utf-8");
            console.log(`✔ Character saved to ${filename}`);
        } catch (error) {
            console.error(`❌ Failed to save character:`, error);
        }
    }

    /**
     * Loads a character, validates it, and recalculates stats.
     * Returns a structured result.
     */
    static load(filename: string):
        | { success: true, character: CharacterSheet }
        | { success: false, error: string } {

        try {
            const raw = fs.readFileSync(filename, "utf-8");
            const parsed = JSON.parse(raw);

            const rebuilt = CharacterCreator.recalculate(parsed);

            if (!rebuilt.success) {
                return { success: false, error: rebuilt.errors.join(", ") };
            }

            console.log(`✔ Loaded character from ${filename}`);
            return { success: true, character: rebuilt.character };

        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}