import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SimpleSelect = (props) => {
    const classes = useStyles();
    const {city, state} = props;
    const [listState, setListState] = useState([]);
    const [listCity, setListCity] = useState([]);

    function loadState() {
        let url = 'https://servicodados.ibge.gov.br/';
        url = url + 'api/v1/localidades/estados';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListState([...data]);
            });
    }

    function loadCity(id) {
        let url = 'https://servicodados.ibge.gov.br/api/v1/';
        url = url + `localidades/estados/${id}/municipios`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListCity([...data]);
            });
    }

    useEffect(() => {
        loadState();
    }, []);

    useEffect(() => {
        if (state) {
            loadCity(state.id);
        }
    }, [state]);

    const handleStateChange = (event) => {
        props.setState(event.target.value);
    }

    const handleCityChange = (event) => {
        props.setCity(event.target.value);
    }

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={state}
                    displayEmpty
                    onChange={handleStateChange}
                >
                    {listState.map(itemState => (
                        <MenuItem key={itemState.id} value={itemState}>
                            {itemState.nome} - {itemState.sigla}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">city</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={city}
                    displayEmpty
                    onChange={handleCityChange}
                >
                    {listCity.map(itemCity => (
                        <MenuItem key={itemCity.id} value={itemCity}>
                            {itemCity.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SimpleSelect;