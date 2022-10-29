import {useState} from "react";
import classNames from "classnames/bind";
import styles from "./sharePopover.module.scss"

const cx = classNames.bind(styles);

export default function SharePopover(props:any) {
    const { trigger, content, delay, direction, children } = props;

    const [hidden, setHidden] = useState(true);

    function handleClick() {
        setHidden(!hidden);
    }

    function handleMouseOver() {
        setHidden(false);
    }

    function handleMouseOut() {
        setHidden(true);
    }

    return (
        <div
            className={cx('info')}
            {...(trigger === "click" && {
                onClick: handleClick
            })}
            {...(trigger === "hover" && {
                onMouseOver: handleMouseOver,
                onMouseOut: handleMouseOut
            })}
        >
            {children}
            <div className={cx('popover', direction, hidden ? 'hidden' : '')}>
                <div>Копировать ссылку</div>
            </div>
        </div>
    );
}