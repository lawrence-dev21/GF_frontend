import { Stack } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";
import DisForm from "./Disclaimer";

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
        <SimpleCard title="Disclaimer Form">
          <DisForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
