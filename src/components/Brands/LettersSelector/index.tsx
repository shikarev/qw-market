import React from 'react';
import {ToggleButton} from '@mui/material';
import styles from './letterSelector.module.scss';
import classNames from 'classnames/bind';
import {QToggleButtonGroup} from "../../common/Buttons/ToggleButtonGroup";
import {styled} from "@mui/material";

const cx = classNames.bind(styles)

const numbers = ['0-9'];
const enAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const ruAlphabet = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", 'й', "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"];

const LetterSelector = ({query, handleSelect, loading}: any) => {
    const StyledToggleButton = styled(ToggleButton)(({theme}) => ({
        color: 'unset',
        border: 'unset',
        borderRadius: '2rem !important',
        padding: '1.2rem',
        whiteSpace: 'nowrap',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        width: '4rem',
        '&.Mui-selected': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        '&:focus': {
            backgroundColor: theme.palette.primary.light
        }
    }))

    return (
        <section className={cx('alphabet', loading ? 'waiting' : '')}>
            <QToggleButtonGroup key="toggle_1"
                                value={query}
                                exclusive
                                onChange={handleSelect}
                                aria-label="text alignment"
            >
                {enAlphabet.map(letter =>
                    <StyledToggleButton key={letter} value={letter}>
                        {letter.toUpperCase()}
                    </StyledToggleButton>
                )}
                {numbers.map(letter =>
                    <StyledToggleButton key={letter} value={letter}>
                        {letter}
                    </StyledToggleButton>
                )}
            </QToggleButtonGroup>
            <QToggleButtonGroup
                value={query}
                exclusive
                onChange={handleSelect}
                aria-label="text alignment"
                key="toggle_2"
            >
                {ruAlphabet.map(letter =>
                    <StyledToggleButton key={letter} value={letter}>
                        {letter.toUpperCase()}
                    </StyledToggleButton>
                )}
            </QToggleButtonGroup>
        </section>
    );
}

export default LetterSelector;