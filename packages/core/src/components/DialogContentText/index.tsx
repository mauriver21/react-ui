import {
  DialogContentText as MuiDialogContentText,
  DialogContentTextProps as MuiDialogContentTextProps,
} from '@mui/material';

export interface DialogContentTextProps extends MuiDialogContentTextProps {}

export const DialogContentText: React.FC<DialogContentTextProps> = (props) => (
  <MuiDialogContentText {...props} />
);
