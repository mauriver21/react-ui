import { LoadingBackdrop, LoadingBackdropProps } from '@components';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material';

export interface DialogProps extends MuiDialogProps {
  disableBackdropClick?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingBackdropProps?: LoadingBackdropProps;
}

export const Dialog: React.FC<DialogProps> = ({
  onClose: onCloseProp,
  disableBackdropClick,
  disableEscapeKeyDown,
  disabled,
  children,
  loadingBackdropProps,
  loading,
  ...rest
}) => {
  const onClose: DialogProps['onClose'] = (event, reason) => {
    if ((reason === 'backdropClick' && disableBackdropClick) || disabled) {
      return;
    }

    onCloseProp?.(event, reason);
  };

  return (
    <MuiDialog
      disableEscapeKeyDown={disableEscapeKeyDown || disabled}
      onClose={onClose}
      {...rest}
    >
      {loading ? <LoadingBackdrop {...loadingBackdropProps} /> : <></>}
      {children}
    </MuiDialog>
  );
};
