import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        code: number;
        msg: string;
        data: null;
    } | {
        code: number;
        msg: string;
        data: {
            token: string;
            admin: {
                id: string;
                username: string;
                role: string;
                name: string;
            };
        };
    }>;
}
