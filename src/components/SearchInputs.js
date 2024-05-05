import { Box } from "@mui/system";
import React from "react";
import Inputs from "./Inputs";
import { data } from "../constants/data";
import { TextField } from "@mui/material";

const SearchInputs = ({ inputRef, filters, setFilters }) => {
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFilters({
      ...filters,
      [name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setFilters({
      ...filters,
      ["Name"]: inputValue,
    });
  };

  const onDelete = (key, value) => {
    if (key !== "Experience" && key !== "Min Base Pay Salary") {
      let newFilters = { ...filters };
      let result = newFilters[key].filter((word) => word !== value);
      setFilters({ ...newFilters, [key]: result });
    } else {
      setFilters({ ...filters, [key]: "" });
    }
  };
  return (
    <Box className="searchBox">
      {data.category.map((value, ind) => (
        <Inputs
          key={ind}
          category={value}
          names={data.categoryData[value]}
          filterName={filters[value]}
          handleChange={handleChange}
          onDelete={onDelete}
        />
      ))}
      <TextField
        className="biggerBox"
        inputRef={inputRef}
        onChange={handleInputChange}
        label="Search Company Name"
        variant="outlined"
      />
    </Box>
  );
};

export default SearchInputs;
