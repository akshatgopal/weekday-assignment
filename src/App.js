import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchInputs from "./components/SearchInputs";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: 10,
          offset: 0,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const result = await response.text();
        console.log(JSON.parse(result));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            👋 Hello
          </Typography>
          <Button color="inherit">Open Chat</Button>
        </Toolbar>
      </AppBar>
      <SearchInputs />
    </Box>
  );
};

export default App;
