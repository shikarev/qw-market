import styles from "./labelSwitch.module.scss"
import classNames from "classnames/bind";
import React from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {addField, removeField} from "../../../../store/searchFilter";
import {QQuestion} from "../../../common/Tooltips";
import {ISearchFilterField, ISingleFilterFunc} from "../../../../types/Filters";
import {QFormControlLabel} from "../../../common/Controls";
import { Switch } from '@qwangy/styles';

const cx = classNames.bind(styles);

const LabelSwitch = ({ data,optionId,selected }:ISingleFilterFunc) => {
    const dispatch = useAppDispatch();

    if(!data){
        return null;
    }

    const checked = !!selected.find((field: ISearchFilterField) =>
        field.id === optionId && field?.value_id?.includes(data.id));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(addField({id: optionId, value_id: data.id}));
        } else {
            dispatch(removeField({id: optionId, value_id: data.id}));
        }
    };

    return (
        <div className={cx('container')}>
            <QFormControlLabel
                control={<Switch checked={checked} onChange={handleChange} name="checked"/>}
                label={<>
                    {data.name}
                    {data.description &&
                    <QQuestion description={data.description}/>}
                </>}
                labelPlacement="start"
            />
        </div>
    )
}

export default LabelSwitch;
