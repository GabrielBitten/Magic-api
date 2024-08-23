// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards.module'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
