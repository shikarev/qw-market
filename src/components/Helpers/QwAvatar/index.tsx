import {Avatar, styled} from "@mui/material";
import React from "react";

const UserAvatar = styled(Avatar)({
    background: 'linear-gradient(114.44deg, #7433FF 0%, #FFA3FD 100%)',
    fontWeight: 'bold',
    fontSize: '2rem',
    lineHeight: '2.4rem',
    width: '4.4rem',
    height: '4.4rem',
    marginRight: '1.4rem',
    '& .MuiAvatar-img': {
        background: '#ffffff',
    }
})

interface IQwAvatar {
    userName?: string,
    userAvatar?: string,
}

const QwAvatar = (props:IQwAvatar) => {

    const initials = Array.prototype.map.call(props.userName && props.userName.split(" "), function(x){ return x.substring(0,1).toUpperCase();}).join('').slice(0, 2);

    return (
        <UserAvatar
            src={props.userAvatar}
            alt={props.userName}
        >
            {initials}
        </UserAvatar>
    )
}

export default QwAvatar;