import { Stack, Grid, Button, Typography, Box } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";
import SchoolForm from "./SchoolForm";
import { useNavigate } from 'react-router-dom'

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AddSchoolForm = () => {
  return (
    <Container>
     <Stack spacing={3}>
        <SimpleCard title="Add School">
        {/* <Box style={{display: 'flex', alignItems: 'center'}}>
              <ArrowBack onClick={() => { navigate('/users') }}/> 
              <Typography style={{ paddingLeft: '5px' }}>Add Users</Typography>
            </Box>*/}
          <SchoolForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AddSchoolForm;
