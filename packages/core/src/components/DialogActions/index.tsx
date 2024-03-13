import {
  DialogActions as MuiDialogActions,
  DialogActionsProps as MuiDialogActionsProps,
} from '@mui/material';

export interface DialogActionsProps extends MuiDialogActionsProps {}

export const DialogActions: React.FC<DialogActionsProps> = (props) => (
  <MuiDialogActions {...props} />
);
