import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from '../../cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from '../../cards.entity';
import { DeleteResult } from 'typeorm';

describe('CardsService', () => {
  let service: CardsService;
  let repository: Repository<CardEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(CardEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    repository = module.get<Repository<CardEntity>>(getRepositoryToken(CardEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addCard', () => {
    it('should add a card', async () => {
      const card = { id: '1', name: 'Card 1' } as CardEntity;
      jest.spyOn(repository, 'save').mockResolvedValue(card);

      expect(await service.addCard(card)).toEqual(card);
    });
  });

  describe('getCards', () => {
    it('should return an array of cards', async () => {
      const cards = [{ id: '1', name: 'Card 1' }] as CardEntity[];
      jest.spyOn(repository, 'find').mockResolvedValue(cards);

      expect(await service.getCards()).toEqual(cards);
    });
  });

  describe('getCardById', () => {
    it('should return a card by id', async () => {
      const card = { id: '1', name: 'Card 1' } as CardEntity;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(card);

      expect(await service.getCardById('1')).toEqual(card);
    });

    it('should throw NotFoundException if card not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.getCardById('1')).rejects.toThrow('Card not found');
    });
  });

  describe('updateCard', () => {
    it('should update a card', async () => {
      const card = { id: '1', name: 'Card 1' } as CardEntity;
      jest.spyOn(repository, 'preload').mockResolvedValue(card);
      jest.spyOn(repository, 'save').mockResolvedValue(card);

      expect(await service.updateCard('1', { name: 'Updated Card' })).toEqual(card);
    });

    it('should throw NotFoundException if card not found', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValue(null);

      await expect(service.updateCard('1', { name: 'Updated Card' })).rejects.toThrow('Card not found');
    });
  });


  describe('deleteCard', () => {
    it('should delete a card successfully', async () => {
      const deleteResult: DeleteResult = { 
        raw: {}, 
        affected: 1 
      };
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
  
      await expect(service.deleteCard('1')).resolves.not.toThrow();
    });
  
    it('should throw NotFoundException if card not found', async () => {
      const deleteResult: DeleteResult = { 
        raw: {}, 
        affected: 0 
      };
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
  
      await expect(service.deleteCard('1')).rejects.toThrow('Card not found');
    });
  });
  
});
