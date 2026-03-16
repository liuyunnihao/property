"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
const common_1 = require("@nestjs/common");
let NoticeService = class NoticeService {
    constructor() {
        this.notices = [
            {
                id: '1',
                title: '2024年物业费缴纳通知',
                content: '尊敬的业主，2024年度物业费已开始征收，请于1月31日前完成缴纳，逾期将产生滞纳金。',
                type: 'notice',
                status: 'published',
                createTime: '2024-01-10 09:00',
                publishTime: '2024-01-10 10:00'
            },
            {
                id: '2',
                title: '春节联欢活动邀请',
                content: '为丰富社区文化生活，物业将于1月28日举办春节联欢活动，欢迎各位业主携家人参加。',
                type: 'activity',
                status: 'published',
                createTime: '2024-01-12 14:30',
                publishTime: '2024-01-12 15:00'
            },
            {
                id: '3',
                title: '临时停水通知',
                content: '因市政管网维修，1月16日8:00-18:00将停水，请各位业主提前做好储水准备。',
                type: 'urgent',
                status: 'published',
                createTime: '2024-01-15 08:00',
                publishTime: '2024-01-15 08:00'
            }
        ];
    }
    async findAll(status) {
        let result = this.notices;
        if (status) {
            result = this.notices.filter(n => n.status === status);
        }
        return {
            code: 200,
            msg: 'success',
            data: result
        };
    }
    async create(body) {
        const newNotice = {
            id: String(this.notices.length + 1),
            title: body.title,
            content: body.content,
            type: body.type,
            status: body.status,
            createTime: new Date().toLocaleString('zh-CN'),
            publishTime: body.status === 'published' ? new Date().toLocaleString('zh-CN') : undefined
        };
        this.notices.unshift(newNotice);
        return { code: 200, msg: '发布成功' };
    }
};
exports.NoticeService = NoticeService;
exports.NoticeService = NoticeService = __decorate([
    (0, common_1.Injectable)()
], NoticeService);
//# sourceMappingURL=notice.service.js.map