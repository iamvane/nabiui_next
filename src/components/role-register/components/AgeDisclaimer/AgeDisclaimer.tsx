import * as React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import {
    title,
    message,
    button
} from './constants';

interface Props {
    isFormDialogOpen: boolean;
    closeHandler: () => void;
}

export const AgeDisclaimer: React.StatelessComponent<Props> = props => {
    return (
        <div>
            <Dialog
                open={props.isFormDialogOpen}
                onClose={props.closeHandler}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title nabi-text-uppercase">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={props.closeHandler} color="primary">
                        {button}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
