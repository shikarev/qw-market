export enum FilterDesign {
    'DEFAULT',
    'RANGE',
    'CHECKBOX_SINGLE',
    'SWITCH_SINGLE',
    'CHECKBOX_GROUP',
    'CHECKBOX_GROUP_SEARCH',
    'RADIO_GROUP',
    'RADIO_GROUP_RATING',
    'DROP_DOWN',
    'COLOR_PICKER'
}

export interface IFilterFunc {
    data?: ISearchFilterField[],
    optionId?: string,
    selected: ISearchFilterField[],
    search?: boolean
}
export interface ISingleFilterFunc {
    data?: ISearchFilterField,
    optionId?: string,
    selected: ISearchFilterField[],
    search?: boolean
}

export interface ISearchFilterField{
    id: string,
    value_id?: string[],
    value?: string | number,
    from?: number,
    to?: number,
    operation?: string,
    description?: string,
    name?: string,
}
  
export interface IOption {
    id: string,
    name?: string,
    designType?: FilterDesign,
    optionValues?: ISearchFilterField[]
}

export interface IOptions {
    options: IOption[]
}