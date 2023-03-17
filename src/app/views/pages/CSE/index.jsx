
import { Button, Typography } from "@mui/material";
import {styled } from "@mui/system";
import { CSETable } from "./components";
import { useNavigate } from "react-router-dom";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));





const CSE = () => {
  const navigate  = useNavigate()
  return (
    <Container>
 <Typography variant="h5">CSE List</Typography>
        <Button
                    sx={{mb: 2, mt: 2}}
                    size="large"
                    variant="contained"
                    color="primary"
                       onClick={() => {
                        navigate('/add-cse');
                    }}
                >
                  Add CSE
          </Button>
      <CSETable />
    </Container>
  );
};

export default CSE;

