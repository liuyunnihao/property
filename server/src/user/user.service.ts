import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  name: string;
  phone: string;
  roomNumber: string;
  building: string;
  unit: string;
  checkInDate: string;
  status: 'active' | 'inactive';
}

@Injectable()
export class UserService {
  // 模拟数据
  private users: User[] = [
    {
      id: '1',
      name: '张先生',
      phone: '138****1234',
      roomNumber: '101室',
      building: '1',
      unit: '1',
      checkInDate: '2022-03-15',
      status: 'active'
    },
    {
      id: '2',
      name: '李女士',
      phone: '139****5678',
      roomNumber: '502室',
      building: '2',
      unit: '3',
      checkInDate: '2021-08-20',
      status: 'active'
    },
    {
      id: '3',
      name: '王先生',
      phone: '137****9012',
      roomNumber: '301室',
      building: '3',
      unit: '2',
      checkInDate: '2023-01-10',
      status: 'active'
    },
    {
      id: '4',
      name: '赵女士',
      phone: '136****3456',
      roomNumber: '401室',
      building: '1',
      unit: '2',
      checkInDate: '2020-05-08',
      status: 'inactive'
    },
    {
      id: '5',
      name: '刘先生',
      phone: '135****7890',
      roomNumber: '202室',
      building: '2',
      unit: '1',
      checkInDate: '2022-11-25',
      status: 'active'
    }
  ];

  async findAll(keyword?: string): Promise<{ code: number; msg: string; data: User[] }> {
    let result = this.users;
    if (keyword) {
      result = this.users.filter(
        u => u.name.includes(keyword) || u.roomNumber.includes(keyword)
      );
    }
    return {
      code: 200,
      msg: 'success',
      data: result
    };
  }
}
