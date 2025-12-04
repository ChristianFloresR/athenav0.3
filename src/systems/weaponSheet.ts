export interface rangedWeapon {
    //meta
    id: string
    name: string
    type: string

    //data
    tier: number,
    attribute: null,

    firerate: number,
    ammotype: string,
    magazine: number,

    rangeShort: number,
    rangeMid: number,
    rangeLong: number,

    description: string,

    //attachments
    attachmentMuzzle: {},
    attachmentRailLower: {},
    attachmentRailLeft: {},
    attachmentRailRight: {},
    attachmentRailUpper: {},
    attachmentStock: {},

}

export interface attachment {
    rangeBonusShort: null,
    rangeBonusMedium: null,
    rangeBonusLong: null,
    firerateBonus: null,
    description: string
}