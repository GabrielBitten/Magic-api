import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardEntity } from './cards.entity'; 

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  
  @Post()
  async addCard(@Body() card: CardEntity): Promise<string> {
    try {
      await this.cardsService.addCard(card);
      return 'Card added successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getCards(): Promise<CardEntity[]> {
    return this.cardsService.getCards();
  }

  @Get(':id')
  async getCardById(@Param('id') id: string): Promise<CardEntity> {
    try {
      return await this.cardsService.getCardById(id);
    } catch (error) {

        
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }


  @Put(':id')
  async updateCard(@Param('id') id: string, @Body() updatedCard: Partial<CardEntity>): Promise<string> {
    try {
      await this.cardsService.updateCard(id, updatedCard);
      return 'Card updated successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Remove uma carta pelo ID
  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<string> {
    try {
      await this.cardsService.deleteCard(id);
      return 'Card deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
