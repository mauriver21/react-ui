import {
  AccordionSummaryProps,
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
} from '@mui/material';
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  AccordionDetailsProps,
  Icon,
} from '@components';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionProps extends Omit<MuiAccordionProps, 'onClick'> {
  label?: string | React.ReactNode;
  labelElement?: React.ReactNode;
  expandIcon?: React.ReactNode;
  summary?: Omit<AccordionSummaryProps, 'children'>;
  details?: Omit<AccordionDetailsProps, 'children'>;
  onClick?: (
    state: { expanded: boolean },
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  expanded: expandedProp,
  label,
  labelElement,
  children,
  summary,
  details,
  onClick: onClickProp,
  expandIcon = <Icon render={ExpandMoreIcon} />,
  TransitionProps,
  ...rest
}) => {
  const store = useRef({ enableTimeout: true, preventExpand: false });
  const [expanded, setExpanded] = useState<boolean>(false);

  const onClick: MuiAccordionProps['onClick'] = (event) => {
    if (store.current.preventExpand) {
      store.current.preventExpand = false;
      return;
    }

    setExpanded(!expanded);
    onClickProp?.({ expanded: !expanded }, event);
  };

  const onClickDetails: AccordionDetailsProps['onClick'] = (event) => {
    store.current.preventExpand = true;
    details?.onClick?.(event);
  };

  useEffect(() => {
    if (expandedProp !== undefined) setExpanded(expandedProp);
  }, [expandedProp]);

  useEffect(() => {
    if (expandedProp) store.current.enableTimeout = false;
    setTimeout(() => (store.current.enableTimeout = true));
  }, []);

  return (
    <MuiAccordion
      disableGutters={true}
      elevation={0}
      expanded={expanded}
      onClick={onClick}
      TransitionProps={{
        timeout: store.current.enableTimeout ? undefined : 0,
        ...TransitionProps,
      }}
      {...rest}
    >
      <AccordionSummary expandIcon={expandIcon} {...summary}>
        {labelElement || (
          <Typography
            display="flex"
            alignItems="center"
            variant="body2"
            fontWeight={500}
          >
            {label}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails {...details} onClick={onClickDetails}>
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
};
