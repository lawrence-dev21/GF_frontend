
import {styled } from "@mui/system";
import UserTable from "./UserTable";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Users = () => {
  return (
    <Container>
         <UserTable/>
    </Container>
  );
};

export default Users;

