import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({ secret: 'FFFFFF', signOptions: { expiresIn: '6h' } }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
