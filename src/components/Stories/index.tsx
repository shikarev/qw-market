import React, { useState } from 'react';

import Carousel from './Carousel';
import FullView from './FullView';

const StoriesNew = () => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string | undefined>(undefined);

  function handleOpen (id: string) {
    setId(id);
    setOpen(true);
  }

  return (
    <>
      <Carousel handleOpen={handleOpen}/>
      {open &&
        <FullView storyId={id} open={open} setOpen={(t) => setOpen(t)}/>
      }
    </>
  );
};

export default StoriesNew;
