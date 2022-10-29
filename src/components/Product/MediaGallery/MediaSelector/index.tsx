import React from "react";
import {IMediaSelector} from "../../../../types/Product";
import classNames from "classnames/bind";
import styles from "./mediaSelector.module.scss";
import { Box } from '@mui/material';
import { imageOnErrorHandler } from '../../../../utils/imgError';

const cx = classNames.bind(styles);

const MediaSelector: React.FC<IMediaSelector> = ({ thumbUrl, mediaType, selectedId, id, onSelect, refObj }: IMediaSelector) => {

    const handleClick = () => {
        onSelect(id);
    }

    return (
        <Box ref={id === selectedId ? refObj : null} className={cx('thumb', selectedId === id && 'active' )} onClick={() => handleClick()}>
          <Box
            component="img"
            src={thumbUrl}
            alt=""
            onError={imageOnErrorHandler}
            sx={{width: '100%', height: '100%', alignSelf: 'center', maxHeight: '6rem', maxWidth: '6rem', objectFit: 'contain', objectPosition: 'center'}}
          />
        </Box>
    )
}

export default MediaSelector;
