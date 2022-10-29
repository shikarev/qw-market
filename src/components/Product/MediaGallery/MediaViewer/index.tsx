import {LeftBtn, RigthBtn} from "../../../svgComponents/Icons";
import React, {useRef, useState} from "react";
import classNames from "classnames/bind";
import styles from "./mediaViewer.module.scss";
import placeholder from '../../../../assets/placeHolders/noImagePlaceholder.svg';
import { imageOnErrorHandler } from '../../../../utils/imgError';
import { Box } from '@mui/material';

const cx = classNames.bind(styles);

const MediaViewer = ({ mediaUrl, mediaType, changeSlide }: any) => {

    const [showControls, setShowControls] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null!)


    /*const playVideo = () => {
        if (videoRef) {
            if (videoRef.current.paused) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
    }*/

    return (
        <div className={cx('viewer')}
             onMouseEnter={() => setShowControls(true)}
             onMouseLeave={() => setShowControls(false)}>
            {/*=== MediaTypes.img*/}
            {mediaType &&
            <div className={cx('media')}>
              <Box
                component="img"
                src={mediaUrl.length > 5 ? `${mediaUrl || placeholder}` : `${placeholder}`}
                alt=""
                onError={imageOnErrorHandler}
                sx={{width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center'}}
              />
            </div>
            }
            {/*{mediaType &&
                <div className={styles.media}>
                    <video ref={videoRef} className={`${styles.content} ${styles.video}`} src={mediaUrl} />
                    <PlayBtn className={`${styles.play} ${!showControls && styles.hidden}`} onClick={() => playVideo()} />
                </div>
            }*/}

            <LeftBtn className={cx('left', 'controls', !showControls && 'hidden')} onClick={() => changeSlide(-1)} />
            <RigthBtn className={cx('right', 'controls', !showControls && 'hidden')} onClick={() => changeSlide(+1)} />
        </div>
    )
}

export default MediaViewer;
