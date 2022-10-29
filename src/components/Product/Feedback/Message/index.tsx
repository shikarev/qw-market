import classNames from "classnames/bind";
import styles from "./message.module.scss";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

interface IMessage {
    note?: string,
    experience?: string,
    advantage?: string,
    disadvantage?: string,
    feedback?: boolean,
}

const Message = (props:IMessage) => {

    if(props.feedback) {
        return (
            <div className={cx('review')}>

                {props.experience &&
                <div className={cx('message')}>
                    <Typography className={cx('messageType')}>
                        Опыт использования
                    </Typography>
                    <Typography className={cx('text')}>{props.experience}</Typography>
                </div>
                }

                {props.advantage &&
                <div className={cx('message')}>
                    <Typography className={cx('messageType')}>
                        Достоинства
                    </Typography>
                    <Typography className={cx('text')}>{props.advantage}</Typography>
                </div>
                }

                {props.disadvantage &&
                <div className={cx('message')}>
                    <Typography className={cx('messageType')}>
                        Недостатки
                    </Typography>
                    <Typography className={cx('text')}>{props.disadvantage}</Typography>
                </div>
                }

                {props.note &&
                <div className={cx('message')}>
                    <Typography className={cx('messageType')}>
                        Комментарий
                    </Typography>
                    <Typography className={cx('text')}>{props.note}</Typography>
                </div>
                }
            </div>
        )
    } else {
        return (
            <div className={cx('review')}>
                {props.note &&
                <div className={cx('message')}>
                    <Typography className={cx('text')}>{props.note}</Typography>
                </div>
                }
            </div>
        )
    }
}

export default Message;