import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from './notesCard.module.scss'
import {
    useAddNoteLikeMutation,
    useCreateNoteMutation,
    useGetFeedbackNotesParentIdQuery,
    useRemoveNoteLikeMutation,
    useUpdateNoteMutation
} from "../../../api/productReviews";
import {useGetUserInfoQuery} from "../../../api/user";
import {IFeedbackNotes} from "../../../types/Reviews";
import {useFormik} from "formik";
import { Box, Button, styled, Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import AnswerCard from "../AnswerCard";
import {toTrueWordForm} from "../../../utils/toTrueWordForm";
import NotesDeleteConfirmDialog from "./NotesDeleteConfirmDialog";
import QwAvatar from "../../Helpers/QwAvatar";
import ThumbsButtons from "../Feedback/ThumbsButtons";

const cx = classNames.bind(styles);

export const QField = styled(TextField)({
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
})

const NotesCard = ({
                       user_name,
                       user_id,
                       note,
                       id,
                       user_is_reacted,
                       like_count,
                       dislike_count,
                       feedbackId,
                       comments_count,
                       user_picture_path,
                       commentsCount,
                       setCommentsCount,
                       setComments,
                   }: IFeedbackNotes) => {

    const {data: logUserId} = useGetUserInfoQuery();

    const [notesComments, setNotesComments] = useState<any>([])

    const [notesCommentsCount, setNotesCommentsCount] = useState(comments_count || 0)

    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);

    function deleteConfirmDialogCloseHandler() {
        setDeleteConfirmDialogOpen(false);
    }

    const [replyNotes, setReplyNotes] = useState(false);

    const [editNotes, setEditNotes] = useState(false);
    const [editNote] = useUpdateNoteMutation();

    //const [removeNote] = useRemoveNoteMutation();

    const [localNote, setLocalNote] = useState(note);

    const [skip, setSkip] = useState(true);

    const { data: NotesNotes, isError: NotesNotesError, isLoading: NotesNotesIsLoading, isUninitialized: NotesNotesIsUninitialized } = useGetFeedbackNotesParentIdQuery ({feedbackId, id}, {skip})

    useEffect(() => {
        if(NotesNotes && NotesNotes.data) {
            setNotesComments([...notesComments, ...NotesNotes.data])
        }
    },[NotesNotes])

    const [createNote] = useCreateNoteMutation();

    const formik = useFormik({
        initialValues: {
            note: '',
            feedback: feedbackId,
            parent: id,
        },
        onSubmit: (values: any, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            createNote(values).then(() => {
                setNotesComments([])
            });
            setNotesCommentsCount(notesCommentsCount + 1)

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
                /*let editedNote = comments.find((x:IFeedbackNotes) => x.id === values.id);
                if(!!editedNote) {
                    let clone = JSON.parse(JSON.stringify(editedNote));
                    clone.note = values.note;
                    setComments([...comments.filter((x:any) => x.id !== values.id), clone])
                }*/
            });
            resetForm();
            setEditNotes((prev) => !prev);

        },
    });

    return (
        <div className={cx('messageComments')} key={id}>
            <QwAvatar userName={user_name} userAvatar={user_picture_path} />
            <div className={cx('reply')}>
                <div className={cx('title')}>
                    <Typography className={cx('name')}>{user_name}</Typography>
                </div>

                <div>
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
                </div>


                <div className={cx('commentaryContainer')}>
                    {(user_id === logUserId?.user_id && user_id) ?
                        <>
                            <div className={cx('reply-likes')}>

                                {!editNotes ?
                                    <>
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
                                    </>:null}

                                <NotesDeleteConfirmDialog
                                    commentaryId={id}
                                    open={deleteConfirmDialogOpen}
                                    onClose={deleteConfirmDialogCloseHandler}
                                    commentsCount={commentsCount}
                                    setCommentsCount={setCommentsCount}
                                    setComments={setComments}
                                />


                            </div>
                            {/*{notesCommentsCount ?
                                <div className={cx('toggleButton')}
                                     onClick={() => setSkip((prev) => !prev)}
                                >
                                    {skip ?
                                        `Показать ${notesCommentsCount > 0 ? toTrueWordForm(notesCommentsCount, ['комментарий', 'комментария', 'комментариев']) : '' }`
                                        :
                                        `Скрыть ${notesCommentsCount > 0 ? toTrueWordForm(notesCommentsCount, ['комментарий', 'комментария', 'комментариев']) : '' }`
                                    }
                                </div>
                                : null
                            }*/}
                        </>
                        :
                        <>
                            <div className={cx('reply-likes')}>

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
                            </div>
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

                            {notesCommentsCount ?
                                <div className={cx('toggleButton')}
                                     onClick={() => setSkip((prev) => !prev)}
                                >
                                    {skip ?
                                        `Показать ${notesCommentsCount > 0 ? toTrueWordForm(notesCommentsCount, ['комментарий', 'комментария', 'комментариев']) : '' }`
                                        :
                                        `Скрыть ${notesCommentsCount > 0 ? toTrueWordForm(notesCommentsCount, ['комментарий', 'комментария', 'комментариев']) : '' }`
                                    }
                                </div>
                                : null
                            }
                        </>
                    }
                    <>
                        {NotesNotesError ? (
                            <Typography>Что-то пошло не так...</Typography>
                        ) : (NotesNotesIsUninitialized) ? null : NotesNotesIsLoading ? (
                            <Typography>Загрузка...</Typography>
                        ) : NotesNotes ? (
                            <>
                                {notesComments.length > 0 && notesComments.map((data:IFeedbackNotes, index:number) =>
                                    <AnswerCard
                                        feedbackId={feedbackId}
                                        parentId={id}
                                        authorName={user_name}
                                        answerName={data.user_name}
                                        key={index}
                                        notesComments={notesComments}
                                        setNotesComments={setNotesComments}
                                        commentsCount={notesCommentsCount}
                                        setCommentsCount={setNotesCommentsCount}
                                        {...data}
                                    />
                                )}
                            </>
                        ) : null}
                    </>

                </div>
            </div>
        </div>
    )
}

export default NotesCard;
