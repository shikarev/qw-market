import { Divider } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useAddFeedbackLikeMutation, useRemoveFeedbackLikeMutation } from '../../../../api/productReviews';
import { useAppDispatch } from '../../../../store/hooks';
import { setProductFeedback } from '../../../../store/productFeedback';
import { IProductReviews, IReviewMedia } from '../../../../types/Reviews';
import Actions from '../../../Product/Feedback/Actions';
import Message from '../../../Product/Feedback/Message';
import Notes from '../../../Product/Feedback/Notes';
import ThumbsButtons from '../../../Product/Feedback/ThumbsButtons';
import UserHeader from '../../../Product/Feedback/UserHeader';
import ReviewDeleteConfirmDialog from '../../../Product/ReviewCard/ReviewDeleteConfirmDialog';
import styles from './VendorReviewCard.module.scss'


const cx = classNames.bind(styles);

const VendorReviewCard = ({
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

  const match = useMatch('/stores/:id');

  let vendorId = match?.params.id;

  const feedbackValues = {
    rate: rate || 0,
    experience: experience || '',
    advantage: advantage || '',
    disadvantage: disadvantage || '',
    note: note || '',
    //product: productId,
    vendor: vendorId,
    anonymous: anonymous || false,
  }

  const handleEdit = () => {
    dispatch(setProductFeedback(feedbackValues))
    navigate(`/stores/${vendorId}/vendor-review/?edit=${id}`);
  }

  /*const handleLike = () => {
      if (user_is_reacted === 1) {
          removeLike(id)
      } else {
          addLike({id: id, rate: 1});
      }
  }

  const handleDislike = () => {
      if (user_is_reacted === 0) {
          removeLike(id)
      } else {
          addLike({id: id, rate: 0});
      }
  }*/

  return (
    <section className={cx('container')}>
      <div className={cx('main')}>
        <UserHeader
          user_name={user_name}
          user_picture_path={user_picture_path}
          created={created}
          rate={rate}
        />


        <div className={cx('boss')}>{media && media.image?.map((data: IReviewMedia, index: number) =>
          <div className={cx('imaga')} style={{backgroundImage: `url(${data})`}} key={index}/>
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

export default VendorReviewCard;
