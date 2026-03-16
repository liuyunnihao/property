import { Controller, Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import { RepairService } from './repair.service';

@Controller('admin/repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}

  @Get()
  async getList(@Query() query: { status?: string }) {
    console.log('[Repair] 获取列表:', query);
    return this.repairService.findAll(query.status);
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    console.log('[Repair] 获取详情:', id);
    return this.repairService.findOne(id);
  }

  @Put(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; remark?: string }
  ) {
    console.log('[Repair] 更新状态:', { id, ...body });
    return this.repairService.updateStatus(id, body.status, body.remark);
  }
}
