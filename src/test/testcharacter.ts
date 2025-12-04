import { SaveLoad } from "../data/saveLoad";
import { CharacterCreator } from "../character/characterCreator";

// Create a test character
const myCharacter = CharacterCreator.create(
    {
        id: "test001",
        name: "Anippé",
        species: "Catgoose",
        age: 23,
        height: 1.65,
        level: 5
    },
    {
        agility: 5,
        wisdom: 2,
        strength: 3,
        mental: 4,
        vitality: 6
    },
    {
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
    }
);

// Save to a file
SaveLoad.save(myCharacter, "Anippé.json");

// Load back from the file
const loadedCharacter = SaveLoad.load("Anippé.json");
console.log("Loaded:", loadedCharacter);