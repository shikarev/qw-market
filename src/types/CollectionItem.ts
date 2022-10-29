export interface CollectionItem {
    title: string;
    itemImg: string;
    likeIcon: string;
    likeIconFilled: string;
    likeCount: number;
};

export interface CollectionProducts{
    id: string;
    category_id?: string;
    name: string;
    vendor_id: string;
    cost: number;
    old_cost: number;
    points: number;
    rating: number;
    feedback_count: number;
    picturePath: string;
}