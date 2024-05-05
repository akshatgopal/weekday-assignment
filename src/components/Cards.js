import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Cards = ({ job }) => {
  const handleButtonClick = () => {
    window.open(job.jdLink, "_blank");
  };
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
          width: "75%",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.1)",
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
          <Box
            sx={{
              borderRadius: 5,
              mb: 3,
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.1)",
              marginLeft: 3,
              p: "5px 0px 5px 5px",
            }}
            className="posts"
          >
            <Typography sx={{ fontSize: "10px", fontWeight: "light" }}>
              ⏳ Posted 5 days ago
            </Typography>
          </Box>
          <Container sx={{ height: 400, overflow: "hidden" }}>
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              <img src={job.logoUrl} height={50} width={50} alt="" />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography color="gray" variant="h6">
                  {job.companyName}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 13,
                  }}
                >
                  {job.location} {job.minExp && `| ${job.minExp}`}{" "}
                  {job.maxExp && `- ${job.maxExp} Years`}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: 16 }} variant="subtitle1" color="gray">
              Estimated Salary : {job.minJdSalary && job.minJdSalary}{" "}
              {job.minJdSalary && job.maxJdSalary ? "-" : ""} {job.maxJdSalary}{" "}
              LPA
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontSize: 16 }}>About Company :</Typography>
              <Typography sx={{ fontSize: 14 }}>
                {job.jobDetailsFromCompany}
              </Typography>
            </Box>
          </Container>

          {/* View Job  */}
          <Container
            sx={{
              position: "absolute",
              bottom: "32%",
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

                fontSize: 15,
              }}
              variant="text"
              onClick={handleButtonClick}
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
                fontSize: 15,
              }}
              onClick={handleButtonClick}
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
