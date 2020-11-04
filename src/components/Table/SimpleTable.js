import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Visibility } from '@material-ui/icons';
import { IconButton, makeStyles, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SimpleModal from '../Modal/Index';
import DialogConfirmation from '../DialogConfirmation/Index';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 300,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Full Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
];

export default function SimpleTable(props) {
    const { order, orderBy, onRequestSort, addressList: addressListProps, onEdit } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [address, setAddress] = useState('');
    const [value, setValue] = useState('');
    const [list, setList] = useState(addressListProps);

    useEffect(() => {
        setList(addressListProps);
    }, [addressListProps])

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const handleClickModal = (ad) => {
        setOpen(true);
        setAddress(ad);
    }

    const handleEditClick = (ad) => {
        onEdit(ad);
    }

    const handleClickDialog = (ad) => {
        setDialog(true);
        setValue(ad.id);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseDialog = (decision) => {
        setDialog(false);
        
        if (decision === 'ok') {
            let items = JSON.parse(localStorage.getItem('addressList'));
            items.map((item, i) => {
                if (item.id === value) {
                    items.splice(i, 1);
                    localStorage.setItem('addressList', JSON.stringify(items));
                }

                return items;
            });

            let updatedAddressList = JSON.parse(localStorage.getItem('addressList') || []);
            setList(updatedAddressList);
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={'center'}
                                    padding={headCell.disablePadding ? 'none' : 'default'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell>State</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Zip Code</TableCell>
                            <TableCell>Default Shipping Address</TableCell>
                            <TableCell>Billing Address</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(list, getComparator(order, orderBy)).map((ad) => (
                            <TableRow key={ad.id}>
                                <TableCell component="th" scope="row">
                                    {ad.name}
                                </TableCell>
                                <TableCell
                                    sortDirection={orderBy === ad.address ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === ad.address}
                                        direction={orderBy === ad.address ? order : 'asc'}
                                        onClick={createSortHandler(ad.address)}
                                    >
                                        {ad.address}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>{ad.state.nome}</TableCell>
                                <TableCell>{ad.city.nome}</TableCell>
                                <TableCell>{ad.zipCode}</TableCell>
                                <TableCell>{ad.checkedDefaulShipping === true ? 'YES' : 'NO'}</TableCell>
                                <TableCell>{ad.checkedBilling === true ? 'YES' : 'NO'}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleClickModal(ad)}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleEditClick(ad)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleClickDialog(ad)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <SimpleModal
                open={open}
                handleClose={handleClose}
                name={address.name}
                address={address.address}
                state={address.state ? address.state.nome : ''}
                city={address.city ? address.city.nome : ''}
                defaultShippingAddress={address.checkedDefaulShipping}
                billingAddress={address.checkedBilling} />
            <DialogConfirmation
                classes={{
                    paper: classes.paper,
                }}
                id="confirmation"
                keepMounted
                open={dialog}
                onClose={handleCloseDialog}
                value={value} />
        </div>
    );
}