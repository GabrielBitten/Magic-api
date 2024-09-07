import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users/users.controller';
import { UsersService } from '../../users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const user = { id: '123', username: 'testuser', password: 'testpassword' };
    jest.spyOn(service, 'createUser').mockResolvedValue(user as any);
    const result = await controller.register('testuser', 'testpassword');
    expect(result).toEqual({ userId: '123' });
    expect(service.createUser).toHaveBeenCalledWith('testuser', 'testpassword');
  });
});
