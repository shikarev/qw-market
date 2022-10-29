export interface IReviewsArticles {
  id: string,
  description: string,
  likeCount: number,
  dislikeCount: number,
  viewCount: number,
  created: string,
  status: string,
  authorId: string,
  authorName: string,
  authorPicturePath: string,
  productId: string,
  categoryId: string,
  sectionId: string,
  collectionId: string,
  manufacturerId: string,
  image: string[],
}

export interface IReviewsArticlesImage {
    image: string,
    id: string,
    status: string,
}
