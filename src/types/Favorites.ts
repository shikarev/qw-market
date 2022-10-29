import { IProductData, ProductCardProps } from './Product';

export interface IFavorite{
    id: string,
    name: string
}

export interface IFavoriteCategory{
    data: IFavorite[]
}

export interface IFavoriteProduct{
    id: string,
    product: ProductCardProps
    quantity?: number
    status?: string
}

export interface IFavoriteProducts{
    data: Array<{
        id: string,
        product: IProductData
    }>
    total: number
}
