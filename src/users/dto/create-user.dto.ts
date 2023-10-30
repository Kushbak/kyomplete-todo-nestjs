import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20) // Minimum and maximum length for the username
  username: string;

  @IsString()
  @Length(6, 255) // Minimum and maximum length for the password
  password: string;

  @IsEmail()
  email: string;
}
