import {array} from "yup";

export interface IProductReviews {
    id: string,
    user_id: string,
    user_name?: string,
    experience?: string,
    rate?: number,
    advantage?: string,
    disadvantage?: string,
    note?: string,
    created?: string,
    like_count?: number,
    media?: IReviewMedia,
    dislike_count?: number,
    comments_count?: number,
    vendor_id?: string,
    user_is_reacted?: number,
    productId?: string,
    productData?: any,
    user_picture_path?: string,
    anonymous?: boolean,
}

export interface IReviewMedia {
    image?: any,
    video?: any,
}

export interface IFeedback {
    id: string,
    product_id: string,
    vendor_id: string,
    user_id: string,
    user_name?: string,
    experience?: string,
    rate?: number,
    advantage?: string,
    disadvantage?: string,
    note?: string,
    notes?: INotes[],
}

export interface ICreateFeedback {
    rate: number,
    experience: string,
    advantage: string,
    disadvantage: string,
    note: string,
    product?: any,
    vendor?: any,
    anonymous: boolean,
}

export interface ICreateNote {
    note: string,
    feedback: string,
}

export interface ICreateNoteParent {
    note: string,
    feedback: string,
    parent: string,
}

export interface IFeedbackLike {
    rate: number,
}

export interface INotes {
    user_id: string,
    user_name: string,
    note: string,
    notes?: IFeedbackNotes[],
    media?: IFeedbackMedia[],
    //feedbackNotes?: any,
}

export interface IFeedbackNotes {
    id: string,
    user_id: string,
    user_name: string,
    note: string,
    like_count?: number,
    dislike_count?: number,
    user_is_reacted: number,
    feedbackId?: string,
    parentId?: string,
    comments_count: number,
    authorName?: string,
    answerName?: string,
    user_picture_path?: string,
    created?: string,
    commentsCount?: any,
    setCommentsCount?: any,
    comments?: any,
    setComments?: any,
    setNotesComments?: any,
    notesComments?: any,
}

export interface IFeedbackMedia {
    path: string,
    description: string,
}

export interface IFeedbacksMedia {
    id: string,
    status: string,
    order_by: number,
    image: [],
}
