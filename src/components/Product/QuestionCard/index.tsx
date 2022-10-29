import React, {useState} from "react";
import { Button, Divider, styled, TextField, Typography } from '@mui/material';
import classNames from "classnames/bind";
import styles from './questionCard.module.scss'
import moment from "moment";
import {ICreateNote} from "../../../types/Reviews";
import {useGetUserInfoQuery} from "../../../api/user";
import {
    useCreateFeedbackNoteMutation,
} from "../../../api/productReviews";
import {useFormik} from "formik";
import {IQuestionsReviews} from "../../../types/Questions";
import QwAvatar from "../../Helpers/QwAvatar";
import ThumbsButtons from "../Feedback/ThumbsButtons";
import {useAddQuestionsLikeMutation, useRemoveQuestionsLikeMutation} from "../../../api/productQuestions";
import QuestionDeleteConfirmDialog from './QuestionDeleteConfirmDialog';

const cx = classNames.bind(styles);

const QField = styled(TextField)({
    root: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: '3.2rem',
            '&:hover fieldset': {
                borderColor: '#FF6772',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FF6772',
            },
        },
        '& .MuiOutlinedInput-multiline': {
            padding: '1.6rem',
            fontSize: '1.2rem',
            lineHeight: '1.6rem',
            fontWeight: 400,
        },
        '& .MuiInputBase-inputMultiline': {
            fontSize: '1.4rem',
            lineHeight: '1.7rem',
            fontWeight: 500,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
            borderColor: '#dfdfdf',
        },
    },
})

const QuestionCard = ({id, author_id, author_name, note, created, like_count, dislike_count, user_picture_path, user_is_reacted}:IQuestionsReviews) => {

    const { data: logUserId} = useGetUserInfoQuery();

    const [replyFeedback, setReplyFeedback] = useState(false);

    const [createNote] = useCreateFeedbackNoteMutation();

    const formik = useFormik({
        initialValues: {
            note: '',
            feedback: id,
        },
        onSubmit: (values:ICreateNote, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            createNote(values);
            resetForm();
            setReplyFeedback((prev) => !prev);
        },
    });

    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);

    function deleteConfirmDialogCloseHandler() {
        setDeleteConfirmDialogOpen(false);
    }

    return (
        <section className={cx('container')}>
            <div className={cx('card')}>
                <QwAvatar userName={author_name} userAvatar={user_picture_path} />
                <div className={cx('userReview')}>
                    <div className={cx('title')}>
                        <Typography className={cx('name')}>{author_name}</Typography>
                        <Typography className={cx('commentTime')}>{moment(created).format("DD MMMM YYYY")}</Typography>
                    </div>

                    <div className={cx('review')}>

                        {note &&
                            <div className={cx('message')}>
                                <Typography className={cx('text')}>{note}</Typography>
                            </div>
                        }


                        <div className={cx('commentaryContainer')}>
                                {author_id === logUserId?.user_id && author_id ?
                                <>
                                    <div className={cx('reply-likes')}>
                                        <div>
                                            {/*<span className={cx('edit')}>Изменить</span>*/}
                                            <span className={cx('delete')} onClick={() => setDeleteConfirmDialogOpen(true)}>Удалить</span>
                                        </div>
                                        {/*<div className={cx('likesContainer')}>
                                            <div className={cx('count')}><img src={thumbsUp} alt="thumbsUp" className={cx('size')}/>{like_count}</div>
                                            <div className={cx('count')}><img src={thumbsDown} alt="thumbsDown" className={cx('size')}/>{dislike_count}</div>
                                        </div>*/}
                                        <ThumbsButtons
                                            id={id}
                                            user_is_reacted={user_is_reacted}
                                            like_count={like_count}
                                            dislike_count={dislike_count}
                                            like={useAddQuestionsLikeMutation}
                                            dislike={useRemoveQuestionsLikeMutation}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                <div className={cx('reply-likes')}>
                                    {/*<div className={cx('commentsButton')} onClick={() => setReplyFeedback((prev) => !prev)}>
                                        {replyFeedback ? 'Свернуть' : 'Ответить'}
                                    </div>*/}
                                    {/*<div className={cx('likesContainer')}>
                                        <div className={cx('count')}><img src={thumbsUp} alt="thumbsUp" className={cx('size')}/>{like_count}</div>
                                        <div className={cx('count')}><img src={thumbsDown} alt="thumbsDown" className={cx('size')}/>{dislike_count}</div>
                                    </div>*/}
                                    <div className={cx('commentsButton')}/>
                                    <ThumbsButtons
                                        id={id}
                                        user_is_reacted={user_is_reacted}
                                        like_count={like_count}
                                        dislike_count={dislike_count}
                                        like={useAddQuestionsLikeMutation}
                                        dislike={useRemoveQuestionsLikeMutation}
                                    />
                                </div>
                                    {replyFeedback ?
                                        <div className={cx('replyContainer')}>
                                            <form onSubmit={formik.handleSubmit}>

                                                <QField
                                                    id="note"
                                                    name="note"
                                                    placeholder="Комментарий"
                                                    variant="outlined"
                                                    multiline
                                                    onChange={formik.handleChange}
                                                    value={formik.values.note}
                                                />

                                                <div className={cx('buttonsRow')}>
                                                    <Button variant="contained" color="primary" size="small"  type="submit">Сохранить</Button>
                                                    <Button variant="text" color="secondary" size="small" style={{marginLeft: '1.6rem', color: 'gray'}} onClick={() => setReplyFeedback((prev) => !prev)}>Отменить</Button>
                                                </div>
                                            </form>
                                        </div>
                                        : null }
                                </>
                                }
                            </div>
                    </div>
                </div>
            </div>
            <Divider variant="fullWidth" />

            <QuestionDeleteConfirmDialog
              questionId={id}
              open={deleteConfirmDialogOpen}
              onClose={deleteConfirmDialogCloseHandler}
            />

        </section>
    )
}

export default QuestionCard;
