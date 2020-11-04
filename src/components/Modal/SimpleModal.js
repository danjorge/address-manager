import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        flexGrow: 1,
    },
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    let body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 style={{ textAlign: 'center' }}>Address Details</h3>
            <hr />
            <Grid container spacing={2}>
                <Grid item xs={6}><b>Name:</b></Grid>
                <Grid item xs={6}><b>Address:</b></Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>{props.name}</Grid>
                <Grid item xs={6}>{props.address}</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}><b>State:</b></Grid>
                <Grid item xs={6}><b>City:</b></Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>{props.state}</Grid>
                <Grid item xs={6}>{props.city}</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}><b>Default Shipping Address:</b></Grid>
                <Grid item xs={6}><b>Billing Address:</b></Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>{props.defaultShippingAddress ? 'YES' : 'NO'}</Grid>
                <Grid item xs={6}>{props.billingAddress ? 'YES' : 'NO'}</Grid>
            </Grid>
        </div>
    );

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
}