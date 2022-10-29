import { Box, IconButton, styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import {Question} from "../../svgComponents/Icons/outlined";
import React from "react";
import styles from  './Tooltips.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export const LightTooltip = styled(({ className, children, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }}  children={children} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: '1.6rem',
    boxShadow: '0px 2px 12px rgb(0 0 0 / 12%)',
    padding: '1.2rem',
    //boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}));

export const QQuestion = ({description}:{description: string}) => {
    return (
        <LightTooltip title={description} placement="right">
            <Box sx={{display: 'flex'}}>
              <Question className={cx('icon')}/>
            </Box>
        </LightTooltip>
    )
}
