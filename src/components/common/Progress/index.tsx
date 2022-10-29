import {CircularProgress, styled} from "@mui/material";

export const QCircularProgress = styled(CircularProgress)(() => ({
    root:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px'
    }
}))