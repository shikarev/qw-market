import React from 'react';
import { ExpanderRadioGroup} from "../../../Expander";
import {IFilterFunc, ISearchFilterField} from "../../../../types/Filters";
import {useAppDispatch} from "../../../../store/hooks";
import {addExclusiveField, removeField} from "../../../../store/searchFilter";
import {QRadio, QFormControlLabel} from "../../../common/Controls";

const RadioGroupFilter = ({data, optionId, selected}:IFilterFunc) => {
    const dispatch = useAppDispatch();

    const onCheck = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if(optionId) {
            if (event.target.checked) {
                dispatch(addExclusiveField({id: optionId, value_id: id}))
            } else {
                dispatch(removeField({id: optionId, value_id: id}))
            }
        }
    }

    const checked = selected.find((field:ISearchFilterField) => field.id === optionId) || {value_id: ['']};

    return (
        <ExpanderRadioGroup showCount={3}>
            {data && data.map((item) =>
                <QFormControlLabel key={item.id} control={
                    <QRadio color="primary" checked={checked?.value_id?.includes(item.id)}
                    onChange={(event) => onCheck(event, item.id)}/>
                }
                label={item.name ?? ''}
                value={item.value_id} />
            )}
        </ExpanderRadioGroup>
    );
}

export default RadioGroupFilter;