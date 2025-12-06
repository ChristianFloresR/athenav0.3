import { CharacterCreator } from "../character/characterCreator";
import { SaveLoad } from "../data/saveLoad";
import { Info, Attributes, Skills } from "../character/characterSheet";

// ----------------------------
// Raw sample data for testing
// ----------------------------

const info: Info = {
    id: "test001",
    name: "Anippé",
    species: "Mongoose/Cat",
    age: 23,
    height: 1.68,
    level: 3
};

const attributes: Attributes = {
    agility: 5,
    wisdom: 2,
    strength: 3,
    mental: 4,
    vitality: 6
};

const skills: Skills = {
    athletics: 2,
    charisma: 3,
    culture: 1,
    investigation: 0,
    geography: 0,
    manipulation: 0,
    medicine: 1,
    presence: 4,
    perception: 0,
    sintonization: 0,
    stealth: 2,
    survival: 0
};

// ----------------------------
// Create character
// ----------------------------
let character;

try {
    character = CharacterCreator.create(info, attributes, skills);
    console.log("✔ Character created successfully:");
    console.log(character);
} catch (err: any) {
    console.error("❌ Character creation failed:", err.message);
    process.exit(1);
}

// ----------------------------
// Save to file
// ----------------------------
SaveLoad.save(character, "anippe.json");

// ----------------------------
// Load and validate
// ----------------------------
const loaded = SaveLoad.load("anippe.json");

if ("errors" in loaded) {
    console.error("❌ Failed to load saved character:", loaded.errors);
    process.exit(1);
}

console.log("✔ Loaded character:");
console.log(loaded.data);