export interface Repair {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'processing' | 'completed';
    userName: string;
    userPhone: string;
    address: string;
    createTime: string;
    remark?: string;
}
export declare class RepairService {
    private repairs;
    findAll(status?: string): Promise<{
        code: number;
        msg: string;
        data: Repair[];
    }>;
    findOne(id: string): Promise<{
        code: number;
        msg: string;
        data: Repair | null;
    }>;
    updateStatus(id: string, status: string, remark?: string): Promise<{
        code: number;
        msg: string;
    }>;
}
