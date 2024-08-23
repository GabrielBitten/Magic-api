import { Controller, Get, Param } from '@nestjs/common';
import { CardsService } from './app.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('build/:commanderName')
  async buildDeck(@Param('commanderName') commanderName: string): Promise<string> {
    await this.cardsService.buildDeck(commanderName);
    return 'Deck built successfully';
  }

  @Get('deck')
  getDeck() {
    return this.cardsService.getDeck();
  }
}
