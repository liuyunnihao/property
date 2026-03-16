export interface User {
    id: string;
    name: string;
    phone: string;
    roomNumber: string;
    building: string;
    unit: string;
    checkInDate: string;
    status: 'active' | 'inactive';
}
export declare class UserService {
    private users;
    findAll(keyword?: string): Promise<{
        code: number;
        msg: string;
        data: User[];
    }>;
}
