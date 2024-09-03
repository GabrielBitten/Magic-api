import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards.module'; 
import { UsersModule } from './users/users.module';
import { AuthModule } from './verificacao/auth.module'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CardsModule,
    UsersModule, 
    AuthModule,   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
