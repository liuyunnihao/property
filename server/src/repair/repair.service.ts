import { Injectable } from '@nestjs/common';

export interface Repair {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  userName: string;
  userPhone: string;
  address: string;
  createTime: string;
  remark?: string;
}

@Injectable()
export class RepairService {
  // 模拟数据
  private repairs: Repair[] = [
    {
      id: '1',
      title: '水管漏水',
      description: '厨房水管接口处漏水，影响正常使用',
      status: 'pending',
      userName: '张先生',
      userPhone: '138****1234',
      address: '幸福小区1栋1单元101室',
      createTime: '2024-01-15 09:30'
    },
    {
      id: '2',
      title: '电梯故障',
      description: '3号电梯运行时有异响',
      status: 'processing',
      userName: '李女士',
      userPhone: '139****5678',
      address: '幸福小区2栋',
      createTime: '2024-01-14 14:20'
    },
    {
      id: '3',
      title: '门禁损坏',
      description: '单元门门禁刷卡无反应',
      status: 'completed',
      userName: '王先生',
      userPhone: '137****9012',
      address: '幸福小区3栋2单元',
      createTime: '2024-01-13 16:45'
    }
  ];

  async findAll(status?: string): Promise<{ code: number; msg: string; data: Repair[] }> {
    let result = this.repairs;
    if (status) {
      result = this.repairs.filter(r => r.status === status);
    }
    return {
      code: 200,
      msg: 'success',
      data: result
    };
  }

  async findOne(id: string): Promise<{ code: number; msg: string; data: Repair | null }> {
    const repair = this.repairs.find(r => r.id === id);
    return {
      code: repair ? 200 : 404,
      msg: repair ? 'success' : '工单不存在',
      data: repair || null
    };
  }

  async updateStatus(id: string, status: string, remark?: string): Promise<{ code: number; msg: string }> {
    const index = this.repairs.findIndex(r => r.id === id);
    if (index === -1) {
      return { code: 404, msg: '工单不存在' };
    }
    
    this.repairs[index].status = status as Repair['status'];
    if (remark) {
      this.repairs[index].remark = remark;
    }
    
    return { code: 200, msg: '更新成功' };
  }
}
