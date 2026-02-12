import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        bio: true,
        dateOfBirth: true,
        role: true,
        status: true,
        language: true,
        currency: true,
        timezone: true,
        emailVerified: true,
        phoneVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, dto: UpdateUserDto) {
    // Check if username is already taken
    if (dto.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: dto.username },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Username already taken');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        bio: true,
        dateOfBirth: true,
        role: true,
        language: true,
        currency: true,
        timezone: true,
        updatedAt: true,
      },
    });

    return user;
  }

  /**
   * Update user avatar
   */
  async updateAvatar(userId: string, avatarUrl: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
      select: {
        id: true,
        avatar: true,
      },
    });

    return user;
  }

  /**
   * Delete user account
   */
  async deleteAccount(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { status: 'DELETED' },
    });

    return { message: 'Account deleted successfully' };
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string) {
    const [listingsCount, bookingsCount, reviewsCount] = await Promise.all([
      this.prisma.listing.count({ where: { hostId: userId } }),
      this.prisma.booking.count({ where: { guestId: userId } }),
      this.prisma.review.count({ where: { authorId: userId } }),
    ]);

    return {
      listingsCount,
      bookingsCount,
      reviewsCount,
    };
  }
}
