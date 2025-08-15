import {
  AccordionDetails as MuiAccordionDetails,
  AccordionDetailsProps as MuiAccordionDetailsProps,
} from '@mui/material';

export interface AccordionDetailsProps extends MuiAccordionDetailsProps {}

export const AccordionDetails: React.FC<AccordionDetailsProps> = (props) => (
  <MuiAccordionDetails {...props} />
);
