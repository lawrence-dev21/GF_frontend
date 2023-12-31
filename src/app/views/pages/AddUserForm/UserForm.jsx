
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
  Divider,
  OutlinedInput,
  CircularProgress
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useSnackbar } from 'notistack';
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addUser } from '../../../redux/actions/UserActions'
import { useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import { authRouteParams } from "app/utils/authRoutes";
import axiosInstance from "axios";
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const UserForm = () => {
  const { user } = useAuth()
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useTitle(': Add User')
  const dispatch = useDispatch()
  const [ spacing ] = useState({
    paddingTop: isMobile() ? '12px' : '24px',
    paddingTopUnder: '12px',
    paddingTopUnderSelect: isMobile() ? '28px' : '12px',
    marginTop: isMobile() ? 0 : 4
  })
  const inputLabel = useRef(null);
  const [labelwidth, setLabelwidth] = useState(0);
  useEffect(() => {
    setLabelwidth(inputLabel.current.offsetWidth);
  }, []);
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log(state.school)
    dispatch(addUser(state))    
    setTimeout(() => {

    enqueueSnackbar('User sucessfully entered', { variant: 'success'})
    navigate('/users')
    setLoading(false)
  }, 500)
  };
  const handleFileSelect = (event) => {
    event.persist();
    const file = event.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append('files', file);
      setState({...state, file: formData});
    }
    setSelectedFile(file ? file.name : null);
  };

  const [selectedFile, setSelectedFile] = useState(null);


// const handleFileUpload = (event) =>{
//     event.persist();
//     console.log(event.target)
//       const file = event.target.files[0]
//       if(file){
//         console.log('File Exists')
//         const reader = new FileReader();
//         console.log('File Reader initiated')
//         reader.onload =  _handleReaderLoaded
//         console.log('File Reader loaded')
//         reader.readAsBinaryString(file)
//       }
//     }

// const _handleReaderLoaded = (readerEvent) => {
//   let binaryString = readerEvent.target.result
//   setState({ ...state, avatar: base64ToImage(btoa(binaryString))})
// }

  const handleChange = (event) => {
    if(event.persist)
      event.persist();
    
    setState({ ...state, [event.target.name]: event.target.value });
  };



const [systemRoles, setSystemRoles] = useState ([])

  const {
    username,
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
    school
  } = state;

  const [schools, setSchools] = useState([])
  const [roles] = useState([])

  
  useEffect(() => {
    // fetch the schools
    if(schools.length === 0){
      axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/schools`)
           .then(res => {
            console.log(res.data)
            const {data} = res.data
            const systemSchools = (data.map(schoolItem => {return {value: schoolItem.id, label: schoolItem.attributes.name}}))
             setSchools(systemSchools)
            })
    }
    // fetch the roles
    if(roles.length === 0) {
      console.log('User', user)
      const rolesParams = authRouteParams.getRolesSelect(user)
      axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/users-permissions/roles?${rolesParams}`)
                .then(res => {
                  const { roles } = res.data
                  const systemRoles = roles.map(userRole => { return {value: userRole.id, label: userRole.name}})
                  setSystemRoles(systemRoles)
                  })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[schools.length])

  

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Divider />
        <h4 style={{marginTop: '16px'}}>Profile Image Upload</h4>
        <Grid container spacing={9}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 4, pt: 0 }} style={{paddingTop: spacing.paddingTop}}>
          <Button variant="contained" aria-label="upload picture" component="label">
        <input hidden accept="image/*"type="file" onChange={handleFileSelect}/>
        <PhotoCamera/>
           </Button>
             {selectedFile && <p>file: {selectedFile}</p>}
           
          </Grid>
        </Grid>


      <Divider />
         <h4 style={{marginTop: '16px'}}>Login Details</h4>
         <Grid container spacing={6}>
         <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }} style={{paddingTop: spacing.paddingTop}}>
            <TextField
                type="username"
                name="username"
                label="Username"
                value={username || ""}
                onChange={handleChange}
                validators={["required"]}
              errorMessages={["this field is required", "username is not valid"]}
                InputLabelProps={{
                  shrink: true,
                }}
              />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }} style={{paddingTop: spacing.paddingTop}}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }} style={{paddingTop: spacing.paddingTop}}>
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
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
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

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTop}}>
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

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnder}}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnder}}>
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
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }} style={{paddingTop: spacing.paddingTop}}>
            <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="school-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Insitution</InputLabel>
                <Select
                  labelId="school-select"
                  id="mtx-school-select"
                  name="schoolId"
                  value={school || ""}
                  label="School"
                  disabled={schools.length === 0}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      notched
                      labelwidth={labelwidth}
                      name="school"
                      id="school-select"
                    />
                  }
                >
                  {schools && schools.map(schoolItem =>
                    <MenuItem value={schoolItem.value} key={schoolItem.value}>{schoolItem.label}</MenuItem>
                  )}
                  </Select>
              </FormControl>
  
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnderSelect}}>
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
                      labelwidth={labelwidth}
                      name="role"
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
        <Divider style={{marginTop: '24px'}} />
         <h4 style={{marginTop: '16px'}}>Contact Details</h4>
        <Grid container spacing={6} style={{marginBottom: '24px'}}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
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

        <Button color="primary" variant="contained" type="submit" disabled={loading}>
          <Span sx={{ textTransform: "capitalize" }}>{loading ? (<CircularProgress style={{ margin: 'auto', height: 15, width: 15, color: 'white'}}/>) : 'Submit'}</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default UserForm;
