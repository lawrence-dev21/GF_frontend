
import {styled } from "@mui/system";
import CSETable from "./CSETable";

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
         <CSETable />
    </Container>
  );
};

export default CSE;

