import { Alert, Snackbar as SnackbarMUI } from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  message: string;
  variant: 'success' | 'error';
}
export const Snackbar = ({ open, handleClose, message, variant }: Props) => {
  return (
    <SnackbarMUI
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={variant}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </SnackbarMUI>
  );
};
