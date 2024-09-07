import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from '../../app.controller';
import { CardsService } from '../../app.service';
import { JwtAuthGuard } from 'src/verificacao/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';



describe('CardsController', () => {
    let controller: CardsController;
    let service: CardsService;
  
    const mockCardsService = {
      buildDeck: jest.fn().mockResolvedValue(undefined),
      getDeck: jest.fn().mockReturnValue([]), 
    };
  
    const mockJwtAuthGuard = {
      canActivate: jest.fn().mockImplementation((context: ExecutionContext) => true),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [CardsController],
        providers: [
          { provide: CardsService, useValue: mockCardsService },
          { provide: JwtAuthGuard, useValue: mockJwtAuthGuard }, 
        ],
      }).compile();
  
      controller = module.get<CardsController>(CardsController);
      service = module.get<CardsService>(CardsService);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  
    describe('buildDeck', () => {
      it('should build a deck successfully', async () => {
        const commanderName = 'Test Commander';
        await expect(controller.buildDeck(commanderName)).resolves.toBe('Deck built successfully');
        expect(service.buildDeck).toHaveBeenCalledWith(commanderName);
      });
    });
  
    describe('getDeck', () => {
      it('should return the deck', () => {
        const result = [];
        jest.spyOn(service, 'getDeck').mockReturnValue(result);
        expect(controller.getDeck()).toBe(result);
      });
    });
  });