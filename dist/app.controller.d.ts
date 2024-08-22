import { CardsService } from './app.service';
import { Card } from './app.interface';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    addCard(card: Card): string;
    getCards(): Card[];
    validateDeck(): string;
}
