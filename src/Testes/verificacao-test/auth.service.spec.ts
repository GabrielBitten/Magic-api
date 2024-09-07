import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../verificacao/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByUsername: jest.fn(),  
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),  
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should validate a user successfully', async () => {
    const user = { username: 'testuser', password: 'testpass' };
    (usersService.findOneByUsername as jest.Mock).mockResolvedValue(user);

    const result = await authService.validateUser('testuser', 'testpass');

    expect(result).toEqual({ username: 'testuser' });
  });

  it('should return null for an invalid user', async () => {
    (usersService.findOneByUsername as jest.Mock).mockResolvedValue(null);

    const result = await authService.validateUser('wronguser', 'wrongpass');

    expect(result).toBeNull();
  });

  it('should generate a JWT token on login', async () => {
    const user = { username: 'testuser', id: 1 };
    const token = 'testtoken';
    (jwtService.sign as jest.Mock).mockReturnValue(token);

    const result = await authService.login(user);

    expect(result).toEqual({ access_token: token });
    expect(jwtService.sign).toHaveBeenCalledWith({ username: 'testuser', sub: 1 });
  });
});
