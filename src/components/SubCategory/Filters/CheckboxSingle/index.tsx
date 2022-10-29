import React from "react";
import classNames from "classnames/bind";
import styles from "./CheckboxSingle.module.scss";
import { useAppDispatch } from "../../../../store/hooks";
import {addExclusiveField,  removeField} from "../../../../store/searchFilter";
import {QQuestion} from "../../../common/Tooltips";
import {IFilterFunc, ISearchFilterField} from "../../../../types/Filters";
import {QCheckbox, QFormControlLabel} from "../../../common/Controls";

const cx = classNames.bind(styles);

const CheckboxSingle = ({ data,optionId,selected,search }:IFilterFunc) => {
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
    if(!data){
        return  null;
    }
    const filter = data[0];

    return (
        <div className={cx('wrapper')}>
            {filter &&
            <div key={filter.id}>
                <QFormControlLabel
                    control={
                        <QCheckbox color="primary" name={filter.name}
                                        checked={checked.value_id?.includes(filter.id)}
                                        onChange={(event) => onCheck(event, filter.id)}/>
                    }
                    label={filter.name ?? ''}
                />
                {filter.description &&
                <QQuestion description={filter.description}/>
                }
            </div>
            }
        </div>
    )
}

export default CheckboxSingle;
