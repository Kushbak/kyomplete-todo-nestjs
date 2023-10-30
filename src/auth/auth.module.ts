import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../../src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [LocalStrategy],
})
export class AuthModule {}
