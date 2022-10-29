import classNames from "classnames/bind";
import styles from "./colorSelect.module.scss";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {useAppDispatch} from "../../../../store/hooks";
import {addField, removeField} from "../../../../store/searchFilter";
import {IFilterFunc, ISearchFilterField} from "../../../../types/Filters";
import {CheckLight} from "../../../svgComponents/Icons/outlined";

const cx = classNames.bind(styles);

// temp ->
const getColor = (str: string, pos: number) => {
    let c = str.substring(pos, pos + 2) ? `${parseInt(str.substring(0, 2)) * 2.5}` : '00';
    return c;
}

let stringToColor = function (str: string | undefined) {
    if (!str) {
        return '#000000';
    }
    if (str.startsWith('#')) {
        return str;
    }
    return `rgb(${getColor(str, 0)},${getColor(str, 2)},${getColor(str, 4)})`;
}
// <- temp

const ColorSelect = ({data, optionId, selected, search}: IFilterFunc) => {
    const dispatch = useAppDispatch();

    const onCheck = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (event.target.checked) {
            dispatch(addField({id: optionId, value_id: id}))
        } else {
            dispatch(removeField({id: optionId, value_id: id}))
        }
    }

    const checked = selected.find((field: ISearchFilterField) => field.id === optionId) || {value_id: ['']};

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {data && data.map((item, index) => (
                    <div key={index} className={cx('ColorChooser')} style={{backgroundColor: `#${item.description}`}}>
                        <Checkbox
                            disableRipple
                            inputProps={{"aria-label": "decorative checkbox"}}
                            icon={<span className={cx('icon')}/>}
                            checkedIcon={<span className={cx('icon','icon-checked')}><CheckLight/></span>}
                            checked={checked.value_id?.includes(item.id)}
                            onChange={(event) => onCheck(event, item.id)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ColorSelect;