export interface IPodcast {
    id: string;
    name?: string;
    orderBy?:number;
    description?: string;
    startDate?: string;
    duration?: number;
    authorId?: string;
    authorName?: string;
    authorPicturePath?: string;
    viewCount?: number;
    image?: string;
    video?: string;
}