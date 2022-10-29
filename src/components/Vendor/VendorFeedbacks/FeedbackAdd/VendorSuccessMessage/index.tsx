import { Button, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './VendorSuccessMessage.module.scss';

const cx = classNames.bind(styles);

const VendorSuccessMessage = () => {

    let navigate = useNavigate();

    function toProfile(){
      navigate('/profile');
    }

    const {id} = useParams()

    return(
        <div className={cx('wrapper')}>
            <Typography variant="h1">Спасибо!</Typography>
            <Typography>Ваше мнение очень важно для нас.</Typography>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <Typography>Отзыв отправлен на модерацию. За статусом отзыва следите в <span className={cx('highlighted-text')} onClick={() => toProfile()}>личном кабинете</span></Typography>
            <div className={cx('btn')}>
                <Button color="primary" variant="contained" onClick={() => navigate(`/stores/${id}`)}>Вернуться к магазину</Button>
            </div>
        </div>
    )
}

export default VendorSuccessMessage;
