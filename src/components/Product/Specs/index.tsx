import React from 'react';
import styles from './specs.module.scss';
import { ReactComponent as Question } from '../../../assets/Icons/question_circle.svg?svgr';
import { Box, Typography } from '@mui/material';
import { ISpec, ISpecs } from '../../../types/Product';
import classNames from 'classnames/bind';
import { ExpanderProductSpec } from '../../Expander';
import { Popover } from '@qwangy/styles';

const cx = classNames.bind(styles);

const Spec = ({ title, value, question }: ISpec) => {
    const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box className={cx('spec')}>
            <Popover
                style={{ maxWidth: '90%' }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ fontSize: '14px' }}>{question}</Typography>
            </Popover>

            <Typography className={cx('specification')}>
                <dt className={cx('spec-wrapper')}>
                    <span className={cx('spec-title')}>
                        <span className={cx('title')}>{title} {question &&<Question className={cx('question')} onClick={handleClick} />}</span>
                    </span>
                </dt>

                <dd className={cx('value')}>
                    <span>{value}</span>
                </dd>
            </Typography>
        </Box>
    )
}

const Specs = ({ desc, optionsData }: ISpecs) => {

    const productOptions = optionsData.reduce((accumulator, currentValue) => {
        return [...accumulator, ...currentValue.product_options]
    },[])

    if(productOptions) {
      if(productOptions.length <= 0) {
        return null
      }
    }

    return (
        <div className={cx('wrapper')}>
            <Typography variant="h1">Характеристики и описание</Typography>

            {desc &&
                <Box className={cx('text')}>
                    <Typography sx={{fontSize: '16px'}} dangerouslySetInnerHTML={{__html: `${desc}`}} />
                </Box>
            }

            <Box className={cx('commonSpecs')}>
                <Typography sx={{fontWeight: 600, fontSize: '2rem'}}>Общие характеристики</Typography>
                <Box className={cx('details')}>
                    <ExpanderProductSpec showCount={8} disableCount>
                        {productOptions.map((data:any, index: number) =>
                            <Spec key={index} title={data.option_name} value={data.option_value} question={data.option_description} />
                            )}
                    </ExpanderProductSpec>
                </Box>
            </Box>
        </div>
    );
}

export default Specs;
