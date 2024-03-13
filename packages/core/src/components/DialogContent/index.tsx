import {
  DialogContent as MuiDialogContent,
  DialogContentProps as MuiDialogContentProps,
} from '@mui/material';

export interface DialogContentProps extends MuiDialogContentProps {}

export const DialogContent: React.FC<DialogContentProps> = (props) => (
  <MuiDialogContent {...props} />
);
