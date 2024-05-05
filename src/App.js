import React, { useState, useEffect, useRef } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lexend, sans-serif",
  },
});

var count = 0;
const App = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const inputRef = useRef(null);
  const [content, setContent] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    Roles: [],
    "No of Employees": [],
    Experience: "",
    Remote: [],
    "Min Base Pay Salary": "",
    "Tech Stack": [],
    Name: "",
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchData = async (count, append) => {
    try {
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
    if (
      filters.Roles.length === 0 &&
      filters.Remote.length === 0 &&
      filters.Experience === "" &&
      filters["Min Base Pay Salary"] === "" &&
      filters.Name === ""
    ) {
      setFilteredData([...content]);
      return;
    }
    const newData = content.filter((item) => {
      return (
        (filters.Roles.length === 0 ||
          filters.Roles?.includes(item?.jobRole)) &&
        (filters.Experience === "" ||
          (parseInt(filters?.Experience) >= parseInt(item?.minExp) &&
            parseInt(filters?.Experience) <= parseInt(item?.maxExp))) &&
        (filters["Min Base Pay Salary"] === "" ||
          parseInt(filters["Min Base Pay Salary"]) <=
            parseInt(item?.minJdSalary)) &&
        (filters.Remote.length === 0 ||
          filters.Remote?.includes(item?.location) ||
          (!filters.Remote.includes("remote") && item.location !== "remote")) &&
        (filters.Name === "" ||
          item?.companyName?.toLowerCase().includes(filters.Name.toLowerCase()))
      );
    });
    setFilteredData([...newData]);
  }, [filters, content]);
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
    <ThemeProvider theme={theme}>
      <Box className="outerbox">
        <AppBar
          position="static"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            color: "black",
            borderRadius: 4,
            width: "95%",
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
        <SearchInputs
          inputRef={inputRef}
          filters={filters}
          setFilters={setFilters}
        />
        {filteredData && <JobCards content={filteredData} />}
        {isAtBottom ? (
          <LoadingButton loading={isAtBottom} />
        ) : (
          <LoadingButton loading={false} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
