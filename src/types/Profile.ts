export interface IPayCard{
    cardName: string,
    cardExpires: string,
    cardHolder: string
}

export interface IProductData {
    description: string | null,
    manufacture_place: string | null,
    name: string | null,
    feedback_count: number | null,
    points: number | null,
    rating: number | null,
    purchase_count: number | null,
    cost: number,
    old_cost: number
}

export interface IProductCard {
    productId: string
}

export interface IFeedbackCard {
    avatarUrl: string,
    firstname: string,
    lastname: string,
    rating: number,
    message: string
}

export enum MediaTypes {
    'img',
    'video',
    '3d'
}

export interface IMediaThumb {
    refObj: any,
    thumbUrl: string,
    mediaType: MediaTypes,
    selectedId: number,
    id: number,
    onSelect: (id: number) => void
}

export interface IProductViewer {
    mediaUrl: string,
    mediaType: MediaTypes,
    discount: number,
    changeSlide: (num: number) => void
}

export interface ISelectorThumb {
    data: ISelectorItem,
    selectedId: number,
    onSelect: (id: number) => void,
    size: number
}

export interface ISelector {
    data: any[],
    size: number,
    onChange: (num: number) => void
}

export interface ISpec {
    title: string,
    value: string | number,
    question?: string | null
}

export interface ISpecs {
    desc: string | null
    manuf: string | null
}

export interface I {
    id: string,
    mediaUrl: string,
    bonuses: number,
    name: string,
    price: string,
    oldPrice: string,
    rating: number,
    feedback_count: number
}

export interface IOrderDetails {
    cost: number,
    oldCost: number,
    selectorData: any,
}

export enum currency {
    'RUR',
    'EUR',
    'USD'
}

export interface ISelectorItem {
    id: number,
    url: string,
    name?: string
}
