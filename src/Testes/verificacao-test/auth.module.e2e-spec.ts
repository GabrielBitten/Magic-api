import { Module } from '@nestjs/common';
import { AuthService } from '../../verificacao/auth.service';
import { JwtStrategy } from '../../verificacao/jwt.strategy';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../../verificacao/jwt-auth.guard';

@Module({
  imports: [
    UsersModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, 
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], 
  exports: [AuthService],
})
export class AuthModule {}
