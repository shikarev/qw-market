import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { WallCard } from '@qwangy/styles';
import { useGetWallQuery } from '../../api/wall';
import Stories from '../../components/Stories';
import { BaseWallCard } from '../../types/WallCard';

const Wall = () => {

  const [ posts, setPosts ] = useState<BaseWallCard[]>([]);
  const [ page, setPage ] = useState(1);
  const limit = 20;

  const { data } = useGetWallQuery({ page, limit });

  useEffect(() => {
    if (data) {
      setPosts([ ...posts, ...data?.data ])
    }
  }, [ data ])

  return (
    <>
      <Stories />
      <Grid container spacing={2} sx={{ m: '4rem 0' }}>
        <Grid item sm={3}>
          {/* sidebar */}
        </Grid>
        <Grid item xs={12} sm={6} sx={{ '& > div:not(:first-of-type)': { mt: 4 } }}>
          {posts.map(post => <WallCard {...post} key={post.id} />)}
          {posts.length < data?.total &&
            <Button variant="outlined" color="primary"
                    sx={{ width: 1, mt: 6, color: 'text.primary' }}
                    onClick={() => setPage(page + 1)}
                    id="btn-wall-loadmore">
              Загрузить еще
            </Button>
          }
        </Grid>
        <Grid item sm={3}>
          {/* sidebar */}
        </Grid>
      </Grid>
    </>
  );
};

export default Wall;
