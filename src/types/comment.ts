export interface IComment {
    _id?: string;
    userId: any;
    content: string;
    dateTime: number;
    like: string[];
    songId: string;
}