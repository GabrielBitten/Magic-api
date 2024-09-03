import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CardsService } from './app.service';
import { JwtAuthGuard } from './verificacao/jwt-auth.guard';


@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('build/:commanderName')
  async buildDeck(@Param('commanderName') commanderName: string): Promise<string> {
    await this.cardsService.buildDeck(commanderName);
    return 'Deck built successfully';
  }
  @UseGuards(JwtAuthGuard)
  @Get('deck')
  getDeck() {
    return this.cardsService.getDeck();
  }
}
