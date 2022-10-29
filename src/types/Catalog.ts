export interface ICatalogCategory{
    id: string,
    name: string,
    status?: string,
    parent_id?: string,
    picture_path?: string,
    sub_categories?: ICatalogCategory[]
}

export interface ISubCategory {
    parent: string,
    name: string,
    path: string,
    onSubCategorySelect: () => void
}

export interface ICategory{
    items: ICatalogCategory[],
    name: string,
    path: string,
    small?: boolean,
    onCategorySelect: ICategoryClickFunction,
    onSubCategorySelect: ISubCategoryClickFunction,
}

export interface IColumnItem {
    id: string,
    name: string,
    path: string
}

export interface ISectionColumn {
    small?: boolean,
    data: ICatalogCategory[],
    onCategorySelect: ICategoryClickFunction,
    onSubCategorySelect: ISubCategoryClickFunction,
}

export interface ISection {
    sectionId: string,
    small?: boolean,
    onCategorySelect: ICategoryClickFunction,
    onSubCategorySelect: ISubCategoryClickFunction,
}

type ISubCategoryClickFunction = (id:string, parent_id:string) => void;
type ICategoryClickFunction = (id:string) => void;
