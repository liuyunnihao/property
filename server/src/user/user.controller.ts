import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getList(@Query() query: { keyword?: string }) {
    console.log('[User] 获取列表:', query);
    return this.userService.findAll(query.keyword);
  }
}
