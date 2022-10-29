import { Box, Button, styled, Typography } from '@mui/material';
import {ICreateNote} from "../../../../types/Reviews";
import {useCreateFeedbackNoteMutation} from "../../../../api/productReviews";
import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./actions.module.scss";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import {useGetUserInfoQuery} from "../../../../api/user";
import * as Yup from "yup";
import { useCookies } from 'react-cookie';
import ReviewAddConfirmDialog from '../../ReviewCard/ReviewAddConfirmDialog';

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

const Actions = (props:any) => {

    const [replyFeedback, setReplyFeedback] = useState(false);

    const [createNote] = useCreateFeedbackNoteMutation();

    const ValidateNote = Yup.object().shape({
        note: Yup.string()
            .min(1, "Минимум 1 символ")
            .trim()
            .required("Обязательное"),
    })

    const formik = useFormik({
        initialValues: {
            note: '',
            feedback: props.id,
        },
        validationSchema: ValidateNote,
        onSubmit: (values:ICreateNote, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            createNote(values).then(() => {
                    props.setComments([])
                }
            )
            props.setCommentsCount(props.commentsCount + 1)

            resetForm();
            props.setSkip(false)
            setReplyFeedback((prev) => !prev);
        },
    });

    const { data: logUserId} = useGetUserInfoQuery();

    const [cookies] = useCookies(['access_token']);
    const isAuthenticated = !!(cookies && cookies.access_token);

    const [commentConfirmDialogOpen, setCommentConfirmDialogOpen] = useState<boolean>(false);

    function commentConfirmDialogCloseHandler() {
        setCommentConfirmDialogOpen(false);
    }

    return (
        <div className={cx('actions')}>
            {props.user_id === logUserId?.user_id && props.user_id ?
                <Box sx={{display: 'flex'}}>
                    <Typography className={cx('edit')} onClick={() => props.edit()}>Изменить</Typography>
                    <Typography className={cx('delete')} onClick={() => props.delete(true)}>Удалить</Typography>
                </Box>
                :
                <div className={cx('commentsButton')} onClick={isAuthenticated ? () => setReplyFeedback((prev) => !prev) : () => setCommentConfirmDialogOpen(true)}>
                    <Typography sx={{fontWeight: 600}}>{replyFeedback ? 'Свернуть' : 'Ответить'}</Typography>
                </div>
            }

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
                            <Button variant="contained" color="primary" type="submit" disabled={!(formik.isValid && formik.dirty)}>Сохранить</Button>
                            <Button variant="text" color="secondary" style={{marginLeft: '1.6rem', color: 'gray'}} onClick={() => setReplyFeedback((prev) => !prev)}>Отменить</Button>
                        </div>
                    </form>
                </div>
            : null}

            <ReviewAddConfirmDialog
              commentaryId={props.id}
              open={commentConfirmDialogOpen}
              onClose={commentConfirmDialogCloseHandler}
            />
        </div>
    )
}

export default Actions;