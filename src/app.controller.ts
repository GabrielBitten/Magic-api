import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CardsService } from './app.service'; 
import { Card } from './app.interface'; 

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async addCard(@Body() card: Card): Promise<string> {
    try {
      this.cardsService.addCard(card);
      return 'Card added successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  getCards(): Card[] {
    return this.cardsService.getCards();
  }

  @Get('validate')
  validateDeck(): string {
    const isValid = this.cardsService.validateDeck();
    return isValid ? 'Deck is valid' : 'Deck is invalid';
  }

  @Post('add-specific')
  async addSpecificCard(): Promise<string> {
    try {
      await this.cardsService.addSpecificCard();
      return 'Specific card added successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
