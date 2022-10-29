import { Button, styled, Divider, TextField } from '@mui/material';
import { ReactComponent as ArrowBackIosRoundedIcon } from '../../../../assets/Icons/arrow-l.svg?svgr';
import { ReactComponent as ArrowForwardIosRoundedIcon } from '../../../../assets/Icons/arrow-r.svg?svgr';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { useCreateFeedbackMutation, useUpdateFeedbackMutation } from '../../../../api/productReviews';
import { useAppSelector } from '../../../../store/hooks';
import { getProductFeedback } from '../../../../store/productFeedback';
import { ICreateFeedback } from '../../../../types/Reviews';
import { QCheckbox, QFormControlLabel } from '../../../common/Controls';
import { Rating } from '@qwangy/styles';
import styles from './FeedbackAdd.module.scss';
import { ArrowPrev } from '../../../svgComponents/Icons/outlined';

const cx = classNames.bind(styles);

const QField = styled(TextField)({
    root: {
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
                color: '#EB4F5A'
        }
    },
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

const FeedbackAdd = () => {

    const location = useLocation()

    let params = new URLSearchParams(location.search);

    const isEdit = params.get("edit");

    const [updateFeedback] = useUpdateFeedbackMutation()

    const [createFeedback] = useCreateFeedbackMutation()

    const productFeedback = useAppSelector(getProductFeedback)

    const {id} = useParams()

    let navigate = useNavigate();

    function successPage(){
      navigate(`/stores/${id}/vendor-review/success`);
    }

    const formik = useFormik({
        initialValues: {
            rate: productFeedback.rate || 0,
            experience: productFeedback.experience,
            advantage: productFeedback.advantage,
            disadvantage: productFeedback.disadvantage,
            note: productFeedback.note,
            vendor: productFeedback.vendor || id,
            anonymous: productFeedback.anonymous || false,
        },
        validationSchema: addFeedbackSchema,
        onSubmit: (values: ICreateFeedback, {resetForm}) => {
            //alert(JSON.stringify(values, null, 2));
            if (isEdit !== null || undefined) {
                updateFeedback({id: isEdit, body: values}).then(() => {
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
              id='review_add_form'
        >
            <div className={cx('wrapper')}>
                <div className={cx('back')}>
                    <Button
                        variant="text"
                        sx={{color: 'text.primary'}}
                        disableRipple
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowPrev />}
                    >
                        Обратно к отзывам о магазине
                    </Button>
                </div>
                <nav className={cx('navbar')}>
                    <div className={cx('d-flex', 'navTitle')}>
                        <h1>Отзыв о магазине</h1>
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
                                    <Divider/>
                                    <div className={cx('uploadContainer')}>
                                        <div className={cx('uploadImage')}/>
                                        <div className={cx('uploadImage')}/>
                                        <div className={cx('uploadImage')}/>
                                        <div className={cx('uploadImage')}/>
                                        <div className={cx('uploadImage')}/>
                                    </div>

                                    <div className={cx('mediaFormat')}>
                                        Формат файлов: jpeg, png, 3D fbx, 360 фотографии
                                        Максимально допустимый вес 6 МБ
                                    </div>

                                    <div className={cx('linkContainer')}>
                                        <div className={cx('linkContainer_title')}>Или ссылка</div>
                                        <div className={cx('linkContainer_upload')}/>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={cx('formContainer')}>
                        <div className={cx('rateList')}>
                            <div className={cx('ratingBody')}>
                                <div className={cx('ratingBody_title')}>
                                    Общая оценка
                                </div>
                                <div className={cx('ratingBody_stars')}>
                                    <Rating
                                        num={+formik.values.rate || 0}
                                        //size="large"
                                        id="rate"
                                        name="rate"
                                        onChange={formik.handleChange}
                                        sx={{'& .MuiRating-icon svg': {height: '4rem', width: '4rem'}, fontSize: '4rem', height: '4rem'}}
                                    />
                                    <span className={cx('numberRating')}>{formik.values.rate > 0 ? formik.values.rate : null}</span>
                                    <div className={cx('errorMes')}>{formik.touched.rate && formik.errors.rate}</div>
                                </div>
                            </div>
                            {/*<div className={cx('ratingBody')}>
                                <div className={cx('ratingBody_title')}>
                                    Качество доставки и выдачи товаров
                                </div>
                                <div className={cx('ratingBody_stars')}>
                                    <RatingStars
                                        num={3}
                                        size="large"
                                        id="delivery"
                                        name="delivery"
                                        //onChange={formik.handleChange}
                                    />
                                    <span className={cx('numberRating')}>{3 > 0 ? 3 : null}</span>
                                </div>
                            </div>*/}
                            {/*<div className={cx('ratingBody')}>
                                <div className={cx('ratingBody_title')}>
                                    Качество обратной связи
                                </div>
                                <div className={cx('ratingBody_stars')}>
                                    <RatingStars
                                        num={5}
                                        size="large"
                                        id="feedback"
                                        name="feedback"
                                        //onChange={formik.handleChange}
                                    />
                                    <span className={cx('numberRating')}>{5 > 0 ? 5 : null}</span>
                                </div>
                            </div>*/}
                        </div>


                        <div className={cx('reviewNext')}>
                            <Button variant="contained"
                                    color="primary"
                                    size="medium"
                                    style={{padding: '2rem 6.4rem'}}
                                    type="submit">Отправить
                            </Button>
                            <div className={cx('acceptTitle')}>
                                Оставляя отзыв, вы соглашаетесь с <span className={cx('colorLink')}>
                                условиями использования сервиса</span> Qwangy
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </form>
    )
}

export default FeedbackAdd;
