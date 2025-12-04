import { Attributes, Info, Skills } from "./characterSheet";

// ----------------------------
// Low-level validators
// These throw errors individually
// ----------------------------
export function validateInfo(info: Info): void {
    if (!info) throw new Error("Missing character info.");

    if (typeof info.id !== "string" || info.id.trim() === "")
        throw new Error("Character ID cannot be empty.");

    if (typeof info.name !== "string" || info.name.trim() === "")
        throw new Error("Character name cannot be blank.");

    if (typeof info.species !== "string" || info.species.trim() === "")
        throw new Error("Character species cannot be blank.");

    if (typeof info.level !== "number" || info.level < 0)
        throw new Error("Character level must be a number ≥ 0.");

    if (typeof info.age !== "number" || info.age < 0)
        throw new Error("Character age must be a number ≥ 0.");

    if (typeof info.height !== "number" || info.height <= 0)
        throw new Error("Character height must be a number > 0.");
}

export function validateAttributes(attributes: Attributes): void {
    if (!attributes) throw new Error("Missing attributes.");

    for (const [key, value] of Object.entries(attributes)) {
        if (typeof value !== "number" || value < 0) {
            throw new Error(`Attribute '${key}' cannot be negative.`);
        }
    }
}

export function validateSkills(skills: Skills): void {
    if (!skills) throw new Error("Missing skills.");

    for (const [key, value] of Object.entries(skills)) {
        if (typeof value !== "number" || value < 0) {
            throw new Error(`Skill '${key}' cannot be negative.`);
        }
    }
}

// ----------------------------
// High-Level Validator
// This is what the API expects
// ----------------------------
export function validateCharacter(
    info: Info,
    attributes: Attributes,
    skills: Skills
): { valid: true, errors: [] } | { valid: false, errors: string[] } {

    const errors: string[] = [];

    try {
        validateInfo(info);
    } catch (err: any) {
        errors.push(err.message);
    }

    try {
        validateAttributes(attributes);
    } catch (err: any) {
        errors.push(err.message);
    }

    try {
        validateSkills(skills);
    } catch (err: any) {
        errors.push(err.message);
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true, errors: [] };
}