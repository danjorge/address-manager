import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleSelect from '../Select/Index';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SimpleTable from '../Table/Index';
import uuid from 'react-uuid';
import Collapse from '@material-ui/core/Collapse';
import {Alert, AlertTitle} from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Address() {

    const classes = useStyles();
    const [id, setId] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [checkedDefaulShipping, setCheckedDefaulShipping] = useState(true);
    const [checkedBilling, setCheckedBilling] = useState(true);
    const [addressList, setAddressList] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('defaultShippingAddress');
    const [open, setOpen] = useState(false);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setAddressList(JSON.parse(localStorage.getItem('addressList')) || []);
    }, []);

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleZipCode = (event) => {
        setZipCode(event.target.value);
    }

    const handleChangeDefaulShipping = (event) => {
        setCheckedDefaulShipping(event.target.checked);
    }

    const handleChangeBilling = (event) => {
        setCheckedBilling(event.target.checked);
    }

    const handleClick = (e) => {
        setOpen(true);

        if (!(name && address && state.nome && city.nome && zipCode)) {    
            setValid(true);
            return;
        }

        setAddressList(JSON.parse(localStorage.getItem('addressList')) || []);

        if (id) {
            edit();  
        }

        const addressObj = {
            id: id ? id : uuid(),
            name: name,
            address: address,
            state: {
                id: state.id,
                nome: state.nome,
                sigla: state.sigla,
                region: state.regiao
            },
            city: {
                id: city.id,
                nome: city.nome
            },
            zipCode: zipCode,
            checkedDefaulShipping: checkedDefaulShipping,
            checkedBilling: checkedBilling
        };

        setValid(false);
        addressList.push(addressObj);
        setAddressList([...addressList]);

        localStorage.setItem('addressList', JSON.stringify(addressList));

        clearForm();
    }

    const edit = () => {
        addressList.map((item, i) => {
            if (item.id === id) {
                addressList.splice(i, 1);
                localStorage.setItem('addressList', JSON.stringify(addressList));
            }
            return addressList;
        }); 
    }

    const handleEditAddress = (ad) => {
        setId(ad.id);
        setName(ad.name);
        setAddress(ad.address);
        setState(ad.state.id);
        setCity(ad.city.id);
        setZipCode(ad.zipCode);
        setCheckedBilling(ad.checkedBilling);
        setCheckedDefaulShipping(ad.checkedDefaulShipping);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function clearForm() {
        setName('');
        setAddress('');
        setState({});
        setCity({});
        setZipCode('');
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <Collapse in={open}>
                        <Alert
                            severity={valid ? 'error' : 'success'}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            <AlertTitle>{valid ? 'Error' : 'Success'}</AlertTitle>
                            {valid ? 'The form has invalid inputs' : 'Address saved'}
                        </Alert>
                    </Collapse>
                </div>
                <br />
                <div className="App">
                    <label className="App-Headline">Address Management</label>
                </div>
                <TextField required id="standard-required"
                    label="Name"
                    style={{ margin: 8, width: '100%' }}
                    placeholder="Name"
                    value={name}
                    onChange={handleName}
                    margin="normal" /><br />
                <TextField required id="standard-required"
                    label="Address"
                    style={{ margin: 8, width: '100%' }}
                    value={address}
                    onChange={handleAddress}
                    placeholder="Address" /><br />
                <SimpleSelect state={state} setState={setState} city={city} setCity={setCity} />
                <TextField required id="standard-required"
                    label="Zip Code"
                    style={{ margin: 8, width: '100%' }}
                    value={zipCode}
                    onChange={handleZipCode}
                    placeholder="Zip Code" /><br />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checkedDefaulShipping}
                                onChange={handleChangeDefaulShipping}
                                name="checkedA"
                                color="primary"
                                style={{ margin: 8 }}
                            />
                        }
                        label="Default Shipping Address"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checkedBilling}
                                onChange={handleChangeBilling}
                                name="checkedB"
                                color="primary"
                                style={{ margin: 8 }}
                            />
                        }
                        label="Billing Address"
                    />
                </FormGroup>
                <div className={classes.root}>
                    <Button onClick={handleClick} size="medium" variant="contained" color="primary">
                        Save
                    </Button>
                </div>
                <br />
                <SimpleTable
                    addressList={addressList}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    onEdit={handleEditAddress} />
            </Container>
        </React.Fragment>
    );
}