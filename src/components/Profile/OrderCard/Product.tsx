import React from 'react'
import styles from './Product.module.scss'
import Button from '@mui/material/Button';
import { IShortProduct } from '.';
import { numberWithSpaces } from '../../../utils/numberWithSpaces';
import { Typography } from '@mui/material';

function Product(props:IShortProduct) {
    function feedback(){
        alert('feedback')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src={props.mediaUrl} alt={props.name}/>
                <div className={styles.description}>
                    <Typography className={styles.name}>{props.name}</Typography>
                    <div>
                        <span className={styles.price}>{`${numberWithSpaces(props.cost)} ₽`}</span>
                        {props.oldCost && 
                            <span className={styles.oldprice}>{`${numberWithSpaces(props.oldCost)} ₽`}</span>                      
                        }
                        
                    </div>                  
                </div>
            </div>
            <Button style={{marginLeft: '108px', marginTop: '1.6rem', width: 'fit-content'}} variant="outlined" color="secondary" onClick={() => feedback()}>Оставить отзыв</Button>
        </div>
    );
}

export default Product;