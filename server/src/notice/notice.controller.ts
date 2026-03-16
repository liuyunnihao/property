import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('admin/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  async getList(@Query() query: { status?: string }) {
    console.log('[Notice] 获取列表:', query);
    return this.noticeService.findAll(query.status);
  }

  @Post()
  async create(@Body() body: { title: string; content: string; type: string; status: string }) {
    console.log('[Notice] 创建通知:', body);
    return this.noticeService.create(body);
  }
}
