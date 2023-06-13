
import { Typography } from "@mui/material";
import {styled } from "@mui/system";
import { CSETable } from "./components";
//import { useNavigate } from "react-router-dom";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CSE = () => {
  return (
    <Container>
 <Typography variant="h5">Sexual Reproductive Health Clubs</Typography>
      <CSETable />
    </Container>
  );
};

export default CSE;

