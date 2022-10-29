import React, {useEffect, useRef, useState} from 'react';
import styles from './DropDown.module.scss';
import classNames from "classnames/bind";
import {useAppDispatch} from "../../../../store/hooks";
import {addExclusiveField, removeFilter} from "../../../../store/searchFilter";
import {IFilterFunc, ISearchFilterField, } from "../../../../types/Filters";
import {ArrowDown} from "../../../svgComponents/Icons";
import {useOnClickOutside} from "../../../../utils/hooks";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);



function DropDown({data, selected, optionId}: IFilterFunc) {
    const [folded, setFolded] = useState(true);
    const [name,setName] = useState<string | undefined>(undefined);

    const dispatch = useAppDispatch();
    const dropList = useRef(null);

    function handleOpen() {
        setFolded(!folded)
    }

    const onCheck = (id: string) => {
        if(optionId){
            dispatch(addExclusiveField({id: optionId, value_id: id}))
        }
    }

    const deselect = () => {
        dispatch(removeFilter(optionId))
    }
    const checked = selected.find((field: ISearchFilterField) => field.id === optionId);

    useEffect( () => {
        if (checked) {
            //@ts-ignore
            const name = (checked.value_id && checked.value_id.length > 0 ) ? data.find(item => item.id === checked.value_id[0]) : 0;
            if(name){
                setName(name.name);
            } else {
                setName(undefined);
            }
        } else {
            setName(undefined);
        }
        //eslint-disable-next-line
    }, [selected])


    useOnClickOutside(dropList, () => {setFolded(true)})

    return (
        <div onClick={() => handleOpen()} className={cx('head')}>
            <div className={cx('selected', name && 'active')}>
                {name ? name : 'Выберите'}
            </div>
            <div className={cx('arrow-down', !folded && 'arrow-up')}><ArrowDown/></div>
            <div ref={dropList} className={cx('items', folded && 'show')}>
                <Typography onClick={() => deselect()}>Не выбрано</Typography>
                {data && data.map(item => <Typography key={item.id} className={cx(checked?.value_id?.includes(item.id) ? 'bold' : '')}
                                     onClick={() => onCheck(item.id)}>{item.name}</Typography>)}
            </div>
        </div>
    );
}

export default DropDown;