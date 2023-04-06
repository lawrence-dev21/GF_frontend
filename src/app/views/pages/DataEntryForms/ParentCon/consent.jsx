
import {
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    styled,
  } from "@mui/material";
  import { Span } from "app/components/Typography";
  import { useEffect, useState } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const ConsentForm = () => {
    const [state, setState] = useState({ date: new Date() });
  
    useEffect(() => {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== state.password) return false;
  
        return true;
      });
      return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);
  
    const handleSubmit = (event) => {
      // console.log("submitted");
      // console.log(event);
    };
  
    const handleChange = (event) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };
  
  
    const {
      cfirstName,
      clastName,
      pfirstName,
      plastName,
      physicaladdress,
      password,
      gender,
    } = state;
  
    return (
      <div>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
  
              <TextField
                type="text"
                name="firstName"
                label="Child's First Name"
                onChange={handleChange}
                value={cfirstName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
                <TextField
                type="text"
                name="lastName"
                label="Child's Last Name"
                onChange={handleChange}
                value={clastName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              
              <TextField
                type="text"
                name="firstName"
                label="Parent/Guardian’s First Name"
                onChange={handleChange}
                value={pfirstName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
                <TextField
                type="text"
                name="lastName"
                label="Parent/Guardian’s Last Name"
                onChange={handleChange}
                value={plastName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
           
            <TextField
                type="text"
                name="lastName"
                label="Physical Address"
                onChange={handleChange}
                value={physicaladdress || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                value={password || ""}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <RadioGroup
                row
                name="gender"
                sx={{ mb: 2 }}
                value={gender || ""}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  label="Male"
                  labelPlacement="end"
                  control={<Radio color="primary" />}
                />
  
                <FormControlLabel
                  value="Female"
                  label="Female"
                  labelPlacement="end"
                  control={<Radio color="primary" />}
                />
              </RadioGroup>
            </Grid>
          </Grid>
  
          <Button color="primary" variant="contained" type="submit">
            <Span sx={{ textTransform: "capitalize" }}>Submit</Span>
          </Button>
        </ValidatorForm>
      </div>
    );
  };
  
  export default ConsentForm;
  