import {ISearchQuery, ListRquest} from "./index";

export interface IManufacturer {
    id: string;
    name: string;
    description?: string;
    picturePath?: string;
    site?: string;
}

export interface ISearchManufacturersQuery extends ListRquest {
    query?: string;
    categoryId?: string;
    status?: string;
}