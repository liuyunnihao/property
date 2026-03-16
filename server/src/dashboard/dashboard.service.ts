import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getStats() {
    // 模拟统计数据
    const stats = {
      pendingRepairs: 5,
      monthIncome: 128500,
      pendingNotices: 2,
      totalUsers: 356,
      recentRepairs: [
        {
          id: '1',
          title: '水管漏水',
          status: 'pending',
          createTime: '2024-01-15 09:30'
        },
        {
          id: '2',
          title: '电梯故障',
          status: 'processing',
          createTime: '2024-01-14 14:20'
        },
        {
          id: '3',
          title: '门禁损坏',
          status: 'completed',
          createTime: '2024-01-13 16:45'
        }
      ]
    };

    return {
      code: 200,
      msg: 'success',
      data: stats
    };
  }
}
