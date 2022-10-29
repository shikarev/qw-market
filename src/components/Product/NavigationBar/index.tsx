import ProductBreadCrumbs from "../../common/ProductBreadCrumbs";
import Description from "../Description";
import IconLink from "../../IconLink";
import {Bookmark, Compare, Heart, Questions, Share} from "../../svgComponents/Icons/outlined";
import {toTrueWordForm} from "../../../utils/toTrueWordForm";
import React from "react";
import classNames from "classnames/bind";
import styles from "./navigationBar.module.scss";

const cx = classNames.bind(styles);

const NavigationBar = ({categoryId, name, rating, points, purchaseCount, feedback}:any) => {
    return(
        <div className={cx('wrapper')}>
            <ProductBreadCrumbs categoryId={categoryId || ''} />
            <div className={cx('name')}>
                {name}
            </div>

            <Description rating={rating} points={points} purchaseCount={purchaseCount} />

            <div className={cx('actions')}>
                <IconLink className={cx('hidable')} icon={Heart} text='Нравится продукт' active={true} />
                <IconLink icon={Bookmark} text='В избранное' active={false} />
                <IconLink icon={Compare} text='Сравнить' active={false} />
                <IconLink icon={Share} text='Поделиться' active={false} />
                <IconLink className={cx('hidable')} icon={Questions} text={toTrueWordForm(feedback, ['вопрос', 'вопроса', 'вопросов'])} active={false} />
            </div>
        </div>
    )
}

export default NavigationBar;
