// src/user-profiles/user-profile.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column()
  avatarUrl: string;

  @OneToOne(() => User, (user) => user.userDetail)
  @JoinColumn()
  user: User;
}
