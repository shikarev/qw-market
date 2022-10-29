import {ThumbsDownFilled, ThumbsUpFilled} from "../../../svgComponents/Icons/filled";
import {ThumbsDown, ThumbsUp} from "../../../svgComponents/Icons/outlined";
import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./thumbsButtons.module.scss";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

interface IThumbsButtons {
    id: string,
    user_is_reacted?: number,
    like_count?: number,
    dislike_count?: number,
    like?: any,
    dislike?: any,
}

const ThumbsButtons = ({id, user_is_reacted, like_count, dislike_count, like, dislike}:IThumbsButtons) => {

    const [reacted, setReacted] = useState(user_is_reacted)

    const [likeCount, setLikeCount] = useState(like_count || 0)
    const [dislikeCount, setDislikeCount] = useState(dislike_count || 0)

    const [addLike] = like();
    const [removeLike] = dislike();
    //const [addLike] = useAddFeedbackLikeMutation();
    //const [removeLike] = useRemoveFeedbackLikeMutation();

    const handleLike = () => {
        if (reacted === 1) {
            removeLike(id).then((r:any) => {
                if(r.error && r.error.status && r.error.status === 400){
                    alert('400!');
                } else if(r.data && r.data.code && r.data.code === 200) {
                    setReacted(undefined)
                    setLikeCount(likeCount - 1)
                }

            });
        } else {
            addLike({id: id, rate: 1}).then((r:any) => {
                if(r.error && r.error.status && r.error.status === 400){
                    alert('400!');
                } else if(r.data && r.data.code && r.data.code === 200) {
                    if(reacted === 0) {
                        setDislikeCount(dislikeCount - 1)
                    }
                    setReacted(1)
                    setLikeCount(likeCount + 1)
                }

            });
        }
    }

    const handleDislike = () => {
        if (reacted === 0) {
            removeLike(id).then((r:any) => {
                if(r.error && r.error.status && r.error.status === 400){
                    alert('400!');
                } else if(r.data && r.data.code && r.data.code === 200) {
                    setReacted(undefined)
                    setDislikeCount(dislikeCount - 1)
                }

            });
        } else {
            addLike({id: id, rate: 0}).then((r:any) => {
                if(r.error && r.error.status && r.error.status === 400){
                    alert('400!');
                } else if(r.data && r.data.code && r.data.code === 200) {
                    if(reacted === 1) {
                        setLikeCount(likeCount - 1)
                    }
                    setReacted(0)
                    setDislikeCount(dislikeCount + 1)
                }

            });
        }
    }


    /*const handleDislike = () => {
        if (user_is_reacted === 0) {
            removeLike(id)
        } else {
            addLike({id: id, rate: 0});
        }
    }*/

    return (
        /*<div className={cx('thumbsContainer')}>
            <div className={cx('count')} onClick={() => handleLike()}>{user_is_reacted === 1 ? <img src={ThumbsUpFilled} alt="thumbsUp" className={cx('size')}/>:<img src={thumbsUp} alt="thumbsUp" className={cx('size')}/>}{like_count}</div>
            <div className={cx('count')} onClick={() => handleDislike()}>{user_is_reacted === 0 ?<img src={ThumbsDownFilled} alt="thumbsDown" className={cx('size')}/>:<img src={thumbsDown} alt="thumbsDown" className={cx('size')}/>}{dislike_count}</div>
        </div>*/
        <div className={cx('thumbsContainer')}>
            <div className={cx('count')} onClick={() => handleLike()}>
                {reacted === 1 ?
                    <ThumbsUpFilled className={cx('size')}/>
                    :
                    <ThumbsUp className={cx('size')}/>}<Typography sx={{fontSize: '16px', fontWeight: 600}}>{likeCount}</Typography>
            </div>
            <div className={cx('count')} onClick={() => handleDislike()}>
                {reacted === 0 ?
                    <ThumbsDownFilled className={cx('size')}/>
                    :
                    <ThumbsDown
                         className={cx('size')}/>}<Typography sx={{fontSize: '16px', fontWeight: 600}}>{dislikeCount}</Typography>
            </div>
        </div>
    )
}

export default ThumbsButtons;