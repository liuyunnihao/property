"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor() {
        this.users = [
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
    }
    async findAll(keyword) {
        let result = this.users;
        if (keyword) {
            result = this.users.filter(u => u.name.includes(keyword) || u.roomNumber.includes(keyword));
        }
        return {
            code: 200,
            msg: 'success',
            data: result
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map