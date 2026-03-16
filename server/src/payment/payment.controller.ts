import { Controller, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('admin/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getList(@Query() query: { status?: string }) {
    console.log('[Payment] 获取列表:', query);
    return this.paymentService.findAll(query.status);
  }
}
