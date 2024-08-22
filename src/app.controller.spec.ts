import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './app.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsService],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a card', async () => {
    await service.addSpecificCard();
    expect(service.getCards().length).toBe(1);
  });

  it('should validate deck', async () => {
    await service.addSpecificCard();
    expect(service.validateDeck()).toBe(false); 
  });
});
