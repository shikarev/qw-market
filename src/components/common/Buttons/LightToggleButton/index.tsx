import {styled} from "@mui/material";
import { ToggleButton } from '@mui/material';

export const LightToggleButton = styled(ToggleButton)(({theme}) => ({
    root: {
        color: 'unset',
        border: 'unset',
        backgroundColor: 'white',
        boxShadow: ' 0px 2px 8px rgba(0, 0, 0, 0.102)',
        borderRadius: '2rem !important',
        padding: '0.6rem 1.2rem',
        whiteSpace: 'nowrap',
        minWidth: '4.4rem',
        fontSize: '1.7rem',
        fontWeight: 'bold',
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
    }
}))