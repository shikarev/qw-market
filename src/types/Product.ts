import { IProductVendor, IVendorDelivery, IVendorPayment } from "./Vendor";

export interface IProductData {
  id: string;
  categoryId?: string;
  code?: string;
  name: string;
  description?: string;
  cost: number;
  oldCost: number;
  points: number;
  rating: number;
  minCost?: number;
  modStr?: string;
  feedbackCount?: number;
  purchaseCount?: number;
  mainOptions?: IMainOptions[];
  modificationOptions?: IModificationOptions[];
  picturePath?: string;
  vendor?: IProductVendor;
  vendorPayments?: IVendorPayment[];
  vendorDeliveries?: IVendorDelivery[];
  manufacturer?: any;
  manufacturePlace?: string;
  inFavorite?: number;
  inWish?: number;
  inCart?: number;
  questionCount?: number;
  currencyId?: string;
  currencyName?: string;
  currencyShortName?: string;
  priceId: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  cost: number;
  priceId?: string;
  productId?: string;
  oldCost?: number;
  points?: number;
  rating?: number;
  feedbackCount?: number;
  picturePath?: string;
  currencyId?: string;
  currencyName?: string;
  inCart?: number;
  inFavorite?: number;
  inWish?: number;
  FavoritesToggle?: React.ReactChild;
  WishesToggle?: React.ReactChild;
  CartButton?: React.ReactChild;
  onClick?: (id: string) => void;
}

export interface IMainOptions {
  id: string;
  name: string;
  description: string;
  type: string;
  value: string;
}

export interface IProductCard {
  id: string;
  name: string;
  vendor: IProductVendor;
  cost: number;
  oldCost: number;
  points: number;
  rating: number;
  feedbackCount: number;
  picturePath: string;
  currencyId: string;
  currencyName: string;
  currencyShortName: string;
}

export interface IFeedbackCard {
  avatarUrl: string;
  firstname: string;
  lastname: string;
  rating: number;
  review: IReview[];
  reply?: IReply[];
}

export interface IReviewFilter {
  id: number;
  rating: number;
  reviews: number;
}

export interface IRateProgress {
  id: number;
  title: string;
  rate: number;
}

export interface IMediaViewer {
  mediaUrl?: string;
  mediaType?: string;
  changeSlide: (num: number) => void;
  //handleClose: () => void,
}

export interface IProductViewer {
  mediaUrl: string;
  mediaType: MediaTypes;
  discount: number;
  changeSlide: (num: number) => void;
}

export enum MediaTypes {
  "img",
  "video",
  "3d",
}

export interface IMediaSelector {
  refObj: any;
  thumbUrl?: string;
  mediaType?: string;
  selectedId: number;
  id: number;
  onSelect: (id: number) => void;
}

export interface IMediaThumb {
  refObj: any;
  thumbUrl: string;
  mediaType: MediaTypes;
  selectedId: number;
  id: number;
  onSelect: (id: number) => void;
}

export interface ISelector {
  data: any[];
  size: number;
  onChange: (num: number) => void;
}

export interface ISpec {
  title: string;
  value: string | number;
  question?: string | undefined;
}

export interface ISpecs {
  desc?: string;
  manuf?: string;
  optionsData: any[];
  productId: string;
}

export interface ISmallCard {
  id: string;
  mediaUrl: string;
  bonuses: number;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  feedback_count: number;
}

export interface IOrderDetails {
  productId?: string;
  cost: number;
  oldCost: number;
  currency?: string;
  minCost?: number;
  //selectorData: any,
  points?: number | null;
  vendorName?: string;
  vendorRating?: number;
  vendorFeedback?: number;
  vendorPayment?: IVendorPayment[];
  vendorDelivery?: IVendorDelivery[];
  offersCount: number;
  priceId?: string;
  isFetching?: any;
  productMod?: any;
}

export interface IProductDescription {
  rating: number | null;
  points?: number | null;
  purchaseCount?: number;
  productId?: string;
}

export enum currency {
  "RUR",
  "EUR",
  "USD",
}

export interface IReview {
  id: number;
  title?: string;
  message?: string;
}

export interface IReply {
  id: number;
  avatarUrl: string;
  firstname: string;
  lastname: string;
  rating?: number;
  message: string;
}

export interface ICategoryPath {
  id: string;
  name: string;
  sub_category?: ICategoryPath;
}

export interface IProductSpecs {
  option_group_id: string;
  option_group_name: string;
  product_options: IProductOptions[];
}

export interface IProductOptions {
  id: string;
  option_id: string;
  option_name: string;
  option_type: string;
  option_value: string;
  option_description?: string;
}

export interface IOffersData {
  productId: string;
  productName: string;
  vendorData?: any;
  pagination?: any;
  pageCount?: number;
  currency?: string;
  page?: any;
}

export interface IReviewsData {
  productId: string;
  pagination: any;
  pageCount?: number;
  page?: any;
  setRates?: (rates: number[]) => void;
  rates: number[];
}

/*export interface IReviewsData {
    productId: string,
    productCost: number,
    productName: string,
    productRating: number,
    productPurchase: number,
    productPoints: number,
    productFavorites: number,
    productQuestions: number,
    vendorData: any,
}

export interface IReviewsData {
    productId: string,
    productCost: number,
    productName: string,
    productRating: number,
    productPurchase: number,
    productPoints: number,
    productFavorites: number,
    productQuestions: number,
    vendorData: any,
}*/

export interface IProductMedia {
  id: string;
  mod_str?: string;
  image?: string;
  type?: string;
  status?: string;
  order_by?: 0;
}

export interface IProductModOptions {
  id: string;
  name?: string;
  type?: string;
  searchable?: number;
  values: IOptionsValue[];
  modStr: string;
  objModOptions?: any;
}

export interface IOptionsValue {
  modification_option_id: string;
  id: string;
  name?: string;
  description?: string;
  modification_option_media_path?: string;
}

export interface IModificationOptions {
  designType: string;
  name: string;
  optionId: string;
  optionValueId: string;
  orderBy: number;
  value: string;
}

export interface IQuestionsData {
  vendorId?: string;
  questionsData?: any;
  pagination: any;
  pageCount?: number;
  page?: any;
  setRates?: (rates: number[]) => void;
  rates: number[];
}
