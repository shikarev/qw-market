export interface PromotionResponse {
  id?: string
  description?: string
  startDate?: string
  endDate?: string
  name?: string
  type?: string
  orderBy?: number
  image?: string[]
  video?: string[]
  viewCount?: number
}

export interface IPromotion {
    id?: string,
    name?: string,
    type?: string,
    image?: string,
    video?: string,
    description?: string,
    view_count?: number,
}
