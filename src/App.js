import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchInputs from "./components/SearchInputs";
import JobCards from "./components/JobCards";
import MessageIcon from "@mui/icons-material/Message";
import "./App.css";
import { IconButton } from "@mui/material";

const App = () => {
  const [content, setContent] = useState([]);
  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: 10,
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
      console.log("Raw Result:", JSON.parse(result));
      setContent(JSON.parse(result).jdList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "auto", p: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          color: "black",
          borderRadius: 4,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Lexend" }}
          >
            👋 Hello
          </Typography>
          <IconButton>
            <MessageIcon style={{ color: "rgb(85, 239, 196)" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SearchInputs />
      {content && <JobCards content={content} />}
    </Box>
  );
};

export default App;
