export declare class DashboardService {
    getStats(): Promise<{
        code: number;
        msg: string;
        data: {
            pendingRepairs: number;
            monthIncome: number;
            pendingNotices: number;
            totalUsers: number;
            recentRepairs: {
                id: string;
                title: string;
                status: string;
                createTime: string;
            }[];
        };
    }>;
}
