import { Stack } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";

import LearnerPDFGenerator from "./LearnerPDFGenerator";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Generatechecklist = () => {
  return (
    <Container>
     <Stack spacing={3}>
        <SimpleCard title="Payment Checklists Generation">
          <LearnerPDFGenerator />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default Generatechecklist;
