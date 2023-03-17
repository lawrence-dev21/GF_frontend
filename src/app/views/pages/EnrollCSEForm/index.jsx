import { Stack } from "@mui/material";
import {styled } from "@mui/system";
import { SimpleCard } from "app/components";
import axiosInstance from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EnrollForm from "./EnrollForm"

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const EnrollCSEForm = () => {
const { id } = useParams()
const [cse, setCse] = useState(null)

useEffect(() => {
  axiosInstance
  .get(`${process.env.REACT_APP_BACKEND}api/cses/${id}?populate[0]=grades`)
  .then((res) => {
      console.log('Getting response for cse',res.data)
      setCse(res.data)
    })
  .catch((err) => {
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <Container>
     <Stack spacing={3}>
        <SimpleCard title="CSE: Enroll Student">
          {cse && <EnrollForm cseProp={cse} />}
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default EnrollCSEForm;
