import { Box } from "@mui/system";
import React, { useState } from "react";
import Inputs from "./Inputs";
import { data } from "../constants/data";

const SearchInputs = () => {
  const [filters, setFilters] = useState({
    Roles: [],
    "No of Employees": [],
    Experience: "",
    Remote: [],
    "Min Base Pay Salary": "",
    "Tech Stack": [],
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFilters({
      ...filters,
      [name]: typeof value === "string" ? value.split(",") : value,
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
    <Box>
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
    </Box>
  );
};

export default SearchInputs;
