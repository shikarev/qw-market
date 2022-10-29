import React, {useEffect, useState} from 'react';
import {ArrowDown} from "../../svgComponents/Icons";
import {InputBase, NativeSelect, styled} from "@mui/material";

import styles from './DropDown.module.scss';
import classNames from "classnames/bind";


const cx = classNames.bind(styles);

const BootstrapInput = styled(InputBase)(({theme}) =>
    ({
        minWidth: '30rem',
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: '3.2rem',
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #ced4da',
            fontSize: 16,
            fontWeight: 600,
            padding: '1.8rem 2.4rem',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'inherit'
            ].join(','),
            '&:focus': {
                borderRadius: '3.2rem',
                backgroundColor: 'white',
                borderColor: '#EB4F5AFF',
                //boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
        '& .MuiNativeSelect-icon': {
            top: 'auto',
            right: '2rem',
        }
    }),
);

const QwSelect = styled(NativeSelect)(({theme}) => ({
    select: {
        color: theme.palette.primary.main,
    },
}))

interface IDropDown {
    onChange?: (props?: any) => void;
    values: any[];
}

const DropDown = (props: IDropDown) => {
    const [value, setValue] = useState('');

    function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        setValue(event.target.value as string);
        if (!!props.onChange) {
            props.onChange(event.target.value);
        }
    }

    return (
        <div className={cx('selector')}>
            <QwSelect
                id="select-native"
                // value={value}
                onChange={(e) => handleChange(e)}
                input={<BootstrapInput/>}
                IconComponent={ArrowDown}
            >
                {props.values.map((option: any, index: number) =>
                  <option key={index} value={option.value} className={cx('black')}>{option.title}</option>)}
            </QwSelect>
        </div>
    );
};

export default DropDown;