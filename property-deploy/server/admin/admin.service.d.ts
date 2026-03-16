export declare class AdminService {
    private admins;
    login(username: string, password: string): Promise<{
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
