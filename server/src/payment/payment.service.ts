import { Injectable } from '@nestjs/common';

export interface Payment {
  id: string;
  userName: string;
  roomNumber: string;
  amount: number;
  type: 'property' | 'water' | 'electricity' | 'parking';
  status: 'unpaid' | 'paid';
  dueDate: string;
  paidDate?: string;
}

@Injectable()
export class PaymentService {
  // 模拟数据
  private payments: Payment[] = [
    {
      id: '1',
      userName: '张先生',
      roomNumber: '1-1-101',
      amount: 350.00,
      type: 'property',
      status: 'unpaid',
      dueDate: '2024-01-25'
    },
    {
      id: '2',
      userName: '李女士',
      roomNumber: '2-3-502',
      amount: 120.50,
      type: 'water',
      status: 'paid',
      dueDate: '2024-01-20',
      paidDate: '2024-01-18'
    },
    {
      id: '3',
      userName: '王先生',
      roomNumber: '3-2-301',
      amount: 280.00,
      type: 'electricity',
      status: 'unpaid',
      dueDate: '2024-01-28'
    },
    {
      id: '4',
      userName: '赵女士',
      roomNumber: '1-2-401',
      amount: 500.00,
      type: 'parking',
      status: 'paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-10'
    }
  ];

  async findAll(status?: string): Promise<{ code: number; msg: string; data: Payment[] }> {
    let result = this.payments;
    if (status) {
      result = this.payments.filter(p => p.status === status);
    }
    return {
      code: 200,
      msg: 'success',
      data: result
    };
  }
}
