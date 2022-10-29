import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./expander.module.scss"
import {RoundedArrowIcon} from "../svgComponents/Icons/filled";
import { FormGroup, RadioGroup, Typography } from '@mui/material';
import _ from "lodash";

const cx = classNames.bind(styles)


export const Expander = ({children, disableCount=false, showCount=3}:{children: any, disableCount?: boolean, showCount?: number}) => {

    const [expanded, setExpanded] = useState(false)

    function expandSwitch(){
        setExpanded(!expanded)
    }

    const childrenCount = React.Children.count(children)

    return(
            <>
                {children.map((child: any, index: number) => !expanded ?
                    index < showCount ?
                child : null : child)
                }

                {childrenCount > showCount &&
                <div className={cx('expander')} onClick={() => expandSwitch()}>
                    <RoundedArrowIcon className={cx('arrow')} style={{transform: `rotateZ(${expanded?180:0}deg)`}}/>
                    <span>{expanded ? 'Свернуть' : `Еще ${disableCount ? '' : childrenCount - showCount}`}</span>
                </div>
                }
            </>

    )
}

export const ExpanderFormGroup = ({children, disableCount=false, showCount=3}:{children: any, disableCount?: boolean, showCount?: number}) => {

    const [expanded, setExpanded] = useState(false)

    function expandSwitch(){
        setExpanded(!expanded)
    }

    const childrenCount = React.Children.count(children)

    return(
        <FormGroup sx={{'& div:not(:first-of-type)': {mt: 2}}}>
            {children && children.map((child: any, index: number) => !expanded ?
                index < showCount ?
                    child : null : child)
            }

            {childrenCount > showCount &&
            <div className={cx('expander')} onClick={() => expandSwitch()}>
                <RoundedArrowIcon className={cx('arrow')} style={{transform: `rotateZ(${expanded?180:0}deg)`}}/>
                <span>{expanded ? 'Свернуть' : `Еще ${disableCount ? '' : childrenCount - showCount}`}</span>
            </div>
            }
        </FormGroup>

    )
}

export const ExpanderRadioGroup = ({children, disableCount=false, showCount=3}:{children: any, disableCount?: boolean, showCount?: number}) => {

    const [expanded, setExpanded] = useState(false)

    function expandSwitch(){
        setExpanded(!expanded)
    }

    const childrenCount = React.Children.count(children)

    return(
        <RadioGroup>
            {children.map((child: any, index: number) => !expanded ?
                index < showCount ?
                    child : null : child)
            }

            {childrenCount > showCount &&
            <div className={cx('expander')} onClick={() => expandSwitch()}>
                <RoundedArrowIcon className={cx('arrow')} style={{transform: `rotateZ(${expanded?180:0}deg)`}}/>
                <span>{expanded ? 'Свернуть' : `Еще ${disableCount ? '' : childrenCount - showCount}`}</span>
            </div>
            }
        </RadioGroup>

    )
}

export const ExpanderProductSpec = ({children, disableCount=false, showCount=3}:{children: any, disableCount?: boolean, showCount?: number}) => {

    const [expanded, setExpanded] = useState(false)

    function expandSwitch(){
        setExpanded(!expanded)
    }

    const childrenCount = React.Children.count(children)

    return(
        <>
            {children.map((child: any, index: number) => !expanded ?
                index < showCount ?
                    child : null : child)
            }

            {childrenCount > showCount &&
              <Typography className={cx('expander')} onClick={() => expandSwitch()}>
                  {/*<RoundedArrowIcon className={cx('arrow')} style={{transform: `rotateZ(${expanded?180:0}deg)`}}/>*/}
                  {expanded ? 'Свернуть' : `Подробные характеристики ${disableCount ? '' : childrenCount - showCount}`}
              </Typography>
            }
        </>

    )
}

export const ExpanderText = ({children, showCount=3}:{children: any, showCount?: number}) => {

    const [expanded, setExpanded] = useState(false)

    function expandSwitch(){
        setExpanded(!expanded)
    }

    const truncate = _.truncate

    const childrenCount = truncate(children, {
        length: showCount, // maximum = showCount characters
        separator: /,?\.* +/ // separate by spaces, including preceding commas and periods
    })

    return(
        <>
            <Typography sx={{fontWeight: 500}} className={cx('text-expand')}>{expanded ? children : childrenCount}</Typography>

            <div className={cx('expander')} onClick={() => expandSwitch()}>
                {children && children.length > childrenCount.length &&
                <Typography sx={{fontWeight: 700}}>{expanded ? 'Свернуть' : `Подробнее`}</Typography>
                }
            </div>
        </>

    )
}
