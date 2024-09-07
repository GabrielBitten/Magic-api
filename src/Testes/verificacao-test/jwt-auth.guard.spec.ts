import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../verificacao/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(() => {
    jwtAuthGuard = new JwtAuthGuard();
  });

  it('should activate the guard', () => {
    const context = {} as ExecutionContext;  
    const result = jwtAuthGuard.canActivate(context);

    expect(result).toBe(true); 
  });
});
