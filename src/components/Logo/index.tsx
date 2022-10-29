import {ReactComponent as QwangyLogo} from "../../assets/icons/logo_full.svg?svgr";
import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Logo = () => {
 return (
     <div style={{cursor: 'pointer'}}
          className={cx('logo')}>
             <QwangyLogo/>
     </div>
 )
}

export default Logo