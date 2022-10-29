import classNames from "classnames/bind";
import styles from "./notes.module.scss";
import {toTrueWordForm} from "../../../../utils/toTrueWordForm";
import {IFeedbackNotes} from "../../../../types/Reviews";
import NotesCard from "../../NotesCard";
import React, {useEffect, useState} from "react";
import {useGetFeedbackNotesByFeedbackIdQuery} from "../../../../api/productReviews";
import { Box, Typography } from '@mui/material';

const cx = classNames.bind(styles);

const Notes = (props:any) => {

    const [page, setPage] = useState(1);

    const { data: feedbackNotes, error: feedbackNotesError, isLoading: feedbackNotesLoading, isUninitialized: feedbackIsUninitialized} = useGetFeedbackNotesByFeedbackIdQuery({feedbackId: props.id, page: page, limit: 10 }, {skip: props.skip})

    useEffect(() => {
        if(feedbackNotes && feedbackNotes.data) {
            props.setComments([...props.comments, ...feedbackNotes.data])
        }
    },[feedbackNotes])

    function loadMore() {
        setPage(page + 1);
    }

    return (
        <div className={cx('commentsContainer')}>
            {props.commentsCount ?
                <Box className={cx('commentsShow')}
                     onClick={() => props.setSkip((prev: any) => !prev)}
                >
                    {props.skip ?
                      <Typography sx={{fontWeight: 600}}>{`Показать ${props.commentsCount > 0 ? toTrueWordForm(props.commentsCount, ['комментарий', 'комментария', 'комментариев']) : '' }`}</Typography>
                      :
                      <Typography sx={{fontWeight: 600}}>{`Скрыть ${props.commentsCount > 0 ? toTrueWordForm(props.commentsCount, ['комментарий', 'комментария', 'комментариев']) : '' }`}</Typography>
                    }
                </Box>
                : null}

            {feedbackNotesError ? (
                <Typography>Что-то пошло не так...</Typography>
            ) : (feedbackIsUninitialized) ? null : feedbackNotesLoading ? (
                <Typography>Загрузка...</Typography>
            ) : feedbackNotes ? (
                <>
                    {props.comments.length > 0 && props.comments.map((data:IFeedbackNotes, index: number) =>
                        <NotesCard
                            commentsCount={props.commentsCount}
                            setCommentsCount={props.setCommentsCount}
                            comments={props.comments}
                            setComments={props.setComments}
                            feedbackId={props.id}
                            parentId={data.id}
                            key={index}
                            {...data}
                        />
                    )}

                    {(feedbackNotes.total > page * 10) &&
                    <Typography className={cx('loadMore')} onClick={() => loadMore()}>
                        Показать больше комментариев
                    </Typography>
                    }
                </>
            ) : null}
        </div>
    )
}

export default Notes;