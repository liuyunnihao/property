"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
let AdminService = class AdminService {
    constructor() {
        this.admins = [
            { id: '1', username: 'admin', password: 'admin123', role: 'admin', name: '系统管理员' }
        ];
    }
    async login(username, password) {
        const admin = this.admins.find(a => a.username === username && a.password === password);
        if (!admin) {
            return {
                code: 401,
                msg: '用户名或密码错误',
                data: null
            };
        }
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map