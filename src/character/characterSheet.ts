
export interface Attributes {
    agility: number
    wisdom: number
    strength: number
    mental: number
    vitality: number
    // for extra attributes [key: string]: number; 
}

export interface Stats {
    maxcondition: 3
    condition: number
    maxhp: number
    hp: number
    maxpsi: number
    psi: number
    maxstamina: number
    stamina: number
    // for extra stats [key: string]: number; 
}

export interface Skills {

    athletics: number
    charisma: number
    culture: number
    investigation: number
    geography: number
    manipulation: number
    medicine: number
    presence: number
    perception: number
    sintonization: number
    stealth: number
    survival: number
    // extra skills [key: string]: number | undefined; 
}

export interface Data {
    def_physical: number
    def_mental: number
    base_dmgred: number
    reflexes: number
    willpower: number
    constitution: number
    mobility: number
    carrycap: number
    inspiration: number
}

export interface Info {
    id: string
    name: string
    species: string
    age: number
    height: number
    level: number
}


export interface CharacterSheet {
    info: Info
    attributes: Attributes
    stats: Stats
    skills: Skills
    data: Data
}