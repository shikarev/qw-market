//small story card
import React from 'react';
import { imageOnErrorHandler } from '../../../utils/imgError';

import styles from './StoryPreview.module.scss';
import { IStory } from '../../../api/stories';
import { VendorAvatar } from '../../common/Avatars';
import { Box, Skeleton } from '@mui/material';
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';
import clsx from 'clsx';

// local interface
interface IStoryPreview extends IStory {
  onClick: (id: string) => void;
  handleVendor: any;
}

const StoryPreview = (story: IStoryPreview) => {

  function handleCLick(){
    story.onClick(story.id)
  }

  return (
    <div className={clsx(styles.root)} onClick={() => handleCLick()}>
      <Box className={clsx(styles[ 'media' ])}>
        {story.media
          ? story.media.type === 'video'
            ? <video src={story.media.path} muted autoPlay loop />
            : <img src={story.media.path} onError={imageOnErrorHandler}/>
          : <img src={placeholder}/>
        }
        <div className={clsx(styles[ 'media-fade' ])} />
        <span className={clsx(styles[ 'media-description' ])}>{story.name}</span>
      </Box>
      <div className={clsx(styles[ 'vendor' ])} onClick={story.handleVendor}>
        <VendorAvatar src={story.vendor?.picturePath}> </VendorAvatar>
        {story.vendor?.name ?
          <span className={clsx(styles[ 'vendor-name' ])}>{story.vendor.name}</span>
          :
          <Skeleton width={100} className={clsx(styles[ 'vendor-name' ])} />
        }
      </div>
    </div>
  )
}

export default StoryPreview;
