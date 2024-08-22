import { Module } from '@nestjs/common';
import { CardsController } from './app.controller';
import { CardsService } from './app.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService], 
})
export class CardsModule {}
