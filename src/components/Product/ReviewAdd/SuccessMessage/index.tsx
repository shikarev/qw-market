import { Box, Button, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './successMessage.module.scss';

const cx = classNames.bind(styles);

const SuccessMessage = ({productId}:{productId: string}) => {

    let navigate = useNavigate();

    function toProfile(){
      navigate('/profile');
    }

    return(
        <Box className={cx('wrapper')} sx={{pt: '4rem'}}>
            <Typography variant="h1">Спасибо!</Typography>
            <Typography>Ваше мнение очень важно для нас.</Typography>
            <Typography>Отзыв отправлен на модерацию. За статусом отзыва следите в <span className={cx('highlighted-text')} onClick={() => toProfile()}>личном кабинете</span></Typography>
          <Button color="primary" variant="contained" onClick={() => navigate(`/product/${productId}`)} sx={{mt: '3rem'}}>Вернуться к товару</Button>
        </Box>
    )
}

export default SuccessMessage;
