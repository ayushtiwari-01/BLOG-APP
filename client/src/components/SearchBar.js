import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

const SearchBar = ({ onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Real-time search (optional)
    if (e.target.value.trim() === "") {
      onClear();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <TextField
        size="small"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleInputChange}
        sx={{
          minWidth: 300,
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            backgroundColor: "#f8f9fa",
            "&:hover fieldset": {
              borderColor: "#4285F4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4285F4",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                type="submit"
                sx={{ color: "#6c757d", "&:hover": { color: "#4285F4" } }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                sx={{ color: "#6c757d", "&:hover": { color: "#dc3545" } }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
