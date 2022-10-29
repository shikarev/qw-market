import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from './answerCard.module.scss'
import {
    useAddNoteLikeMutation,
    useCreateNoteMutation,
    useRemoveNoteLikeMutation,
    useRemoveNoteNoteMutation,
    useUpdateNoteNoteMutation
} from "../../../api/productReviews";
import {useGetUserInfoQuery} from "../../../api/user";
import {IFeedbackNotes} from "../../../types/Reviews";
import {useFormik} from "formik";
import {Button, styled} from "@mui/material";
import TextField from "@mui/material/TextField";
import AnswerDeleteConfirmDialog from "./AnswerDeleteConfirmDialog";
import QwAvatar from "../../Helpers/QwAvatar";
import ThumbsButtons from "../Feedback/ThumbsButtons";

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
        /*'& .MuiOutlinedInput-input': {
            padding: '1.6rem',
            fontSize: '1.2rem',
            lineHeight: '1.6rem',
            fontWeight: 400,
        },*/
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
});

const AnswerNoteCard = ({
                       user_name,
                       user_id,
                       note,
                       id,
                       user_is_reacted,
                       like_count,
                       dislike_count,
                       feedbackId,
                       parentId,
                       comments_count,
                       authorName,
                       answerName,
                       user_picture_path,

                   }: IFeedbackNotes) => {

    const {data: logUserId} = useGetUserInfoQuery();

    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);

    function deleteConfirmDialogCloseHandler() {
        setDeleteConfirmDialogOpen(false);
    }

    const [replyNotes, setReplyNotes] = useState(false);

    const [removeNote] = useRemoveNoteNoteMutation();

    const [editNotes, setEditNotes] = useState(false);

    const [skip, setSkip] = useState(true);

    const [editNote] = useUpdateNoteNoteMutation();

    const [createNote] = useCreateNoteMutation();


    const formik = useFormik({
        initialValues: {
            note: '',
            feedback: feedbackId,
            parent: id,
        },
        onSubmit: (values: any, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            createNote(values);
            resetForm();
            setReplyNotes((prev) => !prev);
        },
    });

    const editComment = useFormik({
        initialValues: {
            note: note,
            id: id,
        },
        enableReinitialize:true,
        onSubmit: (values: any, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            editNote({id, body: {note: values.note}});
            resetForm();
            setEditNotes((prev) => !prev);
        },
    });

    return (
        <>
        <div className={cx('messageComments')} key={id}>
            <QwAvatar userName={user_name} userAvatar={user_picture_path} />
            <div className={cx('reply')}>
                <div className={cx('title')}>
                    {(user_id !== logUserId?.user_id && user_id) ?
                    <div className={cx('name')}>
                        <div className={cx('answerName')}>{user_name}</div>
                        <span className={cx('answerTo')}>ответил <span className={cx('author-ss')}>{authorName}</span></span>
                    </div>
                    :
                        <div className={cx('name')}>
                            <div className={cx('answerName')}>{user_name}</div>
                            <span className={cx('answerTo')}>ответил <span className={cx('author-ss')}>{authorName}</span></span>
                        </div>
                    }
                </div>
                <div className={cx('message')}>
                    {!editNotes ?
                        <div className={cx('text')}>{note}</div>:null}
                    {editNotes ?
                        <div className={cx('replyContainer')}>
                            <form onSubmit={editComment.handleSubmit}>
                                <QField
                                    id="note"
                                    name="note"
                                    placeholder="Комментарий"
                                    variant="outlined"
                                    multiline
                                    onChange={editComment.handleChange}
                                    value={editComment.values.note}
                                />
                                <div className={cx('buttonsRow')}>
                                    <Button variant="contained" color="primary" size="small" type="submit">
                                        Сохранить
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        size="small"
                                        className={cx('cancel')}
                                        onClick={() => setEditNotes((prev) => !prev)}
                                    >
                                        Отменить
                                    </Button>
                                </div>
                            </form>
                        </div>
                        : null}
                </div>

                <div className={cx('commentaryContainer')}>
                    {(user_id === logUserId?.user_id && user_id) ?
                        <div className={cx('reply-likes')}>
                            {/*{comments_count ?
                                <span className={cx('commentsButton')} onClick={() => setSkip((prev) => !prev)}>{skip ? `Показать ${comments_count > 0 ? toTrueWordForm(comments_count, ['комментарий', 'комментария', 'комментариев']) : '' }` : `Скрыть ${comments_count > 0 ? toTrueWordForm(comments_count, ['комментарий', 'комментария', 'комментариев']) : '' }`}</span>: null}*/}
                            <div>
                                <span className={cx('edit')} onClick={() => setEditNotes((prev) => !prev)}>Изменить</span>
                                <span className={cx('delete')} onClick={() => setDeleteConfirmDialogOpen(true)}>Удалить</span>
                            </div>
                            <ThumbsButtons
                                id={id}
                                user_is_reacted={user_is_reacted}
                                like_count={like_count}
                                dislike_count={dislike_count}
                                like={useAddNoteLikeMutation}
                                dislike={useRemoveNoteLikeMutation}
                            />
                            <AnswerDeleteConfirmDialog
                                CommentaryId={id}
                                open={deleteConfirmDialogOpen}
                                onClose={deleteConfirmDialogCloseHandler}
                            />
                        </div>
                        :
                        <div className={cx('reply-likes')}>
                            {/*{comments_count ?
                                <span className={cx('commentsButton')} onClick={() => setSkip((prev) => !prev)}>{skip ? `Показать ${comments_count > 0 ? toTrueWordForm(comments_count, ['комментарий', 'комментария', 'комментариев']) : '' }` : `Скрыть ${comments_count > 0 ? toTrueWordForm(comments_count, ['комментарий', 'комментария', 'комментариев']) : '' }`}</span>: null}*/}
                            <div className={cx('commentsButton')} onClick={() => setReplyNotes((prev) => !prev)}>
                                {replyNotes ? 'Свернуть' : 'Ответить'}
                            </div>
                            <ThumbsButtons
                                id={id}
                                user_is_reacted={user_is_reacted}
                                like_count={like_count}
                                dislike_count={dislike_count}
                                like={useAddNoteLikeMutation}
                                dislike={useRemoveNoteLikeMutation}
                            />
                        </div>}
                        <>

                            {replyNotes ?
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
                                            <Button variant="contained" color="primary" size="small" type="submit">
                                                Сохранить
                                            </Button>
                                            <Button
                                                variant="text"
                                                color="secondary"
                                                size="small"
                                                className={cx('cancel')}
                                                onClick={() => setReplyNotes((prev) => !prev)}
                                            >
                                                Отменить
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                                : null}
                        </>

                </div>
            </div>
        </div>



    </>
    )
}

export default AnswerNoteCard;
