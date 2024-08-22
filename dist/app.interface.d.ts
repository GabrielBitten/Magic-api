export interface Card {
    name: string;
    manaCost: string;
    cmc: number;
    colors: string[];
    colorIdentity: string[];
    type: string;
    supertypes: string[];
    types: string[];
    subtypes: string[];
    rarity: string;
    set: string;
    setName: string;
    text: string;
    flavor: string;
    artist: string;
    number: string;
    power: string;
    toughness: string;
    layout: string;
    multiverseid: string;
    imageUrl: string;
    foreignNames: Array<{
        name: string;
        text: string;
        type: string;
        flavor: string;
        imageUrl: string;
        language: string;
        identifiers: {
            scryfallId: string;
            multiverseId: number;
        };
        multiverseid: number;
    }>;
    printings: string[];
    originalText: string;
    originalType: string;
    legalities: Array<{
        format: string;
        legality: string;
    }>;
    id: string;
}
