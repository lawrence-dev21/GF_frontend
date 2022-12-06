
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
  
  const TransferForm = () => {
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
      firstName,
      lastName,
      role,
      mobile,
      password,
      gender,
      email,
    } = state;
  
    return (
      <div>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
  
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                onChange={handleChange}
                value={firstName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
                <TextField
                type="text"
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                value={lastName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="email"
                name="email"
                label="Email"
                value={email || ""}
                onChange={handleChange}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              
              <TextField
                type="text"
                name="role"
                label="Role"
                onChange={handleChange}
                value={role || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="mobile"
                value={mobile || ""}
                label="Mobile Nubmer"
                onChange={handleChange}
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
  
  export default TransferForm;
  