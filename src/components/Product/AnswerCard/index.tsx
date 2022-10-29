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
import { Box, Button, styled, Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import AnswerDeleteConfirmDialog from "./AnswerDeleteConfirmDialog";
import QwAvatar from "../../Helpers/QwAvatar";
import ThumbsButtons from "../Feedback/ThumbsButtons";

const cx = classNames.bind(styles);

const QField = styled(TextField)({
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
});

const AnswerCard = ({
                       user_name,
                       user_id,
                       note,
                       id,
                       user_is_reacted,
                       like_count,
                       dislike_count,
                       feedbackId,
                       authorName,
                       user_picture_path,
                       setNotesComments,
                       setCommentsCount,
                       commentsCount,

                   }: IFeedbackNotes) => {

    const {data: logUserId} = useGetUserInfoQuery();

    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);

    function deleteConfirmDialogCloseHandler() {
        setDeleteConfirmDialogOpen(false);
    }

    const [replyNotes, setReplyNotes] = useState(false);

    /*const [removeNote] = useRemoveNoteNoteMutation();*/

    const [editNotes, setEditNotes] = useState(false);

    /*const [skip, setSkip] = useState(true);*/

    const [editNote] = useUpdateNoteNoteMutation();

    /*const { data: NotesNotes, isError: NotesNotesError, isLoading: NotesNotesIsLoading} = useGetFeedbackNotesParentIdQuery ({
        feedbackId,
        id
    })*/

    const [createNote] = useCreateNoteMutation();

    const [localNote, setLocalNote] = useState(note);


    const formik = useFormik({
        initialValues: {
            note: '',
            feedback: feedbackId,
            parent: id,
        },
        onSubmit: (values: any, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            createNote(values)

            resetForm();
            setReplyNotes((prev) => !prev);
        },
    });

    const editComment = useFormik({
        initialValues: {
            note: localNote,
            id: id,
        },
        enableReinitialize:true,
        onSubmit: (values: any, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            editNote({id, body: {note: values.note}}).then(() => {
                setLocalNote(values.note);
            });
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
                        <Typography sx={{fontWeight: 600}} className={cx('answerName')}>{user_name}</Typography>
                        <Typography sx={{fontWeight: 600}} className={cx('answerTo')}>ответил <span className={cx('author-ss')}>{authorName}</span></Typography>
                    </div>
                    :
                    <div className={cx('name')}>
                        <Typography sx={{fontWeight: 600}} className={cx('answerName')}>{user_name}</Typography>
                        <Typography sx={{fontWeight: 600}}>ответил <span className={cx('author-ss')}>{authorName}</span></Typography>
                    </div>
                    }
                </div>
                <div className={cx('message')}>
                    {!editNotes ?
                        <Typography className={cx('text')}>{localNote}</Typography>:null}
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
                                    <Button variant="contained" color="primary" type="submit">
                                        Сохранить
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        
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
                            <Box sx={{display: 'flex'}}>
                                <Typography variant="body1" sx={{fontWeight: 600}} className={cx('edit')} onClick={() => setEditNotes((prev) => !prev)}>Изменить</Typography>
                                <Typography variant="body1" sx={{fontWeight: 600}} className={cx('delete')} onClick={() => setDeleteConfirmDialogOpen(true)}>Удалить</Typography>
                            </Box>
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
                                setNotesComments={setNotesComments}
                                setCommentsCount={setCommentsCount}
                                commentsCount={commentsCount}
                            />
                        </div>
                        :
                        <div className={cx('reply-likes')}>
                            {/*{comments_count ?
                                <span className={cx('commentsButton')} onClick={() => setSkip((prev) => !prev)}>{skip ? `Показать ${comments_count > 0 ? toTrueWordForm(comments_count, ['комментарий', 'комментария', 'комментариев']) : '' }` : `Скрыть ${comments_count > 0 ? toTrueWordForm(comments_count, ['комментарий', 'комментария', 'комментариев']) : '' }`}</span>: null}*/}
                            <Typography variant="body1" className={cx('commentsButton')} onClick={() => setReplyNotes((prev) => !prev)}>
                                {replyNotes ? 'Свернуть' : 'Ответить'}
                            </Typography>
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
                                            <Button variant="contained" color="primary" type="submit">
                                                Сохранить
                                            </Button>
                                            <Button
                                                variant="text"
                                                color="secondary"
                                                className={cx('cancel')}
                                                onClick={() => setReplyNotes((prev) => !prev)}
                                            >
                                                Отменить
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                                : null}
                            {/*<>
                                {NotesNotesError ? (
                                    <>Что-то пошло не так...</>
                                ) : (NotesNotesIsUninitialized) ? null : NotesNotesIsLoading ? (
                                    <>Загрузка...</>
                                ) : NotesNotes ? (
                                    <>
                                        {NotesNotes?.data?.map((data:IFeedbackNotes, index) => <AnswerCard feedbackId={id} parentId={data.id} key={index} {...data} /> )}
                                    </>
                                ) : null}
                            </>*/}
                            {/*<div>
                                {NotesNotes?.data.map(data =>
                                    <div>
                                        <div>{data.id}</div>
                                        <div>{data.user_name}</div>
                                        <div>{data.note}</div>
                                    </div>
                                )}
                            </div>*/}
                        </>

                </div>
            </div>
        </div>

        {/*{NotesNotes?.data?.map((data:IFeedbackNotes, index) => <AnswerCard feedbackId={id} parentId={data.id} authorName={user_name} answerName={data.user_name} key={index} {...data} /> )}*/}

            {/*{NotesNotes?.data?.map((data:IFeedbackNotes, index) => <AnswerNoteCard feedbackId={id} parentId={data.id} authorName={user_name} answerName={data.user_name} key={index} {...data} /> )}*/}

    </>
    )
}

export default AnswerCard;
