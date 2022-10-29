import { Grid, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import cuid from 'cuid';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_LIMIT, MAX_LIMIT } from '../Catalog';
import styles from './Table.module.scss';

const cx = classNames.bind(styles)

function Table({data, query, page, limit, setLimit, setPage, totalCount, showPictures}: any) {

    const navigate = useNavigate();
    const handleClick = (id: string) => {
      navigate(`/brands/id?id=${id}`)
    }

    return (
        <div className={cx('container')}>
            <Grid container spacing={1}>
                {data.map((item: any) =>
                    <Grid key={cuid()} item sm={6} md={6} xs={12} lg={3}>
                        <div key={item.id} onClick={() => handleClick(item.id)}>
                            <Typography>{item.name}</Typography>
                            {showPictures && <img src={item.picture_path} alt={item.name}/>}
                        </div>
                    </Grid>)
                }
                {(limit < totalCount && totalCount > limit * page) &&
                <Grid item>
                    <Typography className={cx('link')} onClick={() => {
                        limit <= DEFAULT_LIMIT ? setLimit(MAX_LIMIT) : setPage()
                    }}>
                        {limit <= DEFAULT_LIMIT ? `Все бренды на ${query}` : `показать еще`}</Typography>
                </Grid>
                }

            </Grid>

        </div>
    );
}

export default Table;
