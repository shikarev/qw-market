import React from 'react';
import styles from './styles.module.scss';
import { ReactComponent as LeftBtn } from '../../../assets/Icons/viewer_l.svg?svgr';
import { ReactComponent as RigthBtn } from '../../../assets/Icons/viewer_r.svg?svgr';

function Carousel({title, children}:any) {   

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>{title}</h1>
                <div className={styles.controls}>
                    <LeftBtn className={styles.prev} />
                    <RigthBtn className={styles.next} />                    
                </div>
            </div>
            <div className={styles.carousel}>
            {children}
            </div>
        </div>
    );
}

export default Carousel;
