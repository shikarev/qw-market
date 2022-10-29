import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  styled
} from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { RoundedArrowIcon } from '../../svgComponents/Icons/filled';
import styles from './accordionContainer.module.scss'

const cx = classNames.bind(styles)

const Accordion = styled(MuiAccordion)(({theme}) => ({

  padding: 0,
  boxShadow: 'none',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '.MuiAccordionSummary-root:before': {
    position: 'absolute',
    content: '" "',
    top: 0,
    left: 0,
    width: '100%',
    height: '1px',
    backgroundColor: theme.palette.secondary.light
  },
  '&$expanded': {
    margin: 'auto',
  },
  '&.MuiPaper-root': {
    boxShadow: 'none',
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
  paddingBottom: '1.6rem',
}))

/**
 * Параметры:
 * collapsed — делает аккордион свернутым (по умолчанию все развернуты).
 * disableAccordion — отключает аккордион.
 **/

export const AccordionContainer = ({
                                     title,
                                     children,
                                     collapsed = false,
                                     disableAccordion = false
                                   }: { title?: string, children: any, collapsed?: boolean, disableAccordion?: boolean }) => {

  const [expanded, setExpanded] = useState(!collapsed);

  return (disableAccordion ?
      <div className={cx('wrapper')}>
        <div className={cx('filterTitle', 'native')}>{title}</div>
        {children}
      </div>
      :
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <MuiAccordionSummary sx={{ padding: 0, '& svg': { color: 'primary.main' } }} aria-controls="panel1d-content"
                             id="panel1d-header" expandIcon={<RoundedArrowIcon />}>
          <div className={cx('filterTitle')}>{title}</div>
        </MuiAccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
  )
}
