import {Avatar, styled} from "@mui/material";

export const VendorAvatar = styled(Avatar)(({theme}) => ({
    fallback: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.main
    }
}))