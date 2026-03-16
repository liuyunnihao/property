import { RepairService } from './repair.service';
export declare class RepairController {
    private readonly repairService;
    constructor(repairService: RepairService);
    getList(query: {
        status?: string;
    }): Promise<{
        code: number;
        msg: string;
        data: import("./repair.service").Repair[];
    }>;
    getDetail(id: string): Promise<{
        code: number;
        msg: string;
        data: import("./repair.service").Repair | null;
    }>;
    updateStatus(id: string, body: {
        status: string;
        remark?: string;
    }): Promise<{
        code: number;
        msg: string;
    }>;
}
