import { Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./сheckboxGroup.module.scss";
import {SearchIcon} from "../../../svgComponents/Icons/outlined";
import { ExpanderFormGroup} from "../../../Expander";
import { useAppDispatch } from "../../../../store/hooks";
import { addField, removeField } from "../../../../store/searchFilter";
import {QQuestion} from "../../../common/Tooltips";
import {IFilterFunc, ISearchFilterField} from "../../../../types/Filters";
import {QTextField, QCheckbox, QFormControlLabel} from "../../../common/Controls";

const cx = classNames.bind(styles);

const CheckboxGroup = ({ data,optionId,selected,search }:IFilterFunc) => {
    const [searchString, setSearchString] = useState('');

    const dispatch = useAppDispatch();

    const onCheck = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (event.target.checked) {
            dispatch(addField({ id: optionId, value_id: id }))
        } else {
            dispatch(removeField({ id: optionId, value_id: id }))
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    }

    const checked = selected.find((field:ISearchFilterField) => field.id === optionId) || {value_id: ['']};


    return (
        <div className={cx('wrapper')}>
            {search &&
                <div className={cx('search')}>
                    <QTextField
                        id="outlined-search"
                        variant="outlined"
                        value={searchString}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            }

            <ExpanderFormGroup showCount={3}>
                {data && data.filter(item => item.name?.includes(searchString)).map((item: any) =>
                    <div key={item.id} className={cx('row')}>
                        <QFormControlLabel
                            control={
                                <QCheckbox color="primary" name={item.name}
                                    checked={checked.value_id?.includes(item.id)}
                                    onChange={(event) => onCheck(event, item.id)} />
                            }
                            label={item.name}
                        />
                        {item.description &&
                          <div className={cx('question')}>
                            <QQuestion description={item.description}/>
                          </div>
                        }
                    </div>
                )}
            </ExpanderFormGroup>

        </div>
    )
}

export default CheckboxGroup;
