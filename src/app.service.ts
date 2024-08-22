import { Injectable } from '@nestjs/common';
import { Card } from './app.interface'; 

@Injectable()
export class CardsService {
  private cards: Card[] = []; 

 
  addCard(card: Card): void {
    
    if (this.cards.find(c => c.name === card.name)) {
      throw new Error('Card already exists in the deck.');
    }
    this.cards.push(card);
  }

 
  getCards(): Card[] {
    return this.cards;
  }

 
  async fetchCardById(id: string): Promise<Card> {
    const response = await fetch(`https://api.magicthegathering.io/v1/cards/${id}`);
    const data = await response.json();
    return data.card;
  }

 
  async addSpecificCard(): Promise<void> {
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
    } catch (error) {
      throw new Error(`Failed to add card: ${error.message}`);
    }
  }


  validateDeck(): boolean {
    return this.cards.length === 99 && new Set(this.cards.map(c => c.name)).size === 99;
  }
}