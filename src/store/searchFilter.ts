import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '.';
import {ISearchFilterField} from '../types/Filters';

// Define a type for the slice state

interface ISearchFilter {
    fields: ISearchFilterField[]
}

// Define the initial state using that type
const initialState: ISearchFilter = {
    fields: []
}

const getField = (name: string, curr: any[]) => {
    let field = curr.find(item => item.startsWith(name))
    if(field) {
        field = field.replace(name,'');
    }
    return field
}

export const searchFilterSlice = createSlice({
    name: 'searchFilter',
    initialState,
    reducers: {
        addField: (state, action) => {
            const newField = state.fields.find(field => field.id === action.payload.id)
            if (newField) {
                newField.value_id?.push(action.payload.value_id);
            } else {
                state.fields = [...state.fields, {id: action.payload.id, value_id: [action.payload.value_id]}];
            }
        },
        addBetweenField: (state, action) => {
            const newField = state.fields.find(field => field.id === action.payload.id)
            if (newField) {
                if (action.payload.value_id) {
                    newField.value_id = [action.payload.value_id];
                }
                newField.from = action.payload.from;
                newField.to = action.payload.to;
            } else {
                state.fields = [...state.fields,
                    {
                        value_id: [action.payload.value_id],
                        id: action.payload.id,
                        from: action.payload.from,
                        to: action.payload.to,
                        operation: 'between'
                    }];
            }
        },
        addGreaterField: (state, action) => {
            const newField = state.fields.find(field => field.id === action.payload.id)
            if (newField) {
                newField.value = action.payload.value;
            } else {
                state.fields = [...state.fields,
                    {
                        id: action.payload.id,
                        value: action.payload.value,
                        operation: 'greater'
                    }];
            }
        },
        addExclusiveField: (state, action: PayloadAction<{ id: string, value_id: string }>) => {
            const newField = state.fields.findIndex(field => field.id === action.payload.id)
            if (newField >= 0) {
                state.fields[newField].value_id = [action.payload.value_id];
            } else {
                state.fields = [...state.fields, {id: action.payload.id, value_id: [action.payload.value_id]}];
            }
        },
        removeFilter: (state, action) => {
            state.fields = state.fields.filter(field => field.id !== action.payload)
        },
        removeField: (state, action) => {
            const fieldToRemoveIndex = state.fields.findIndex(field => field.id === action.payload.id);
            //@ts-ignore
            if (fieldToRemoveIndex >= 0 && state.fields[fieldToRemoveIndex].value_id &&  state.fields[fieldToRemoveIndex].value_id.length <= 1) {
                state.fields = state.fields.filter(field => !(field.id === action.payload.id))
            } else {
                //@ts-ignore
                state.fields[fieldToRemoveIndex].value_id = state.fields[fieldToRemoveIndex].value_id.filter(field => field !== action.payload.value_id)
            }
        },
        clearFields: (state) => {
            state.fields = []
        },
        setFilterFromUrl: (state, action) => {
            // split url params
            const filtersFromUrl = action.payload.split('_').filter((x: string) => x);
            // id id=
            // value_id vi=
            // value v=1
            // from f=
            // to t=
            // operation o=
            // split params values array
            const prepareFilters = filtersFromUrl.map((filter: string) => filter.split(','))

            // create filters array
            const parsedFilters = prepareFilters.reduce((acc: ISearchFilterField[], curr: string[]) => {
                const filterId = getField('id=', curr);
                if(!filterId){
                    return null
                }
                let filterValuesId = undefined;
                let filterValuesIdString = getField('vi=', curr);
                if(filterValuesIdString){
                    filterValuesId = filterValuesIdString.split('.')
                }
                const filterValue = getField('v=', curr);
                const filterFrom = getField('f=', curr);
                const filterTo = getField('t=', curr);
                const filterOperation = getField('o=', curr);

                let filter = {
                    id: filterId,
                    value_id: filterValuesId,
                    value: filterValue,
                    from: parseInt(filterFrom),
                    to: parseInt(filterTo),
                    operation: filterOperation
                };
                return [...acc || [], filter]
            }, [])
            state.fields = parsedFilters ?? []
        }
    },
})

export const {
    addField,
    addBetweenField,
    addExclusiveField,
    removeField,
    setFilterFromUrl,
    clearFields,
    removeFilter,
    addGreaterField,
} = searchFilterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSearchFields = (state: RootState) => state.searchFilter.fields

export default searchFilterSlice