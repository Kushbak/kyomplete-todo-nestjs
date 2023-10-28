import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersService } from './users.service';

@Module({
  imports: [PassportModule],
  providers: [LocalStrategy, UsersService],
})
export class AuthModule {}
