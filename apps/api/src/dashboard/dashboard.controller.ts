import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

type AuthenticatedRequest = ExpressRequest & { user: { userId: string } };

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats(@Request() req: AuthenticatedRequest) {
    return this.dashboardService.getStats(req.user.userId);
  }

  @Get('activity')
  async getRecentActivity(@Request() req: AuthenticatedRequest) {
    return this.dashboardService.getRecentActivity(req.user.userId);
  }
}
