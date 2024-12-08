// src/user-profiles/user-profiles.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { User } from '../users/user.entity';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProfile(
    userId: number,
    bio: string,
    avatarUrl: string,
  ): Promise<UserProfile> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const profile = this.profileRepository.create({ bio, avatarUrl, user });
    return this.profileRepository.save(profile);
  }

  async getProfile(userId: number): Promise<UserProfile> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(
    userId: number,
    bio: string,
    avatarUrl: string,
  ): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    if (profile.user.id !== userId) throw new UnauthorizedException();

    profile.bio = bio;
    profile.avatarUrl = avatarUrl;
    return this.profileRepository.save(profile);
  }
}
