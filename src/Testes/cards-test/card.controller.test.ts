import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from '../../cards.controller';
import { CardsService } from '../../cards.service';
import { CardEntity } from '../../cards.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: {
            addCard: jest.fn(),
            getCards: jest.fn(),
            getCardById: jest.fn(),
            updateCard: jest.fn(),
            deleteCard: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addCard', () => {
    it('should add a card successfully', async () => {
      const card = { id: '1', name: 'Card 1' } as CardEntity;
      jest.spyOn(service, 'addCard').mockResolvedValue(undefined);

      expect(await controller.addCard(card)).toBe('Card added successfully');
    });

    it('should throw HttpException if adding card fails', async () => {
      const card = { id: '1', name: 'Card 1' } as CardEntity;
      jest.spyOn(service, 'addCard').mockRejectedValue(new Error('Error'));

      await expect(controller.addCard(card)).rejects.toThrow(HttpException);
    });
  });

  describe('getCards', () => {
    it('should return an array of cards', async () => {
      const cards = [{ id: '1', name: 'Card 1' }] as CardEntity[];
      jest.spyOn(service, 'getCards').mockResolvedValue(cards);

      expect(await controller.getCards()).toEqual(cards);
    });
  });

  describe('getCardById', () => {
    it('should return a card by id', async () => {
      const card = { id: '1', name: 'Card 1' } as CardEntity;
      jest.spyOn(service, 'getCardById').mockResolvedValue(card);

      expect(await controller.getCardById('1')).toEqual(card);
    });

    it('should throw HttpException if card not found', async () => {
      jest.spyOn(service, 'getCardById').mockRejectedValue(new Error('Card not found'));

      await expect(controller.getCardById('1')).rejects.toThrow(HttpException);
    });
  });

  describe('updateCard', () => {
    it('should update a card successfully', async () => {
      const card = { id: '1', name: 'Card 1' } as CardEntity;
      jest.spyOn(service, 'updateCard').mockResolvedValue(card);

      expect(await controller.updateCard('1', { name: 'Updated Card' })).toBe('Card updated successfully');
    });

    it('should throw HttpException if updating card fails', async () => {
      jest.spyOn(service, 'updateCard').mockRejectedValue(new Error('Card not found'));

      await expect(controller.updateCard('1', { name: 'Updated Card' })).rejects.toThrow(HttpException);
    });
  });

  describe('deleteCard', () => {
    it('should delete a card successfully', async () => {
      jest.spyOn(service, 'deleteCard').mockResolvedValue(undefined);

      expect(await controller.deleteCard('1')).toBe('Card deleted successfully');
    });

    it('should throw HttpException if deleting card fails', async () => {
      jest.spyOn(service, 'deleteCard').mockRejectedValue(new Error('Card not found'));

      await expect(controller.deleteCard('1')).rejects.toThrow(HttpException);
    });
  });
});
