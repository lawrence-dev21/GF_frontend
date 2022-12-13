
import {styled } from "@mui/system";
import SchoolsTable from "./SchoolsTable";

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
         <SchoolsTable />
    </Container>
  );
};

export default Schools;

