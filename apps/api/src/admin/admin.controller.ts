import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  async getUsers() {
    return this.adminService.getUsers();
  }

  @Get('listings')
  async getListings() {
    return this.adminService.getListings();
  }

  @Patch('users/:id/ban')
  async banUser(@Param('id') userId: string) {
    return this.adminService.banUser(userId);
  }

  @Patch('users/:id/activate')
  async activateUser(@Param('id') userId: string) {
    return this.adminService.activateUser(userId);
  }

  @Patch('listings/:id/approve')
  async approveListing(@Param('id') listingId: string) {
    return this.adminService.approveListing(listingId);
  }

  @Patch('listings/:id/reject')
  async rejectListing(@Param('id') listingId: string) {
    return this.adminService.rejectListing(listingId);
  }
}
