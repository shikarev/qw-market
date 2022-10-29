import React, { useEffect, useRef, useState } from 'react';
import styles from './fullView.module.scss';
import {IProductMedia, MediaTypes} from '../../../../types/Product';
import {LeftBtn, RigthBtn, ZoomOutBtn} from "../../../svgComponents/Icons";
import classNames from "classnames/bind";
import MediaSelector from "../MediaSelector";
import placeholder from "../../../../assets/placeHolders/noImagePlaceholder.svg";
import { imageOnErrorHandler } from '../../../../utils/imgError';
import { Box } from '@mui/material';

const cx = classNames.bind(styles);

const ProductViewer = ({ mediaUrl, mediaType, changeSlide, handleClose }: any) => {
    const [showControls, setShowControls] = useState(false)

    //const videoRef = useRef<HTMLVideoElement>(null!)

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
            {mediaType &&
                <div className={cx('media')}>
                  <Box
                    className={cx('productView')}
                    component="img"
                    src={mediaUrl.length > 5 ? `${mediaUrl || placeholder}` : `${placeholder}`}
                    alt=""
                    onError={imageOnErrorHandler}
                    sx={{objectPosition: 'center'}}
                  />
                </div>
            }
            {/*mediaType === MediaTypes.video &&
                <div className={styles.media}>
                    <video ref={videoRef} className={`${styles.content} ${styles.video}`} src={mediaUrl} />
                    <PlayBtn className={`${styles.play} ${!showControls && styles.hidden}`} onClick={() => playVideo()} />
                </div>
            */}
            <RigthBtn className={cx('right', 'controls', )} onClick={() => changeSlide(+1)} />
            <LeftBtn className={cx('left', 'controls', )} onClick={() => changeSlide(-1)} />
            <ZoomOutBtn className={cx('close')} onClick={handleClose} />
        </div>
    )
}

function FullView({handleClose, productMedia}:any) {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const activeRef = useRef<HTMLDivElement>(null!)

    // {data, error, isLoading} = ... FETCH PRICE TO CALC DISCOUNT AND OTHER VALUES...
    //const { data, error, isLoading } = useFetchProductByIdQuery(productId);
    // scroll carousel to selected thumb

    useEffect(() => {
        if (activeRef && activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [currentSlide])

    // change slides by left and right buttons
    const changeSlide = (num: number) => {
        if (productMedia) {
            if (currentSlide + num >= productMedia.data?.length) {
                setCurrentSlide(0)
            } else if (currentSlide + num < 0) {
                setCurrentSlide(productMedia.data?.length - 1)
            } else {
                setCurrentSlide(currentSlide + num)
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('carousel')}>
                    {productMedia?.data.map((data:IProductMedia, index:number) =>
                        <MediaSelector
                            refObj={activeRef}
                            id={index}
                            selectedId={currentSlide}
                            key={index}
                            thumbUrl={data.image}
                            mediaType={data.type}
                            onSelect={setCurrentSlide}
                        />
                    )}
                </div>
                <div className={cx('viewport')}>
                    <ProductViewer
                        mediaUrl={productMedia?.data[currentSlide]?.image || placeholder}
                        mediaType={productMedia?.data[currentSlide]?.type || placeholder}
                        changeSlide={changeSlide}
                        handleClose={handleClose}
                    />
                </div>
            </div>
        </div>
    );
}

export default FullView;
