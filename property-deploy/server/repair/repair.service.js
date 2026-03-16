"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairService = void 0;
const common_1 = require("@nestjs/common");
let RepairService = class RepairService {
    constructor() {
        this.repairs = [
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
    }
    async findAll(status) {
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
    async findOne(id) {
        const repair = this.repairs.find(r => r.id === id);
        return {
            code: repair ? 200 : 404,
            msg: repair ? 'success' : '工单不存在',
            data: repair || null
        };
    }
    async updateStatus(id, status, remark) {
        const index = this.repairs.findIndex(r => r.id === id);
        if (index === -1) {
            return { code: 404, msg: '工单不存在' };
        }
        this.repairs[index].status = status;
        if (remark) {
            this.repairs[index].remark = remark;
        }
        return { code: 200, msg: '更新成功' };
    }
};
exports.RepairService = RepairService;
exports.RepairService = RepairService = __decorate([
    (0, common_1.Injectable)()
], RepairService);
//# sourceMappingURL=repair.service.js.map