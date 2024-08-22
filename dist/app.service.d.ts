import { Card } from './app.interface';
export declare class CardsService {
    private cards;
    addCard(card: Card): void;
    getCards(): Card[];
    fetchCardById(id: string): Promise<Card>;
    addSpecificCard(): Promise<void>;
    validateDeck(): boolean;
}
