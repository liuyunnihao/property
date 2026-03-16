import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  // 模拟管理员数据
  private admins = [
    { id: '1', username: 'admin', password: 'admin123', role: 'admin', name: '系统管理员' }
  ];

  async login(username: string, password: string) {
    const admin = this.admins.find(
      a => a.username === username && a.password === password
    );

    if (!admin) {
      return {
        code: 401,
        msg: '用户名或密码错误',
        data: null
      };
    }

    // 生成简单 token（实际项目应使用 JWT）
    const token = `admin-token-${admin.id}-${Date.now()}`;

    return {
      code: 200,
      msg: '登录成功',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          role: admin.role,
          name: admin.name
        }
      }
    };
  }
}
