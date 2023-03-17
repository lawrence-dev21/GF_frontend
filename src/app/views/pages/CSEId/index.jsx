
import { Grid, Chip, Box, Popover, Button, IconButton, Paper, Modal, TableContainer, Typography, TableBody, TableCell, Table, TableRow, TableHead, Select, MenuItem } from "@mui/material";
import {styled } from "@mui/system";
import { CSEStudentsTable, CSEAttendenceTable } from "./components";
import { useNavigate, useParams } from "react-router-dom";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CSEId = () => {
  const navigate  = useNavigate()
  const { id } = useParams()
  return (
    <Container>
        <div className="">
          <Typography variant="h5">CSE {id}</Typography>
          <Button
                    sx={{mb: 2, mt: 2, mr: 4}}
                    size="large"
                    variant="contained"
                    color="primary"
                       onClick={() => {
                        navigate('/cse')
                    }}
                >
                    Back
          </Button>
          <Button
                    sx={{mb: 2, mt: 2}}
                    size="large"
                    variant="contained"
                    color="primary"
                       onClick={() => {
                        navigate('/cse-attendence/'+id);
                    }}
                >
                    Take Attendence
          </Button>
          {/* <CSEAttendenceTable cseId={id} /> */}
        </div>

      {/* Enrollment */}
      <Box sx={{mt: 4}}>
        <Typography variant="h5">CSE Student List</Typography>
        <Button
                    sx={{mb: 2, mt: 2}}
                    size="large"
                    variant="contained"
                    color="primary"
                       onClick={() => {
                        navigate('/enroll-cse/'+ id);
                    }}
                >
                    Enroll Student
          </Button>
        <CSEStudentsTable cseId={id} />
      </Box>
    </Container>
  );
};

export default CSEId;

