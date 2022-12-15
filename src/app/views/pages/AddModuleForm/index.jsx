import { Stack, Grid, Button, Typography, Box } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";
import ModuleForm from "./ModuleForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AddModuleForm = () => {
  return (
    <Container>
     <Stack spacing={3}>
        <SimpleCard title="Add Module">
          <ModuleForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AddModuleForm;
