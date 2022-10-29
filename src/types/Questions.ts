export interface IQuestionsReviews {
    id: string,
    author_id?: string,
    author_name?: string,
    note?: string,
    created?: string,
    like_count?: number,
    dislike_count?: number,
    user_picture_path?: string,
    user_is_reacted?: number,
}

export interface ICreateQuestion {
    note: string,
    product?: string,
    vendor: string,
    status: string,
}
