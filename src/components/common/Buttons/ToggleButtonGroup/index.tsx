import {styled,ToggleButtonGroup} from "@mui/material";

export const QToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    root: {
        flexWrap: 'wrap',
        minWidth: '300px'
    }
}))