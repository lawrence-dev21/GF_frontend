import { Stack } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";
import CSEForm from "./CSEForm"


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AddCSEForm = () => {
  return (
    <Container>
     <Stack spacing={3}>
        <SimpleCard title="Add SRH">
          <CSEForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AddCSEForm;
