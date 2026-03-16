import { NoticeService } from './notice.service';
export declare class NoticeController {
    private readonly noticeService;
    constructor(noticeService: NoticeService);
    getList(query: {
        status?: string;
    }): Promise<{
        code: number;
        msg: string;
        data: import("./notice.service").Notice[];
    }>;
    create(body: {
        title: string;
        content: string;
        type: string;
        status: string;
    }): Promise<{
        code: number;
        msg: string;
    }>;
}
