import { Stack } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";
import TransferForm from "./Tansfersform";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {
  return (
    <Container>
      <Stack spacing={3}>
        <SimpleCard title="Add User">
          <TransferForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
