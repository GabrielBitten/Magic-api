export interface Card {
  id: string;
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
  foreignNames: any[]; 
  printings: string[];
  originalText: string;
  originalType: string;
  legalities: { format: string; legality: string }[];
}
