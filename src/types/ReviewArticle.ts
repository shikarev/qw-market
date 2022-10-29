export interface IReviewArticleData{
    data: IReviewArticle[],
    total: number,
    "page-count": number
}

export interface IReviewArticle {
    main?: boolean,
    profile_image?: string,
    author_name: string,
    description: string,
    id?: string,
    status: string,
    order_by: number,
    image?: IReviewArticleImage[],
    view_count: number

}
export interface IReviewArticleImage {
    image: string,
    id: string,
    status: string,
}