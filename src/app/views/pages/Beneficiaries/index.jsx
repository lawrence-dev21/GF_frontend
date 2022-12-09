
import {styled } from "@mui/system";
import BeneficiaryTable from "./BeneficiaryTable";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Beneficiaries = () => {
  return (
    <Container>
         <BeneficiaryTable />
    </Container>
  );
};

export default Beneficiaries;

