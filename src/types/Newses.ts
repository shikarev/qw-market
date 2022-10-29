export interface INewses{
    imageSize?: number;
    vendorId?: string;
    categoryId?: string;
    productId?: string;
    sectionId?: string;
    collectionId?: string;
    manufacturerId?: string;
    status?: string;
    page?: string;
    limit?: string;
}

export interface INews {
    id: string;
    name?: string;
    description?: string;
    likeCount?: number,
    viewCount?: number,
    created?: string;
    status?: string;
    commentsCount?: number,
    authorId?: string;
    authorName?: string;
    authorPicturePath?: string;
    productId?: string;
    categoryId?: string;
    sectionId?: string;
    collectionId?: string;
    manufacturerId?: string;
    media?:any,
}
