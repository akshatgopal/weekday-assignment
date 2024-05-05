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
    <FormControl
      className={
        category !== "Min Base Pay Salary" || category !== "No of Employees"
          ? "inputBox"
          : "biggerBox"
      }
    >
      <InputLabel>{category}</InputLabel>
      <Select
        multiple={isMultiple}
        value={filterName}
        input={<OutlinedInput id="select-multiple-chip" name={category} />}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {isMultiple ? (
              selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => onDelete(category, value)}
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                />
              ))
            ) : (
              <Chip
                key={selected}
                label={selected}
                onDelete={() => onDelete(category, selected)}
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
            sx={{
              justifyContent: "space-between",
              textTransform: "capitalize",
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Inputs;
