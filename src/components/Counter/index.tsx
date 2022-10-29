import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import {Box, Button, styled, Typography} from "@mui/material";
import {CountMinus, CountPlus} from "../svgComponents/Icons/outlined";
import CartButton from "../Cart/CartButton";

export type CounterArgs = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (e: React.MouseEvent, value: number) => void;
    className?: string;
    disabled?: boolean;
    bigSize?: boolean;
};

const cx = classNames.bind(styles);

const MyCounterButton = styled(Button)(({theme}) => ({
    root: {
        minWidth: 'auto',
    },
    text: {
        padding: '0.6rem',
        width: '2.8rem',
        height: '2.8rem',
        backgroundColor: '#F6F7FB',
    }

}))

/*const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);*/


const Counter = ({
                     min,
                     max,
                     step = 1,
                     onChange,
                     className,
                     value = 0,
                     disabled = false,
                     bigSize = false
                 }: CounterArgs) => {
    const [counterDisabled, setCounterDisabled] = useState(disabled);
    const [count, setCount] = useState(value);
    const classNames = [cx('counter'), 'app-counter-component'];
    //const classes = useStyles(styles);

    if (className) {
        classNames.push(className);
    }

    useEffect(() => {
        setCount(value);
    }, [value]);

    useEffect(() => {
        setCounterDisabled(disabled);
    }, [disabled]);

    function changeHandler(e: React.MouseEvent, value: number) {
        if (onChange) {
            onChange(e, value);
        }
        if (!e.isDefaultPrevented()) {
            setCount(value);
        }
    }

    function increment(e: React.MouseEvent) {
        changeHandler(e, count + 1 * step);
    }

    function decrement(e: React.MouseEvent) {
        changeHandler(e, count - 1 * step);
    }

    return (
        <>
            <Box sx={{
                width: bigSize ? '100%' : '16.5rem',
                height: '4.8rem',
                backgroundColor: 'primary.main',
                borderRadius: '3.2rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-around'
            }}>
                <Button variant='text'
                        sx={{
                            p: 0,
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: 800,
                            minWidth: '4rem',
                            width: '4rem',
                            height: '4rem'
                        }}
                        onClick={decrement}
                >-</Button>
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '1.7rem',
                        fontWeight: 700,
                        lineHeight: 3
                    }}>
                    {`${bigSize ? 'В корзине - ' : ''}${count}`}
                </Typography>
                <Button
                    variant='text'
                    sx={{
                        p: 0,
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 800,
                        minWidth: '4rem',
                        width: '4rem',
                        height: '4rem'
                    }}
                    onClick={increment}
                >+</Button>
            </Box>
        </>

    );
}

export default Counter;
