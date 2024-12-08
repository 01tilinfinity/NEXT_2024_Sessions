// src/user-profiles/user-profiles.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express'; // express의 Request 타입을 가져옵니다.

@Controller('profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProfile(
    @Request() req: ExpressRequest & { user: { userId: number } }, // user의 타입을 명시적으로 지정
    @Body() { bio, avatarUrl }: { bio: string; avatarUrl: string },
  ) {
    return this.userProfilesService.createProfile(
      req.user.userId,
      bio,
      avatarUrl,
    ); // req.user.userId로 접근
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(
    @Request() req: ExpressRequest & { user: { userId: number } },
  ) {
    return this.userProfilesService.getProfile(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateProfile(
    @Request() req: ExpressRequest & { user: { userId: number } }, // user의 타입을 명시적으로 지정
    @Body() { bio, avatarUrl }: { bio: string; avatarUrl: string },
  ) {
    return this.userProfilesService.updateProfile(
      req.user.userId,
      bio,
      avatarUrl,
    );
  }
}
