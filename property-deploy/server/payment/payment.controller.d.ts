import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    getList(query: {
        status?: string;
    }): Promise<{
        code: number;
        msg: string;
        data: import("./payment.service").Payment[];
    }>;
}
