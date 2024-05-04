import React from "react";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";

const Inputs = ({ onDelete, category, names, filterName, handleChange }) => {
  const isMultiple =
    category !== "Experience" && category !== "Min Base Pay Salary";
  return (
    <FormControl sx={{ width: "25%" }}>
      <InputLabel
        id={`demo-multiple-chip-label-${category.split(" ").join("-")}`}
      >
        {category}
      </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple={isMultiple}
        value={filterName}
        input={<OutlinedInput id="select-multiple-chip" name={category} />}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {isMultiple ? (
              selected.map((value) => (
                <Chip
                  onDelete={() => onDelete(category, value)}
                  key={value}
                  label={value}
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                />
              ))
            ) : (
              <Chip
                onDelete={() => onDelete(category, selected)}
                key={selected}
                label={selected}
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            )}
          </Box>
        )}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ justifyContent: "space-between" }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Inputs;
