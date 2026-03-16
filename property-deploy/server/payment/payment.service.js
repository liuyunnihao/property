"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
let PaymentService = class PaymentService {
    constructor() {
        this.payments = [
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
    }
    async findAll(status) {
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
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
//# sourceMappingURL=payment.service.js.map