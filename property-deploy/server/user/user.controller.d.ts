import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getList(query: {
        keyword?: string;
    }): Promise<{
        code: number;
        msg: string;
        data: import("./user.service").User[];
    }>;
}
