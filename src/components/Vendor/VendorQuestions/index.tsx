import React, { useEffect, useState } from 'react';
import QuestionCard from '../../Product/QuestionCard';
import { useCreateQuestionsMutation, useGetProductQuestionsByVendorIdQuery } from '../../../api/productQuestions';
import classNames from 'classnames/bind';
import styles from './VendorQuestions.module.scss';
import { Box, Button } from '@mui/material';
import { QField } from '../../Product/NotesCard';
import QwPagination from '../../QwPagination';
import { useFormik } from 'formik';
import { useLocation, useParams } from 'react-router-dom';
import { handleUrlParam } from '../../../utils/utils';

const cx = classNames.bind(styles);

const VendorQuestions = (props:any) => {

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const page = params.get("page") || '1';

  const [pagination, setPagination] = useState(page)

  function setPage (newPage: number){
    handleUrlParam('page', newPage.toString());
    setPagination(newPage.toString());
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPagination(value.toString());
  };

  useEffect(() => {
    setPagination(pagination);
  }, [pagination]);

  const {id} = useParams()

  const {data: vendorQuestions, isLoading} = useGetProductQuestionsByVendorIdQuery({
    vendorId: id,
    page: parseInt(pagination),
    limit: 10,
  }, {skip: !id});

  const [createQuestion, setCreateQuestion] = useState(false);

  const [createProductQuestion] = useCreateQuestionsMutation();

  const formik = useFormik({
    initialValues: {
      note: '',
      status: 'active',
      vendor: props.vendorId,
    },
    onSubmit: (values: any, {resetForm}) => {
      //alert(JSON.stringify(values, null, 2));
      createProductQuestion(values)

      resetForm();
      setCreateQuestion((prev) => !prev);
    },
  });

  /*function handlePagination(num: number){
    params.set('page', num.toString());
    history.push("?" + params.toString());
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePagination(value);
  };*/

  return (
    <Box className={cx('wrapper')} sx={{p: 3}}>

      <section className={cx('container')}>
        {!isLoading  &&
        <div className={cx('questions')}>
          <div className={cx('create-question')}>

            {vendorQuestions && vendorQuestions.pageCount !== 0 ?
              /*<Pagination color="primary" count={pageCount} onChange={(e, num) => pagination(num)} />*/
              /*<Pagination color="primary" count={pageCount} onChange={pagination} page={parseInt(page)} />*/
              <div className={cx('questionsContainer')}>
                <span className={cx('questionsTitle')}>Вопросы</span>
                {!createQuestion ?
                  <Button variant="contained" color="primary" onClick={() => setCreateQuestion((prev) => !prev)}>Задать вопрос</Button>
                  :
                  null
                }
              </div>
              :
              <div className={cx('questionsEmpty')}>
                <h3>Вопросов пока нет</h3>
                <div className={cx('bigText')}>Задайте его первым</div>
                {!createQuestion ?
                  <Button variant="contained" color="primary" onClick={() => setCreateQuestion((prev) => !prev)}>Задать вопрос</Button>
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
            {vendorQuestions && vendorQuestions.data.map((data: any, index: number) =>
              <QuestionCard {...data} key={index}/>
            )}
          </div>

          {(vendorQuestions && vendorQuestions.pageCount !== 0 && vendorQuestions.pageCount && vendorQuestions.pageCount > 1) &&
            <div>
              <QwPagination color="primary" count={vendorQuestions?.pageCount} onChange={handleChange} page={parseInt(pagination)} />
            </div>
          }
        </div>}
      </section>
    </Box>
  );
};

export default VendorQuestions;
