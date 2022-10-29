import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { SaleIcon } from '../svgComponents/Icons/outlined';
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

const Category = ({ ...props }) => {
  const { title, id, type } = props;

  return (
    (type === 'action' &&
      <NavLink className={({isActive}) => cx(isActive ? styles.active : '', styles.promotion)} to={`/promotion`} >
        <Typography sx={{ fontWeight: 600, fontSize: '1.6rem' }} className={cx('promotion-title')}>
          <SaleIcon /> {title}
        </Typography>
      </NavLink>
    ) || (type === 'category' &&
      <NavLink className={({isActive}) => isActive ? styles.active : ''} to={`/section/${id}`}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.6rem' }}>
          {title}
        </Typography>
      </NavLink>
    ) || (type === 'manufacturer' &&
      <NavLink className={({isActive}) => isActive ? styles.active : ''} to={`/brands`}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.6rem' }}>
          {title}
        </Typography>
      </NavLink>
    ) || (type === 'vendor' &&
      <NavLink className={({isActive}) => isActive ? styles.active : ''} to={`/stores`}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.6rem' }}>
          {title}
        </Typography>
      </NavLink>
    ) || <Typography>Nothing found</Typography>
  );
};

export default Category;
