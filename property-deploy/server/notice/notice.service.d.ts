export interface Notice {
    id: string;
    title: string;
    content: string;
    type: 'notice' | 'activity' | 'urgent';
    status: 'draft' | 'published';
    createTime: string;
    publishTime?: string;
}
export declare class NoticeService {
    private notices;
    findAll(status?: string): Promise<{
        code: number;
        msg: string;
        data: Notice[];
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
