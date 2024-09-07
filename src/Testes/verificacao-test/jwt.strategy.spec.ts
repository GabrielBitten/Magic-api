import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../verificacao/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should validate a JWT payload', async () => {
    const payload = { sub: 1, username: 'testuser' };

    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual({ userId: 1, username: 'testuser' });
  });
});
