import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { DocumentService } from '../service/DocumentsService';
import PropTypes from 'prop-types'

export default function SearchInput({ onDocumentLoad }) {
    const [documents, setDocuments] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInput = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 5) {
            DocumentService.getDocumentAutocomplete(e.target.value, setDocuments);
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode == 13) {
            DocumentService.getDocument(e.target.value, onDocumentLoad)
            e.preventDefault()
        }
    };

    const handleAutocompleteChange = (e, val) => {
        if (val) {
            setInputValue(val)
        }
    }

    const handleSearchClick = () => {
        DocumentService.getDocument(inputValue.name, onDocumentLoad)
    }

    return (
        <Paper
            component="form"
            sx={{ p: '0px 4px', display: 'flex', alignItems: 'center', width: 500 }}
        >
            <Autocomplete
                sx={{ width: '100%' }}
                freeSolo
                id="combo-box-demo"
                options={documents}
                getOptionLabel={option => option.name}
                onChange={handleAutocompleteChange}
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                        {option.name} {option.description}
                    </Box>
                )}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        size='small'
                        sx={{ ml: 1, flex: 1 }}
                        label="Поиск документа"
                        onKeyDown={handleKeyPress}
                        onInput={handleInput}
                    />
                } />
            <IconButton
                type="button"
                sx={{ p: '10px', ml: '10px' }}
                aria-label="search"
                onClick={handleSearchClick}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

SearchInput.propTypes = {
    onDocumentLoad: PropTypes.func
}


