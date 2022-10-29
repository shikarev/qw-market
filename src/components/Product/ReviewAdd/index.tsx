import { Button, styled, TextField, Typography } from '@mui/material';
import { ReactComponent as ArrowBackIosRoundedIcon } from '../../../assets/Icons/arrow-l.svg?svgr';
import { ReactComponent as ArrowForwardIosRoundedIcon } from '../../../assets/Icons/arrow-r.svg?svgr';
import Divider from '@mui/material/Divider';
import { Rating } from '@qwangy/styles';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useCreateFeedbackMutation, useUpdateFeedbackMutation } from '../../../api/productReviews';
import { useAppSelector } from '../../../store/hooks';
import { getProductFeedback } from '../../../store/productFeedback';
import { ICreateFeedback } from '../../../types/Reviews';
import { QCheckbox, QFormControlLabel } from '../../common/Controls';
import styles from './reviewAdd.module.scss';
import { imageOnErrorHandler } from '../../../utils/imgError';

const cx = classNames.bind(styles);

const QField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '2rem',
    '&:hover fieldset': {
      borderColor: '#d5d5d5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF6772',
    },
  },
  '& .MuiOutlinedInput-input': {
    //padding: '1.2rem 1.6rem',
  },
  '& .MuiOutlinedInput-multiline': {
    padding: '1.2rem 1.6rem',
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
  '& .MuiFormHelperText-root': {
    color: '#EB4F5A',
    fontSize: '14px',
    fontWeight: 500,
  }
})

const addFeedbackSchema = Yup.object().shape({
  rate: Yup.number()
    .moreThan(0, 'Оцените товар')
    .required('Рейтинг обязателен'),
  experience: Yup.string()
    .required('Обязательно для заполнения'),
  advantage: Yup.string()
    .required('Обязательно для заполнения'),
  disadvantage: Yup.string()
    .required('Обязательно для заполнения'),
  note: Yup.string()
    .required('Обязательно для заполнения'),
})

const ReviewAdd = ({ productId, vendorId, productName, productImage }: any) => {

  const location = useLocation()

  let params = new URLSearchParams(location.search);

  const isEdit = params.get('edit');

  const [ updateFeedback ] = useUpdateFeedbackMutation()

  const [ createFeedback ] = useCreateFeedbackMutation()

  const productFeedback = useAppSelector(getProductFeedback)

  let navigate = useNavigate();

  function successPage() {
    navigate(`/product/${productId}/reviews/form/success`);
  }

  const formik = useFormik({
    initialValues: {
      rate: productFeedback.rate || 0,
      experience: productFeedback.experience,
      advantage: productFeedback.advantage,
      disadvantage: productFeedback.disadvantage,
      note: productFeedback.note,
      product: productFeedback.product || productId,
      vendor: productFeedback.vendor || vendorId,
      anonymous: productFeedback.anonymous || false,
    },
    validationSchema: addFeedbackSchema,
    onSubmit: (values: ICreateFeedback, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      if (isEdit !== null || undefined) {
        updateFeedback({ id: isEdit, body: values }).then(() => {
          successPage();
        });
      } else {
        createFeedback(values).then(() => {
          successPage();
        });
      }
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}
          noValidate
          id="review_add_form"
    >
      <div className={cx('wrapper')}>
        <div className={cx('back')}>
          <Button
            variant="text"
            sx={{color: 'text.primary'}}
            disableRipple
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIosRoundedIcon/>}
          >
            Обратно к отзывам о товаре
          </Button>
        </div>
        <nav className={cx('navbar')}>
          <div className={cx('d-flex', 'navTitle')}>
            <Typography variant="h1">Отзыв о товаре</Typography>
          </div>
          <div className={cx('d-flex', 'navProduct')}>
            <div className={cx('imgContainer')}>
              <img className={cx('productImage')} src={productImage} alt="" onError={imageOnErrorHandler} />
            </div>
            <Typography className={cx('productTitle')}>{productName}</Typography>
          </div>
        </nav>

        <div className={cx('d-flex', 'content')}>
          <div className={cx('d-flex', 'mediaRate')}>
            <div className={cx('main')}>
              <div className={cx('mediaBox', 'mb-5')}>
                <div className={cx('formContent')}>
                  <div className={cx('formBody_fields')}>

                    <div className={cx('field')}>
                      <div className={cx('label')}>Опыт</div>
                      <QField
                        id="experience"
                        name="experience"
                        placeholder="Опыт использования"
                        variant="outlined"
                        multiline
                        onChange={formik.handleChange}
                        value={formik.values.experience}
                        helperText={formik.touched.experience && formik.errors.experience}
                      />
                    </div>

                    <div className={cx('field')}>
                      <div className={cx('label')}>Достоинства</div>
                      <QField
                        id="advantage"
                        name="advantage"
                        placeholder="Что вам понравилось"
                        variant="outlined"
                        multiline
                        onChange={formik.handleChange}
                        value={formik.values.advantage}
                        helperText={formik.touched.advantage && formik.errors.advantage}
                      />
                    </div>

                    <div className={cx('field')}>
                      <div className={cx('label')}>Недостатки</div>
                      <QField
                        id="disadvantage"
                        name="disadvantage"
                        placeholder="Что вам не понравилось"
                        variant="outlined"
                        multiline
                        onChange={formik.handleChange}
                        value={formik.values.disadvantage}
                        helperText={formik.touched.disadvantage && formik.errors.disadvantage}
                      />
                    </div>

                    <div className={cx('field')}>
                      <div className={cx('label')}>Комментарии</div>
                      <QField
                        id="note"
                        name="note"
                        placeholder="Ваше мнение о магазине"
                        variant="outlined"
                        multiline
                        rows={4}
                        onChange={formik.handleChange}
                        value={formik.values.note}
                        helperText={formik.touched.note && formik.errors.note}
                      />
                    </div>

                    <div className={cx('checkbox')}>
                      <QFormControlLabel
                        control={
                          <QCheckbox
                            color="primary"
                            checked={formik.values.anonymous}
                            onChange={formik.handleChange}
                            value={formik.values.anonymous}
                            name="anonymous"
                          />
                        }
                        label="Оставить отзыв анонимно"
                      />
                    </div>

                  </div>
                </div>
              </div>
              <div className={cx('mediaBox')}>
                <div className={cx('mediaCarousel')}>
                  <div className={cx('mediaCarousel_title')}>Фотографии и видео продукта</div>
                  <div className={cx('carouselArrows')}>
                      <ArrowBackIosRoundedIcon/>
                      <ArrowForwardIosRoundedIcon/>
                  </div>
                </div>

                <div>
                  <Divider />
                  <div className={cx('uploadContainer')}>
                    <div className={cx('uploadImage')} />
                    <div className={cx('uploadImage')} />
                    <div className={cx('uploadImage')} />
                    <div className={cx('uploadImage')} />
                    <div className={cx('uploadImage')} />
                  </div>

                  <Typography className={cx('mediaFormat')}>
                    Формат файлов: jpeg, png, 3D fbx, 360 фотографии
                    Максимально допустимый вес 6 МБ
                  </Typography>

                  <div className={cx('linkContainer')}>
                    <Typography className={cx('linkContainer_title')}>Или ссылка</Typography>
                    <div className={cx('linkContainer_upload')} />
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div className={cx('formContainer')}>

            <div className={cx('rateList')}>
              <div className={cx('ratingBody')}>
                <Typography className={cx('ratingBody_title')}>
                  Общая оценка
                </Typography>
                <div className={cx('ratingBody_stars')}>

                  <Rating value={+formik.values.rate || 0} id="rate" name="rate" onChange={formik.handleChange} sx={{
                    pr: '0.8rem',
                    fontSize: '5.4rem',
                    height: '5.4rem',
                    '.MuiRating-iconEmpty': { color: 'rgba(0, 0, 0, 0.26)' },
                    '& .MuiRating-icon svg': {height: '4rem', width: '4rem'},
                  }} />

                  <Typography
                    className={cx('numberRating')}>{formik.values.rate > 0 ? formik.values.rate : null}</Typography>
                  <Typography className={cx('errorMes')}>{formik.touched.rate && formik.errors.rate}</Typography>
                </div>
              </div>
            </div>


            <div className={cx('reviewNext')}>
              <Button variant="contained"
                      color="primary"
                      sx={{
                        padding: '1.6rem 2.4rem',
                        fontSize: '1.6rem',
                        whiteSpace: 'nowrap',
                        minWidth: 'max-content'
                      }}
                      type="submit"
              >
                Оставить отзыв
              </Button>
              <Typography className={cx('acceptTitle')} sx={{ fontWeight: 500 }}>
                Оставляя отзыв, вы соглашаетесь с <span className={cx('colorLink')}>
                                условиями использования сервиса</span> Qwangy
              </Typography>
            </div>

          </div>

        </div>
      </div>
    </form>
  )
}

export default ReviewAdd;
