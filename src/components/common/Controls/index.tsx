import {Checkbox, styled, TextField, FormControlLabel} from "@mui/material";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import MuiPagination from "@mui/material/Pagination";

export const QPagination = styled(MuiPagination)(() => ({
    '& li:first-child button': {
        backgroundColor: 'white',
    },
    '& li:last-child button': {
        backgroundColor: 'white',
    },
    '& .MuiPaginationItem-textPrimary': {
        backgroundColor: 'rgba(235, 79, 90, 0.1)',
    },
    '& .Mui-selected': {
        backgroundColor: '#EB4F5A',
    },
    '& .MuiPaginationItem-page:hover': {
        backgroundColor: '#ff545f',
    }
}))

export const QCheckbox = styled(Checkbox)({
    padding: 0,
    '& .MuiSvgIcon-root': {
        fontSize: '2.4rem',
    },
});

export const QFormControl = styled(FormControl)({
    width: '100%',
    '& .Mui-focused': {
        borderRadius: '3.2rem',
    }
});

export const QFormControlLabel = styled(FormControlLabel)({
    margin: 0,
    '& .MuiTypography-body1': {
        fontSize: '1.6rem',
        lineHeight: '1.9rem',
        marginLeft: '1.4rem',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 400,
    }
});

export const QTextField = styled(TextField)({
    width: '100%',
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        fontSize: '1.4rem',
        lineHeight: '1.7rem',
        color: '#CACACA',
        borderRadius: '3.2rem',
        '& fieldset': {
            borderWidth: '2px',
        },
        '&:hover fieldset': {
            borderColor: '#EB4F5A',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#EB4F5A',
        },
        '& input': {
            padding: '1.6rem 2.4rem 1.6rem 0rem',
            color: '#1A202C',
            fontSize: '2rem',
            lineHeight: '2.4rem',
            fontWeight: 600,
        }
    },
})

export const QRadio = styled(Radio)({
    '& .MuiSvgIcon-root': {
        fontSize: '2.4rem',
    },
});

export const QSelect = styled(Select)({
    fontSize: '2rem',
    borderRadius: '3.2rem',
    transition: 'none',

    '& .MuiSelect-select:focus': {
        borderRadius: '3.2rem',
        backgroundColor: '#ffffff',
    },
    '& .MuiOutlinedInput-input': {
        padding: '1.6rem 2.4rem',
    },
});

export const QRangeSlider = styled(Slider)(() => ({
    root: {
        color: '#EB4F5A',
        height: '.4rem',
        width: '93%',
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '.4rem solid currentColor',
        marginTop: -10,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: '.4rem',
        borderRadius: '.4rem',
    },
    rail: {
        height: '.4rem',
        borderRadius: '.4rem',
    },
}))
