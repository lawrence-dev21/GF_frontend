import { Stack, Grid, Button, Typography, Box } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";
import UserForm from "./UserForm";
import { useNavigate } from 'react-router-dom'

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AddUserForm = () => {
  return (
    <Container>
     <Stack spacing={3}>
        <SimpleCard title="Add Users">
        {/* <Box style={{display: 'flex', alignItems: 'center'}}>
              <ArrowBack onClick={() => { navigate('/users') }}/> 
              <Typography style={{ paddingLeft: '5px' }}>Add Users</Typography>
            </Box>*/}
          <UserForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AddUserForm;
