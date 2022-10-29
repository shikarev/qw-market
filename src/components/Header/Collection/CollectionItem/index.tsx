import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { Typography } from '@mui/material';
const cx = classNames.bind(styles);

const CollectionItem = ({...props}) => {
    const {
        title,
        imgUrl,
        likeCount,
        likeIcon,
        likeIconFilled
    } = props;

    return (
        <div className={cx('top-item')} >
            <img className={cx('top-item_img')} src={imgUrl} alt={title}/>
            {/*<Clip className={cx('top-item_back')}/>*/}
            <div className={cx('blur')}/>
            <div className={cx('top-item_info')}>
                    <Typography>{title}</Typography>
                    <div style={{display: 'flex', marginTop: 25}}><img style={{width: 22, height: 20, marginRight: 10}} src={likeIcon} alt=""/> {likeCount} Likes</div>
            </div>
        </div>
    )
}

export default CollectionItem
