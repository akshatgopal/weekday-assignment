import React from "react";
import Cards from "./Cards.js";
import Grid from "@mui/material/Grid";

const JobCards = ({ content }) => {
  return (
    <Grid container>
      {content.map((job, index) => (
        <Cards key={index} job={job} />
      ))}
    </Grid>
  );
};

export default JobCards;
