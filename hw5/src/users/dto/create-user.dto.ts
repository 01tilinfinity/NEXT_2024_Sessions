// src/users/dto/create-user.dto.ts

import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsUrl()
  avatarUrl: string;
}
