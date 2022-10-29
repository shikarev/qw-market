import {styled} from "@mui/material";
import {ToggleButton} from "@mui/material";

export const QFormToggleButton = styled(ToggleButton)(({theme}) => ({
    color: 'unset',
    border: 'unset',
    borderRadius: '1.2rem !important',
    whiteSpace: 'nowrap',
    fontSize: '1.4rem',
    fontWeight: 500,
    width: 'fit-content',
    textTransform: 'none',
    marginRight: '1.6rem',
    padding: '1.2rem 2rem',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.102)',
    margin: '1.2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    '&.Mui-selected': {
        backgroundColor: 'white',
        boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.102), 0px 0px 0px 2px ${theme.palette.primary.main} inset`,
        color: theme.palette.text.primary
    },
    '&:hover': {
        backgroundColor: theme.palette.primary.light
    },
    '&:focus': {}
    ,
    "& label": {
        display: 'flex',
        flexDirection: 'column',
        margin: '1.2rem 2rem',
        '& p': {
            marginTop: '.8rem',
            textTransform: 'none'
        }
    }
}))