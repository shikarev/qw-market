import classNames from "classnames/bind";
import styles from "./radioRatingFilter.module.scss";
import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import RatingStars from "../../../RatingStars";
import {IFilterFunc, ISearchFilterField} from "../../../../types/Filters";
import {useAppDispatch} from "../../../../store/hooks";
import {addGreaterField, removeFilter} from "../../../../store/searchFilter";
import {QRadio, QFormControlLabel} from "../../../common/Controls";
import cuid from "cuid";
import {toInteger} from "lodash";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

const RadioRating = ({value, name}: { value: any, name: string }) => {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('rrTitle')}>От</span>
            <RatingStars num={value} name={name} readOnly />
        </div>
    )
}

const RadioRatingFilter = ({data, optionId, selected}:IFilterFunc) => {
    const dispatch = useAppDispatch();

    const onCheck = (event: React.ChangeEvent<HTMLInputElement>, id: string, num: number) => {
        if (event.target.checked && num > 0) {
            dispatch(addGreaterField({ id: optionId, value: num, value_id: id}));
        } else {
            dispatch(removeFilter(optionId));
        }
    }
    const checked = selected.find((field:ISearchFilterField) => field.id === optionId);

    if(!data){
        return null;
    }

    return (

        <FormControl component="fieldset">
            {data[0] && <RadioGroup>
                <QFormControlLabel
                    label={<Typography>Любой</Typography>}
                    control={
                        <QRadio color="primary"
                                checked={(!checked?.id)}
                                onChange={(event) => onCheck(event, data[0].id, 0)}
                        />}
                />
                {[...Array(4)].map((item, index) =>
                    <QFormControlLabel
                        key={cuid()}
                        label={<RadioRating name={'rating'} value={index + 1}/>}
                        control={
                            <QRadio color="primary"
                                    checked={toInteger(checked?.value) === (index + 1)}
                                    onChange={(event) => onCheck(event, data[0].id, index + 1)}
                            />}
                    />
                )}
            </RadioGroup>
            }
        </FormControl>
    );
}

export default RadioRatingFilter;