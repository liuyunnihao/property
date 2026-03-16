import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log('[Admin] 登录请求:', { username: body.username });
    return this.adminService.login(body.username, body.password);
  }
}
