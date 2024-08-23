import { Injectable } from '@nestjs/common';
import { Card } from './app.interface';
import fetch from 'node-fetch';
import * as fs from 'fs';
import { DeckService } from './deck.service'; 

@Injectable()
export class CardsService {
  private deck: Card[] = [];

  constructor(private readonly deckService: DeckService) {}

  async fetchCardByName(name: string): Promise<Card> {
    const response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${name}`);
    const data = await response.json();
    return data.cards[0]; 
  }

  async fetchCardsByColorIdentity(colorIdentity: string[]): Promise<Card[]> {
    const colorQuery = colorIdentity.join('|'); 
    const response = await fetch(`https://api.magicthegathering.io/v1/cards?colorIdentity=${colorQuery}`);
    const data = await response.json();
    return data.cards;
  }

  async buildDeck(commanderName: string): Promise<void> {
 
    const commander = await this.fetchCardByName(commanderName);
    if (!commander || !commander.types.includes('Legendary')) {
      throw new Error('Commander not found or is not a Legendary Creature.');
    }
    this.deck.push(commander);

  
    const colorIdentity = commander.colorIdentity;
    let availableCards = await this.fetchCardsByColorIdentity(colorIdentity);

   
    const uniqueCards = availableCards.filter(
      (card, index, self) => self.findIndex(c => c.name === card.name) === index
    );

    this.deck.push(...uniqueCards.slice(0, 98)); 

  
    fs.writeFileSync('deck.json', JSON.stringify(this.deck, null, 2));


    await this.saveDeck();
  }

 
  async saveDeck(): Promise<void> {
    if (this.deck.length === 99) {
      await this.deckService.saveDeck(this.deck);
    } else {
      throw new Error('Deck is not complete');
    }
  }


  getDeck(): Card[] {
    return this.deck;
  }
}
