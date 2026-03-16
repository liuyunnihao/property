import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
