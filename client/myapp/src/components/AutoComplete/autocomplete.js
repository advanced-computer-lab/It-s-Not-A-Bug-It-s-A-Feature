import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as airports from "airportsjs"

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import FlightIcon from '@material-ui/icons/Flight';
import { blue } from "@material-ui/core/colors";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FlightLandIcon from '@material-ui/icons/FlightLand';

const useStyles = makeStyles((theme) => ({
    root: {

        margin: theme.spacing(1),
        height: "71px",
        flex: 1,
        // position: 'absolute',
        direction: "flex",
    },
    text: {
        display: "flex",
        flexDirection: "row",
        color: "black",

    },


    a: {
        '&:hover': {
            color: "grey",
        },
        textdecoration: "none!important",
        color: "black"
    },

    testssss: {
        height: "100px",
        width: "100px",
        backgroundcolor: "green"
    }


}
));


export default function BasicTextFields() {
    const styles = useStyles({

    });
    const [placeholder, setplaceholder] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        console.log("value", searchWord)
        setWordEntered(searchWord);
        const newFilter = airports.searchByAirportName(searchWord)
        console.log("new filter", newFilter)
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        console.log("filteredData", filteredData)

    };

    const clicked = (value, e) => {
        setWordEntered(value.name);
        console.log({ wordEntered });
        console.log({ value });
        setFilteredData([]);
    };

    function SearchBar({ data }) {
        const handleFilter = (event) => {
            const searchWord = event.target.value;
            setWordEntered(searchWord);
            const newFilter = data.filter((value) => {
                return value.title.toLowerCase().includes(searchWord.toLowerCase());
            });

            if (searchWord === "")
                setFilteredData([]);
            else
                setFilteredData(newFilter);

        };

        const clearInput = () => {
            setFilteredData([]);
            setWordEntered("");
        };

    }

    return (
        <form className={styles.root} noValidate autoComplete="off">
            <div className={styles.text}>

                <div className="resultsTo">
                    <div className="searchInputTo">
                        <TextField
                            id="filled-basic" value={wordEntered} onChange={(event) => { handleFilter(event) }} type="search" label={placeholder} variant="filled"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> <FlightLandIcon /></InputAdornment>,
                            }} />
                    </div>
                    {filteredData.length != 0 && (
                        <div className="dataResultTo" >

                            {filteredData.slice(0, 15).map((value, key) => {
                                return (
                                    <a className="aTo" onClick={(e) => clicked(value, e)} target="_blank">
                                        <p>{value.name} </p>
                                    </a>

                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}