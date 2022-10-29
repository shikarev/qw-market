import {Language} from './Language';
import {UserAction} from './UserActions';
import {Section} from "./Section";
import {Route} from "./Route";
import {CollectionItem} from "./CollectionItem";

export type {
    Route,
    Language,
    UserAction,
    Section,
    CollectionItem
}

export interface ListResponse<T> {
    data: Array<T>;
    'page-count': number;
    total: number;
}

export interface FormattedListResponse<T> {
    data: Array<T>;
    pageCount: number;
    total: number;
}

export interface ListRquest {
    limit?: number;
    page?: number;
}

export interface ISearchQuery extends ListRquest {
    query: string;
}

export interface FormatedListResponse<T> {
    data: Array<T>;
    pageCount: number;
    total: number;
}


export interface RequestError {
    status: number;
    data: {
        code: number;
        message: string;
    }
}
