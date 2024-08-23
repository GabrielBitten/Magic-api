import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './cards.entity'; 
import { Card } from './app.interface'; 

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}


  async saveDeck(deck: Card[]): Promise<void> {
    const cardEntities = deck.map((card) =>
      this.cardRepository.create({
        ...card,
        commanderId: deck[0].id, 
      }),
    );

    await this.cardRepository.save(cardEntities);
  }


  async getDeck(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async deleteDeck(): Promise<void> {
    await this.cardRepository.clear();
  }

  
  async updateCard(id: string, updatedCard: Partial<Card>): Promise<void> {
    await this.cardRepository.update(id, updatedCard);
  }

  
  async deleteCard(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
