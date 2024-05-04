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
import LoadingButton from "@mui/lab/LoadingButton";

var count = 0;
const App = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [content, setContent] = useState([]);
  const [filters, setFilters] = useState({
    Roles: [],
    "No of Employees": [],
    Experience: "",
    Remote: [],
    "Min Base Pay Salary": "",
    "Tech Stack": [],
  });
  const fetchData = async (count, append) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: count * 10,
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
      if (append) {
        let finalData = JSON.parse(result).jdList;
        setContent((prevContent) => [...prevContent, ...finalData]);
      } else {
        setContent(JSON.parse(result).jdList);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(count, false);
  }, []);
  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      if (scrollPosition + windowHeight > documentHeight - 10) {
        setIsAtBottom(true);
        ++count;
        fetchData(count, true);
      } else {
        setIsAtBottom(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box className="outerbox">
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
      <SearchInputs filters={filters} setFilters={setFilters} />
      {content && <JobCards content={content} />}
      {isAtBottom ? (
        <IconButton>
          <LoadingButton loading={isAtBottom} />
        </IconButton>
      ) : (
        <IconButton>
          <LoadingButton loading={false} />
        </IconButton>
      )}
    </Box>
  );
};

export default App;
