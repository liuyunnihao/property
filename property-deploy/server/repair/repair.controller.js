"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairController = void 0;
const common_1 = require("@nestjs/common");
const repair_service_1 = require("./repair.service");
let RepairController = class RepairController {
    constructor(repairService) {
        this.repairService = repairService;
    }
    async getList(query) {
        console.log('[Repair] 获取列表:', query);
        return this.repairService.findAll(query.status);
    }
    async getDetail(id) {
        console.log('[Repair] 获取详情:', id);
        return this.repairService.findOne(id);
    }
    async updateStatus(id, body) {
        console.log('[Repair] 更新状态:', { id, ...body });
        return this.repairService.updateStatus(id, body.status, body.remark);
    }
};
exports.RepairController = RepairController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RepairController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RepairController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RepairController.prototype, "updateStatus", null);
exports.RepairController = RepairController = __decorate([
    (0, common_1.Controller)('admin/repair'),
    __metadata("design:paramtypes", [repair_service_1.RepairService])
], RepairController);
//# sourceMappingURL=repair.controller.js.map