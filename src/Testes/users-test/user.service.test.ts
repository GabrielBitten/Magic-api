import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../users/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = { username: 'testuser', password: 'testpassword' };
    jest.spyOn(repository, 'save').mockResolvedValue(user as any);
    const createdUser = await service.createUser(user.username, user.password);
    expect(createdUser).toEqual(user);
  });

  it('should find a user by username', async () => {
    const user = { username: 'testuser', password: 'testpassword' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(user as any);
    const foundUser = await service.findOneByUsername(user.username);
    expect(foundUser).toEqual(user);
  });
});
