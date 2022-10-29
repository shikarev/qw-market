import { Divider } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddFeedbackLikeMutation, useRemoveFeedbackLikeMutation } from '../../../api/productReviews';
import { useAppDispatch } from '../../../store/hooks';
import { setProductFeedback } from '../../../store/productFeedback';
import { IProductReviews, IReviewMedia } from '../../../types/Reviews';
import Actions from '../Feedback/Actions';
import Message from '../Feedback/Message';
import Notes from '../Feedback/Notes';
import ThumbsButtons from '../Feedback/ThumbsButtons';
import UserHeader from '../Feedback/UserHeader';
import styles from './reviewCard.module.scss'
import ReviewDeleteConfirmDialog from './ReviewDeleteConfirmDialog';

const cx = classNames.bind(styles);

const ReviewCard = ({
                      id,
                      user_id,
                      user_name,
                      experience,
                      rate,
                      advantage,
                      disadvantage,
                      note,
                      created,
                      comments_count,
                      vendor_id,
                      media,
                      like_count,
                      dislike_count,
                      user_is_reacted,
                      productId,
                      user_picture_path,
                      anonymous
                  }: IProductReviews) => {

    const [commentsCount, setCommentsCount] = useState(comments_count || 0)

    const [comments, setComments] = useState<any>([])

    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);

    function deleteConfirmDialogCloseHandler() {
        setDeleteConfirmDialogOpen(false);
    }

    const [skip, setSkip] = useState(true);

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const feedbackValues = {
        rate: rate || 0,
        experience: experience || '',
        advantage: advantage || '',
        disadvantage: disadvantage || '',
        note: note || '',
        product: productId,
        vendor: vendor_id,
        anonymous: anonymous || false,
    }

    const handleEdit = () => {
        dispatch(setProductFeedback(feedbackValues))
        navigate(`/product/${productId}/reviews/form?edit=${id}`);
    }

    return (
        <section className={cx('container')}>
            <div className={cx('main')}>
                <UserHeader
                    user_name={user_name}
                    user_picture_path={user_picture_path}
                    created={created}
                    rate={rate}
                />

                <div className={cx('picContainer')}>{media && media.image?.map((data: IReviewMedia, index: number) =>
                    <div key={index} className={cx('pictures')} style={{backgroundImage: `url(${data})`}} />
                ).slice(0, 8)}
                </div>

                <Message
                    note={note}
                    experience={experience}
                    advantage={advantage}
                    disadvantage={disadvantage}
                    feedback
                />

                <div className={cx('actionContainer')}>
                    <Actions
                        id={id}
                        user_id={user_id}
                        delete={setDeleteConfirmDialogOpen}
                        edit={handleEdit}
                        commentsCount={commentsCount}
                        setCommentsCount={setCommentsCount}
                        setComments={setComments}
                        setSkip={setSkip}
                    />

                    <div>
                        <ThumbsButtons
                            id={id}
                            user_is_reacted={user_is_reacted}
                            like_count={like_count}
                            dislike_count={dislike_count}
                            like={useAddFeedbackLikeMutation}
                            dislike={useRemoveFeedbackLikeMutation}
                        />
                    </div>
                </div>

                <ReviewDeleteConfirmDialog
                    commentaryId={id}
                    open={deleteConfirmDialogOpen}
                    onClose={deleteConfirmDialogCloseHandler}
                />

                <Notes
                    commentsCount={commentsCount}
                    id={id}
                    setCommentsCount={setCommentsCount}
                    comments={comments}
                    setComments={setComments}
                    setSkip={setSkip}
                    skip={skip}
                />

            </div>

            <Divider variant="fullWidth"/>
        </section>
    )
}

export default ReviewCard;
