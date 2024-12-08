// src/users/dto/update-user.dto.ts
import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  bio?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
