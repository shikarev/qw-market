import { Box } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { IStory } from '../../../../api/stories';
import styles from './PrevieCard.module.scss';


const PreviewCard = ({ story, large = false }: { story: IStory, large?: boolean }) => {

  const mediaSrc = story.media?.path

  return (
    <Box sx={{m: '2.5rem', borderRadius: '2rem', display: { xs: 'none', md: 'block' }, overflow: 'hidden'}}>
      {mediaSrc && story.media.type === 'video'
        ? <video src={mediaSrc}
                 className={clsx(styles.card, {
                   [ styles.card__large ]: large,
                   [ styles.card__small ]: !large,
                 })} />
        : <img src={mediaSrc}
               className={clsx(styles.card, {
                 [ styles.card__large ]: large,
                 [ styles.card__small ]: !large,
               })} />
      }
    </Box>
  );
};

export default PreviewCard;
