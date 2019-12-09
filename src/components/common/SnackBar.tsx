import * as React from 'react';
import {
  Icon,
  IconButton,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
  variant: string;
  hideIcon?: boolean;
}

const variantIcon = {
  success: <Icon>check_circle</Icon>,
  warning: <Icon>warning</Icon>,
  error: <Icon>error</Icon>,
  info: <Icon>info</Icon>,
};

const backgroundColor = {
  success: '#06c3e1',
  warning: '#ffa000',
  error: '#d32f2f',
  info: '#1976d2',
};

/**
 * SnackBar
 */
interface MySnackbarContentType {
  message: JSX.Element;
  variant: string;
  action: JSX.Element;
}

const MySnackbarContent = (props: MySnackbarContentType): JSX.Element => {
  return (
    <SnackbarContent
      message={props.message}
      action={props.action}
      style={{backgroundColor: (backgroundColor as any)[props.variant]}}
    />
  );
};

const SnackBar: React.StatelessComponent<Props> = props => {
  const { message, isOpen, handleClose } = props;
  const ActionButton = (): JSX.Element => (
    <div>
      <IconButton className="nabi-color-white" color="inherit" onClick={handleClose}>
        <Icon>close</Icon>
      </IconButton>
    </div>
  );

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isOpen}
      onClose={handleClose}
    >
      <MySnackbarContent
        message={
         <span className="nabi-vertical-top">
          {!props.hideIcon && (variantIcon as any)[props.variant]} {message}
         </span>
        }
        variant={props.variant}
        action={ActionButton()}
      />
    </Snackbar>
  );
};

export default SnackBar;
