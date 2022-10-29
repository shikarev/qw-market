import React, { useEffect, useRef, useState } from 'react';
import styles from './mediaGallery.module.scss';
//import {MediaTypes} from '../../../types/Product';
import classNames from "classnames/bind";
import MediaViewer from "./MediaViewer";
import MediaSelector from "./MediaSelector";
import MediaZoom from "./MediaZoom";
import {useGetProductMediaQuery} from "../../../api/product";
//import {RoundedArrowIcon} from "../../svgComponents/Icons/filled";
import FullView from "./FullView";
import Modal from "@mui/material/Modal";
import { styled, Typography } from '@mui/material';
import MuiBackdrop from "@mui/material/Backdrop";
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getModOptions, setModOptionsFromUrl} from "../../../store/modOption";
import {Skeleton} from "@mui/material";

const cx = classNames.bind(styles);

function MediaGallery({productId}:{productId:string}) {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const activeRef = useRef<HTMLDivElement>(null!)

    const dispatch = useAppDispatch()

    const [expanded] = useState(false);

    const handleSlide = (number: number) => {

        setCurrentSlide(expanded ? number : number < 4 ? number : 4)
    }

    const modOptions = useAppSelector(getModOptions)

    const {data: productMedia, isFetching} = useGetProductMediaQuery({id: productId, modStr: modOptions});


    useEffect(() => {
        dispatch(setModOptionsFromUrl(window.location.search.slice(1)))
        handleSlide(0)
    },[productMedia])

    const Backdrop = styled(MuiBackdrop)(() => ({
        root: {
            transition: 'opacity 0ms !important',
            backgroundColor: 'rgba(26, 32, 44, 0.3)',
            backdropFilter: 'blur(10px)'
        }
    }))

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

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
                handleSlide(0)
            } else if (currentSlide + num < 0) {
                handleSlide(productMedia.data?.length - 1)
            } else {
                handleSlide(currentSlide + num)
            }
            if (currentSlide + num === 5) {
                handleSlide(0)
            }
        }
    }

    return (
        <>
            {!isFetching ?
            <div className={cx('wrapper')}>
                <div className={cx('carousel')}>
                    {productMedia?.data?.length !== 0 ? null : <div className={cx('thumb')} style={{backgroundImage: `url(${placeholder})`}}/>}

                    {productMedia?.data?.map((data, index) => !expanded ? index < 5 ?
                        <MediaSelector
                            refObj={activeRef}
                            id={index}
                            selectedId={currentSlide}
                            key={index}
                            thumbUrl={data.image || placeholder}
                            mediaType={data.type || placeholder}
                            onSelect={handleSlide}
                        /> : null
                        :
                        <MediaSelector
                        refObj={activeRef}
                        id={index}
                        selectedId={currentSlide}
                        key={index}
                        thumbUrl={data.image || placeholder}
                        mediaType={data.type || placeholder}
                        onSelect={handleSlide}
                        />
                    )}

                    {productMedia && productMedia?.data?.length > 5 &&
                    <>
                        <Typography className={cx('moreMedia')} onClick={() => handleOpen()}>{`Еще ${productMedia.data.length - 5}`}</Typography>
                        <Modal
                        aria-labelledby="spring-modal-title"
                        aria-describedby="spring-modal-description"
                        className=""
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        >
                        <FullView handleClose={handleClose} productMedia={productMedia} />
                        </Modal>
                    </>
                    }

                </div>
                <div className={cx('viewport')}>
                    {productMedia &&
                    <>
                        <MediaViewer
                            mediaUrl={productMedia.data[currentSlide]?.image || placeholder}
                            mediaType={productMedia.data[currentSlide]?.type || placeholder}
                            changeSlide={changeSlide}
                        />
                        <MediaZoom productMedia={productMedia} />
                    </>
                    }
                </div>
            </div>
            :
            <div className={cx('skeleton-wrapper')}>
                <Skeleton variant='rectangular' width={60} height={60} className={cx('skeleton-small-image')} />
                <Skeleton variant='rectangular' width={400} height={400} className={cx('skeleton-image')} />
            </div>
            }
        </>
    );
}

export default MediaGallery;
