
import {styled } from "@mui/system";
import ModuleTable from "./ModuleTable";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Modules = () => {
  return (
    <Container>
         <ModuleTable/>
    </Container>
  );
};

export default Modules;

