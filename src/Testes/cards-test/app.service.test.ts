import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from '../../app.service';
import { DeckService } from '../../deck.service';
import { Card } from '../../app.interface';
import fetch from 'node-fetch';
import * as fs from 'fs';

jest.mock('node-fetch');
jest.mock('fs');

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
const mockFs = fs as jest.Mocked<typeof fs>;

describe('CardsService', () => {
  let service: CardsService;
  let deckService: DeckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: DeckService,
          useValue: { saveDeck: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    deckService = module.get<DeckService>(DeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchCardByName', () => {
    it('should fetch a card by name', async () => {
      const mockCard: Card = {
          name: 'Mock Card', types: ['Legendary'], colorIdentity: ['G'],
          id: '',
          manaCost: '',
          cmc: 0,
          colors: [],
          type: '',
          supertypes: [],
          subtypes: [],
          rarity: '',
          set: '',
          setName: '',
          text: '',
          flavor: '',
          artist: '',
          number: '',
          power: '',
          toughness: '',
          layout: '',
          multiverseid: '',
          imageUrl: '',
          foreignNames: [],
          printings: [],
          originalText: '',
          originalType: '',
          legalities: []
      };
      mockFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({ cards: [mockCard] }),
      } as any);

      const card = await service.fetchCardByName('Mock Card');
      expect(card).toEqual(mockCard);
    });
  });

  describe('buildDeck', () => {
    it('should build a deck and save it', async () => {
      const mockCommander: Card = {
          name: 'Commander', types: ['Legendary'], colorIdentity: ['G'],
          id: '',
          manaCost: '',
          cmc: 0,
          colors: [],
          type: '',
          supertypes: [],
          subtypes: [],
          rarity: '',
          set: '',
          setName: '',
          text: '',
          flavor: '',
          artist: '',
          number: '',
          power: '',
          toughness: '',
          layout: '',
          multiverseid: '',
          imageUrl: '',
          foreignNames: [],
          printings: [],
          originalText: '',
          originalType: '',
          legalities: []
      };
      const mockCards: Card[] = Array(98).fill({ name: 'Card', types: [], colorIdentity: [] });
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve({ cards: [mockCommander] }) } as any),
      );
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve({ cards: mockCards }) } as any),
      );
      mockFs.writeFileSync = jest.fn();

      await service.buildDeck('Commander');
      expect(mockFs.writeFileSync).toHaveBeenCalledWith('deck.json', JSON.stringify([mockCommander, ...mockCards.slice(0, 98)], null, 2));
      expect(deckService.saveDeck).toHaveBeenCalled();
    });

    it('should throw an error if the deck is not complete', async () => {
      const mockCommander: Card = {
          name: 'Commander', types: ['Legendary'], colorIdentity: ['G'],
          id: '',
          manaCost: '',
          cmc: 0,
          colors: [],
          type: '',
          supertypes: [],
          subtypes: [],
          rarity: '',
          set: '',
          setName: '',
          text: '',
          flavor: '',
          artist: '',
          number: '',
          power: '',
          toughness: '',
          layout: '',
          multiverseid: '',
          imageUrl: '',
          foreignNames: [],
          printings: [],
          originalText: '',
          originalType: '',
          legalities: []
      };
      const mockCards: Card[] = Array(98).fill({ name: 'Card', types: [], colorIdentity: [] });
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve({ cards: [mockCommander] }) } as any),
      );
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve({ cards: mockCards }) } as any),
      );

      service.getDeck = jest.fn().mockReturnValue(mockCards.slice(0, 98)); 
      await expect(service.saveDeck()).rejects.toThrow('Deck is not complete');
    });
  });
});
