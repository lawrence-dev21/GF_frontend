
import {styled } from "@mui/system";
import SchoolTable from "./SchoolTable";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Schools = () => {
  return (
    <Container>
         <SchoolTable/>
    </Container>
  );
};

export default Schools;

