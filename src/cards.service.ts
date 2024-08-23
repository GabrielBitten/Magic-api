import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './cards.entity'; 

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}


  async addCard(card: CardEntity): Promise<CardEntity> {
    const newCard = this.cardRepository.create(card);
    return this.cardRepository.save(newCard);
  }

  async getCards(): Promise<CardEntity[]> {
    return this.cardRepository.find();
  }

 
  async getCardById(id: string): Promise<CardEntity> {
    const card = await this.cardRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }

 
  async updateCard(id: string, updatedCard: Partial<CardEntity>): Promise<CardEntity> {
    const card = await this.cardRepository.preload({
      id,
      ...updatedCard,
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return this.cardRepository.save(card);
  }


  async deleteCard(id: string): Promise<void> {
    const result = await this.cardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Card not found');
    }
  }
}
