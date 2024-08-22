"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
let CardsService = class CardsService {
    constructor() {
        this.cards = [];
    }
    addCard(card) {
        if (this.cards.find(c => c.name === card.name)) {
            throw new Error('Card already exists in the deck.');
        }
        this.cards.push(card);
    }
    getCards() {
        return this.cards;
    }
    async fetchCardById(id) {
        const response = await fetch(`https://api.magicthegathering.io/v1/cards/${id}`);
        const data = await response.json();
        return data.card;
    }
    async addSpecificCard() {
        const specificId = '81daea6a-2735-5a46-a2da-b65a2ad5738f';
        try {
            const card = await this.fetchCardById(specificId);
            if (!card) {
                throw new Error('Card not found.');
            }
            if (this.cards.find(c => c.name === card.name)) {
                throw new Error('Card already exists in the deck.');
            }
            this.cards.push(card);
        }
        catch (error) {
            throw new Error(`Failed to add card: ${error.message}`);
        }
    }
    validateDeck() {
        return this.cards.length === 99 && new Set(this.cards.map(c => c.name)).size === 99;
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)()
], CardsService);
//# sourceMappingURL=app.service.js.map