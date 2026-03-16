"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
let DashboardService = class DashboardService {
    async getStats() {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map