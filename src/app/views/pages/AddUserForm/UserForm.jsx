
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Divider
} from "@mui/material";
import { Span } from "app/components/Typography";
import {  useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { base64ToImage } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addUser } from '../../../redux/actions/UserActions'
import { useDispatch  } from 'react-redux'


const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const UserForm = () => {
  const [state, setState] = useState({});
  const title = useTitle(': Add User')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    dispatch(addUser(state))    
  };


const handleFileUpload = (event) =>{
    event.persist();
    console.log(event.target)
      const file = event.target.files[0]
      if(file){
        console.log('File Exists')
        const reader = new FileReader();
        console.log('File Reader initiated')
        reader.onload =  _handleReaderLoaded
        console.log('File Reader loaded')
        reader.readAsBinaryString(file)
      }
    }

const _handleReaderLoaded = (readerEvent) => {
  let binaryString = readerEvent.target.result
  setState({ ...state, avatar: base64ToImage(btoa(binaryString))})
}

  const handleChange = (event) => {
    if(event.persist)
      event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

const [systemRoles] = useState ([
                          {value: 'SA', label: 'Super Admin'},
                          {value: 'ADMIN', label: 'Admin'},
                          {value: 'EDITOR', label: 'Editor'},
                          {value: 'GUEST', label: 'Guest'},
                      ])

  const {
    avatar,
    firstName,
    lastName,
    email,
    nrc,
    gender,
    role,
    position,
    mobile,
    dateOfBirth,
    password,
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Divider />
       <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 4 }}>
            <h4 style={{marginTop: '4px'}}>Profile Image Upload</h4>
            <input
              type="file"
              name="profileImage"
              onChange={handleFileUpload}
              style={{marginTop: '4px', marginBottom: '16px'}}
            />
          </Grid>
        </Grid>
      <Divider />
         <h4 style={{marginTop: '16px'}}>Login Details</h4>
         <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
            <TextField
                type="email"
                name="email"
                label="Email"
                value={email || ""}
                onChange={handleChange}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
                InputLabelProps={{
                  shrink: true,
                }}
              />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
           <TextField
              name="password"
              type="password"
              label="Password"
              value={password || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
              
      <Divider style={{marginTop: '8px'}} />
       <h4 style={{marginTop: '16px'}}>Personal Details</h4>
        <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                onChange={handleChange}
                value={firstName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="number"
                name="nrc"
                label="National Registration Number"
                onChange={handleChange}
                value={nrc || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
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

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
                <TextField
                type="text"
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                value={lastName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
              />
                <TextField
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={handleChange}
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
        </Grid>
      <Divider />
         <h4 style={{marginTop: '16px'}}>Job Details</h4>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
              <TextField
                type="text"
                name="position"
                label="Job Position"
                onChange={handleChange}
                value={position || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
          </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>

             <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={role || ""}
                  label="Role"
                  onChange={handleChange}
                >
                  {systemRoles && systemRoles.map(role =>
                    <MenuItem value={role.value} key={role.value}>{role.label}</MenuItem>
                  )}
                </Select>
            </FormControl>

          </Grid>
        </Grid>
          <Divider />
         <h4 style={{marginTop: '16px'}}>Contact Details</h4>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
            <TextField
              type="text"
              name="mobile"
              value={mobile || ""}
              label="Mobile Number"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default UserForm;
