
export enum WallTypes {
  promotion = "promotion",
  product = "product",
  news = "news",
  review = "review",
}

export interface Media {
    id: string,
    type: "picture",
    status: "active",
    orderBy: number,
    image: string,
}

export interface BaseWallCard {
    id: string,
    type: WallTypes,
    created: string,
    name: string,
    description?: string,
    vendorName: string,
    vendorMediaPath?: string,
    mediaPath?: string,
    vendorId: string,
    url: string,
    media: Media
}
