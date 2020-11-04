import React, { useRef } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function DialogConfirmation(props) {
    const { onClose, open, ...other } = props;
    const valueRef = useRef(null);

    const handleEntering = () => {
        if (valueRef.current != null) {
            valueRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose('cancel');
    };

    const handleOk = () => {
        onClose('ok');
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            onEntering={handleEntering}
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Confirmation</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}><b>Are you sure you want delete it?</b></Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}