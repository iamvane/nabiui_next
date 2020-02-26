import * as React from 'react';
import {
  IconButton,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
// import CheckCircle from '@material-ui/icons/CheckCircle';
// import Warning from '@material-ui/icons/Warning';
// import Error from '@material-ui/icons/Error';
// import Info from '@material-ui/icons/Info';
// import Close from '@material-ui/icons/Close';

import dynamic from "next/dynamic";
const CheckCircle = dynamic(() => import('@material-ui/icons/CheckCircle'), {
  ssr: false,
});

const Warning = dynamic(() => import('@material-ui/icons/Warning'), {
  ssr: false,
});

const Error = dynamic(() => import('@material-ui/icons/Error'), {
  ssr: false,
});

const Info = dynamic(() => import('@material-ui/icons/Info'), {
  ssr: false,
});

const Close = dynamic(() => import('@material-ui/icons/Close'), {
  ssr: false,
});

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
  variant: string;
  hideIcon?: boolean;
}

const variantIcon = {
  success: <CheckCircle />,
  warning: <Warning />,
  error: <Error />,
  info: <Info />,
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
        <Close />
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
