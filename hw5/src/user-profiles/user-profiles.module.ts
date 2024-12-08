// src/user-profiles/user-profiles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilesService } from './user-profiles.service';
import { UserProfilesController } from './user-profiles.controller';
import { UserProfile } from './user-profile.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])],
  providers: [UserProfilesService],
  controllers: [UserProfilesController],
})
export class UserProfilesModule {}
