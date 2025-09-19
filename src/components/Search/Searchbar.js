import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import SearchResult from "./SearchResult"
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleInput = (event) => {
        console.log(event.target.value); //Print value entered by user
        setInput(event.target.value.toLowerCase()); //Update input state variable
    }

    const Search = () => {
        navigate("?query=" + input);
    }


    const handleEnter = (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            Search();
        }
    }

    return (
        /*Search bar*/
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: "100px",
                }}>
                <Paper
                    component="form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '80%',
                        maxWidth: '800px',
                        boxShadow: 'none',
                        borderBottom: '1px solid #282120',
                        borderRadius: 0
                    }}
                >
                    <InputBase
                        placeholder="What are you looking for?"
                        id="search-bar"
                        onChange={handleInput}
                        onKeyDown={handleEnter}
                        sx={{
                            flex: 1,
                            paddingLeft: '5px',
                            "& input::placeholder": {
                                textAlign: 'center'
                            }
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton type="button" sx={{ p: '5px' }} aria-label="search" onClick={Search}>
                        <SearchIcon />
                    </IconButton>

                </Paper>

            </Box>
    );
}

export default Searchbar;