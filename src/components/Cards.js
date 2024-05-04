import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Cards = ({ job }) => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 4,
      }}
      key={job.jdUid}
      xs={12}
      sm={6}
      md={4}
      lg={4}
      xl={4}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "75%",
          borderRadius: 8,
          p: 1,
        }}
      >
        <CardContent
          sx={{
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {/* Job Details  */}
          <Container sx={{ height: 400, overflow: "hidden" }}>
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              {/* first have an image */}
              <img src={job.logoUrl} height={50} width={50} alt="" />
              {/* then another div 
          which will contain name of company, job type, location and experience  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontFamily: "Lexend" }} variant="h6">
                  {job.companyName}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 13,
                    fontFamily: "Lexend",
                  }}
                >
                  {job.location} | {job.minExp} - {job.maxExp} years
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{ fontFamily: "Lexend", fontSize: 16 }}
              variant="subtitle1"
            >
              Estimated Salary : {job.minJdSalary} - {job.maxJdSalary} LPA
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontFamily: "Lexend", fontSize: 16 }}>
                About Company :
              </Typography>
              <Typography sx={{ fontFamily: "Lexend", fontSize: 14 }}>
                {job.jobDetailsFromCompany}
              </Typography>
            </Box>
          </Container>

          {/* View Job  */}
          <Container
            sx={{
              position: "absolute",
              bottom: "33%",
              left: 1,
              display: "flex",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              justifyContent: "center",
              mt: 1,
            }}
          >
            <Button
              sx={{
                width: "100%",
                p: 2,
                borderRadius: 2,
                fontFamily: "Lexend",
                fontSize: 15,
              }}
              variant="text"
            >
              View Job
            </Button>
          </Container>

          {/* Min Experience  */}
          <Container
            sx={{
              mt: 1,
              mb: 2,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="subtitle" color="gray">
              Minimum Experience
            </Typography>
            {job.minExp ? (
              <Typography variant="subtitle">{job.minExp} Years</Typography>
            ) : (
              <Typography>Not Required</Typography>
            )}
          </Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Button
              size="small"
              sx={{
                background: "rgb(85, 239, 196)",
                color: "black",
                width: "100%",
                p: 2,
                borderRadius: 2,
                fontFamily: "Lexend",
                fontSize: 15,
              }}
            >
              ⚡ Easy Apply
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                width: "100%",
                p: 2,
                borderRadius: 2,
                fontFamily: "Lexend",
                fontSize: 15,
              }}
            >
              🚀 Unlock referral asks
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Cards;
