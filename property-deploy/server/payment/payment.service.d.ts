export interface Payment {
    id: string;
    userName: string;
    roomNumber: string;
    amount: number;
    type: 'property' | 'water' | 'electricity' | 'parking';
    status: 'unpaid' | 'paid';
    dueDate: string;
    paidDate?: string;
}
export declare class PaymentService {
    private payments;
    findAll(status?: string): Promise<{
        code: number;
        msg: string;
        data: Payment[];
    }>;
}
