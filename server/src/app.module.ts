import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AdminModule } from '@/admin/admin.module';
import { DashboardModule } from '@/dashboard/dashboard.module';
import { RepairModule } from '@/repair/repair.module';
import { PaymentModule } from '@/payment/payment.module';
import { NoticeModule } from '@/notice/notice.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    AdminModule,
    DashboardModule,
    RepairModule,
    PaymentModule,
    NoticeModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
