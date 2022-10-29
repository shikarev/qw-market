import {IQuestionsReviews} from "../../../types/Questions";
import {FormatedListResponse} from "../../../types";
import classNames from "classnames/bind";
import styles from "./productQuestions.module.scss";
import React, { useState } from 'react';
import QuestionCard from "../QuestionCard";
import { Button, Typography } from '@mui/material';
import { QField } from '../NotesCard';
import { useFormik } from 'formik';
import { useCreateQuestionsMutation } from '../../../api/productQuestions';
import QwPagination from '../../QwPagination';
import { useCookies } from 'react-cookie';
import QuestionCreateConfirmDialog from '../QuestionsPage/QuestionCreateConfirmDialog';

const cx = classNames.bind(styles);

const ProductQuestions = ({productQuestions, pageCount, pagination, page, productId, vendorId}:{productQuestions:FormatedListResponse<IQuestionsReviews>, pageCount?: number, pagination?: any, page?: any, productId?: string, vendorId?: string,}) => {

  const [createQuestion, setCreateQuestion] = useState(false);

  const [createProductQuestion] = useCreateQuestionsMutation();

  const formik = useFormik({
    initialValues: {
      note: '',
      status: 'active',
      product: productId,
      vendor: vendorId,
    },
    onSubmit: (values: any, {resetForm}) => {
      //alert(JSON.stringify(values, null, 2));
      createProductQuestion(values)

      resetForm();
      setCreateQuestion((prev) => !prev);
    },
  });

  const [cookies] = useCookies(['access_token']);
  const isAuthenticated = !!(cookies && cookies.access_token);

  const [questionConfirmDialogOpen, setQuestionConfirmDialogOpen] = useState<boolean>(false);

  function questionConfirmDialogCloseHandler() {
    setQuestionConfirmDialogOpen(false);
  }

  return (
      <div className={cx('wrapper')}>
          <section className={cx('container')}>
              <div className={cx('questions')}>
                <div className={cx('create-question')}>

                  {pageCount !== 0 ?
                    <div className={cx('questionsContainer')}>
                      <Typography className={cx('questionsTitle')}>Вопросы</Typography>
                      {!createQuestion ?
                        <Button variant="contained" color="primary" onClick={isAuthenticated ? () => setCreateQuestion((prev) => !prev) : () => setQuestionConfirmDialogOpen(true)}>Задать вопрос</Button>
                        :
                        null
                      }
                    </div>
                    :
                    <div className={cx('questionsEmpty')}>
                      <Typography variant="h3">Вопросов пока нет</Typography>
                      <Typography className={cx('bigText')}>Задайте его первым</Typography>
                      {!createQuestion ?
                        <Button variant="contained" color="primary" onClick={isAuthenticated ? () => setCreateQuestion((prev) => !prev) : () => setQuestionConfirmDialogOpen(true)}>Задать вопрос</Button>
                        :null
                      }
                    </div>
                  }

                  {createQuestion ?
                    <div className={cx('replyContainer')}>
                      <form onSubmit={formik.handleSubmit}>
                        <QField
                          id="note"
                          name="note"
                          placeholder="Задайте свой вопрос"
                          variant="outlined"
                          multiline
                          onChange={formik.handleChange}
                          value={formik.values.note}
                        />
                        <div className={cx('buttonsRow')}>
                          <Button variant="contained" color="primary" type="submit">
                            Отправить
                          </Button>
                          <Button
                            variant="text"
                            color="secondary"
                            className={cx('cancel')}
                            onClick={() => setCreateQuestion((prev) => !prev)}
                          >
                            Отменить
                          </Button>
                        </div>
                      </form>
                    </div>
                    : null}
                </div>
                  <div className={cx('sectionContainer')}>
                  {productQuestions.data.map((data:IQuestionsReviews) =>
                      <QuestionCard key={data.id} {...data} />
                  )}
                  </div>

                {(pageCount !== 0 && pageCount && pageCount > 1) &&
                  <div>
                    <QwPagination color="primary" count={pageCount} onChange={pagination} page={parseInt(page)} />
                  </div>
                }

              </div>
          </section>
        <QuestionCreateConfirmDialog
          open={questionConfirmDialogOpen}
          onClose={questionConfirmDialogCloseHandler}
        />
      </div>
  )
}

export default ProductQuestions;
