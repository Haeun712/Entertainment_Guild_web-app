// src/components/Search/Search.js
// Search component that includes search bar and displays search results

import Box from '@mui/material/Box';
import SearchResult from "./SearchResult"
import Searchbar from "./Searchbar"

const Search = () => {

    return (
        
        <Box>
                <Searchbar />
                <SearchResult />
        </Box>
    );
}

export default Search;