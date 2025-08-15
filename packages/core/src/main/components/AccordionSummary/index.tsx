import {
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps as MuiAccordionSummaryProps,
} from '@mui/material';

export interface AccordionSummaryProps extends MuiAccordionSummaryProps {}

export const AccordionSummary: React.FC<AccordionSummaryProps> = (props) => (
  <MuiAccordionSummary {...props} />
);
