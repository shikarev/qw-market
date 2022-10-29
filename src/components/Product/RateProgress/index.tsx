import styles from "./rateProgress.module.scss";
import { Box, LinearProgress, Typography } from '@mui/material';
import classNames from "classnames/bind";
import {useGetAverageRateByProductIdQuery} from "../../../api/productReviews";
import cuid from "cuid";

const cx = classNames.bind(styles);

const PROGRESS_SCALE = 20; //scale rating 5 to 100 %
const normalise = (value: number) => value * PROGRESS_SCALE; //default ((value) * 100) / (5)


const RateProgress = ({productId}: { productId?:string }) => {

    const {data: AverageRate} = useGetAverageRateByProductIdQuery(productId)

    return (
        <section className={cx('container')}>
            {/*{AverageRate && Object.entries<number>(AverageRate).map(([k,v]) => (
            <div className={cx('containerProgress')} key={cuid()}>
                <div className={cx('title')}>
                    <div>{k}</div>
                    <div>{v.toFixed(1)}</div>
                </div>
                <LinearProgress variant="determinate" value={normalise(v)} />
            </div>
            ))}*/}

            {AverageRate && AverageRate.map((data: any) =>
                <Box className={cx('containerProgress')} key={cuid()}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', mb: '1.6rem'}}>
                        <Typography className={cx('title')}>{data.key}</Typography>
                        <Typography className={cx('title')}>{data.value.toFixed(1)}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={normalise(data.value)}
                      sx={{'& .MuiLinearProgress-bar': { backgroundColor: '#2975FF'}, backgroundColor: '#DFDFDF'}}
                    />
                </Box>
            )}
        </section>
    )
}

export default RateProgress;
