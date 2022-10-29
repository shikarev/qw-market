import React from 'react';
import {QCircularProgress} from "../../common/Progress";
import styles from './SearchHistory.module.scss';
import classNames from "classnames/bind";
import {MenuItem} from "@mui/material";
import {History} from "../../svgComponents/Icons/outlined";
import {SearchHistoryItem} from "../../../types/SearchHistory";

const cx=classNames.bind(styles);

interface ISearchHistory {
    data: SearchHistoryItem[];
    handleClick: (q:string) => void;
}

function SearchHistory(props:ISearchHistory) {

    return (
        <>
            {!props.data ? <QCircularProgress/>
                :
            props.data && props.data.map(x => <MenuItem key={x.id} className={cx('history')} onClick={() => props.handleClick(x.query)}><span className={cx('history-item')}><History/>{x.query}</span></MenuItem>)
            }
        </>
    );
}

export default SearchHistory;