
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
  Divider,
  OutlinedInput
} from "@mui/material";
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { base64ToImage, isMobile, isMdScreen } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addUser } from '../../../redux/actions/UserActions'
import { useDispatch  } from 'react-redux'

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const SchoolForm = () => {
  const [state, setState] = useState({});
  const title = useTitle(': Add School')
  const dispatch = useDispatch()
  const [ spacing ] = useState({
    paddingTop: isMobile() ? '12px' : '24px',
    paddingTopUnder: '12px',
    marginTop: isMobile() ? 0 : 4
  })
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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
        <h4 style={{marginTop: '16px'}}>Profile Image Upload</h4>
       <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 4, pt: 0 }} style={{paddingTop: spacing.paddingTop}}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }} style={{paddingTop: spacing.paddingTop}}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop, pt: 0 }} style={{paddingTop: spacing.paddingTop}}>
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
        <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
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
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
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
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop, pt: 0 }}  style={{paddingTop: spacing.paddingTopUnder}}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop, pt: 0 }}  style={{paddingTop: spacing.paddingTopUnder}}>
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

        </Grid>
      <Divider />
         <h4 style={{marginTop: '16px'}}>Job Details</h4>
        <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
              <TextField
                type="text"
                name="position"
                label="Job Position"
                onChange={handleChange}
                value={position || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                  InputLabelProps={{
                  shrink: true,
                }}
              />
          </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>

             <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="role-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Role</InputLabel>
                <Select
                  labelId="role-select"
                  id="mtx-role-select"
                  name="role"
                  value={role || ""}
                  label="Role"
                  onChange={handleChange}
                   input={
                    <OutlinedInput
                      notched
                      labelWidth={labelWidth}
                      name="age"
                      id="role-select"
                    />}
                >
                  {systemRoles && systemRoles.map(role =>
                    <MenuItem value={role.value} key={role.value}>{role.label}</MenuItem>
                  )}
                </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider style={{marginTop: '16px'}} />
         <h4 style={{marginTop: '16px'}}>Contact Details</h4>
        <Grid container spacing={6} style={{marginBottom: '24px'}}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
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

export default SchoolForm;
