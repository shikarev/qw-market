import React from 'react';
import styles from './range.module.scss'
import TextField from '@mui/material/TextField';
import classNames from "classnames/bind";
import {IFilterFunc, ISearchFilterField} from "../../../../types/Filters";
import {useAppDispatch} from "../../../../store/hooks";
import {addBetweenField, removeFilter} from "../../../../store/searchFilter";
import {QRangeSlider} from "../../../common/Controls";
import {toInteger} from "lodash";
import {styled} from "@mui/material";

const cx = classNames.bind(styles);

const CssTextField = styled(TextField)({
    root: {
        margin: '.8rem',
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            fontSize: '1.4rem',
            lineHeight: '1.7rem',
            color: '#CACACA',
            borderRadius: '3.2rem',
            '& fieldset': {
                borderWidth: '.2rem',
            },
            '&:hover fieldset': {
                borderColor: '#EB4F5A',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#EB4F5A',
            },
            '& input': {
                padding: '1.6rem 2.4rem',
                color: '#1A202C',
            }
        },
    },
})

function valuetext(value: number) {
    return `${value} ₽`;
}

const Range = ({data, optionId, selected}:IFilterFunc) => {
    const dispatch = useAppDispatch();

    const checked = selected.find((field: ISearchFilterField) => field.id === optionId);
    const values = [toInteger(data && data[0] ? data[0].name  : 0), toInteger(data && data[1] ? data[1].name : 9999999)].sort((a, b) =>a-b);
    const [value, setValue] = React.useState<number[]>([checked?.from || values[0], checked?.to || values[1]]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleChangeCommit = () => {
        if( (values[0] === value[0] )&&( values[1] === value[1])){
            dispatch(removeFilter(optionId));
        } else {
            dispatch(addBetweenField({id: optionId, from: value[0], to: value[1] }));
        }
    }

    function minValueChecker (val: number) {
        let v = val
        if(val > value[1]){
            v = value[1]
        }
        if(val < values[0]){
           v = values[0]
        }
        setValue([v, value[1]])
        dispatch(addBetweenField({id: optionId, from: value[0], to: value[1] }))
    }

    function maxValueChecker (val: number) {
        let v = val
        if(val < value[0]){
            v = value[0]
        }
        if(val > values[1]){
            v = values[1]
        }
        setValue([value[0], v])
        dispatch(addBetweenField({id: optionId, from: value[0], to: value[1] }))
    }

    const handleMinInputChange = (event: any) => {
        setValue([event.target.value, value[1]])
    }

    const handleMaxInputChange = (event: any) => {
        setValue([value[0], event.target.value])
    }

    if(data && data?.length < 2){
        return null;
    }

    return(
        <div className={cx('wrapper')}>
            <div className={cx('inputGroup')}>
                <CssTextField
                    value={value[0]}
                    placeholder={'от ' + values[0]}
                    variant="outlined"
                    id="minValue"
                    onChange={(e) => handleMinInputChange(e)}
                    onBlur={(e) => minValueChecker(parseInt(e.target.value))}
                />
                <CssTextField
                    value={value[1]}
                    placeholder={'до ' + values[1]}
                    variant="outlined"
                    id="maxValue"
                    onChange={(e) => handleMaxInputChange(e)}
                    onBlur={(e) => maxValueChecker(parseInt(e.target.value))}
                />
            </div>
            <div className={cx('slider')}>
                <QRangeSlider
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={() => handleChangeCommit()}
                    min={values[0]}
                    max={values[1]}
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
            </div>
        </div>
    )
}

export default Range;