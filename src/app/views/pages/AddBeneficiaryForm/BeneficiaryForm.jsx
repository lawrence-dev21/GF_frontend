
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
import { useSnackbar } from 'notistack';
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { base64ToImage, isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addUser } from '../../../redux/actions/UserActions'
import { useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authRoles } from 'app/auth/authRoles'
import useAuth from 'app/hooks/useAuth'

import axios from 'axios'
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const BeneficiaryForm = () => {
  const { user } = useAuth()
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useTitle(': Add Beneficiary')
  const dispatch = useDispatch()
  const [ spacing ] = useState({
    paddingTop: isMobile() ? '12px' : '24px',
    paddingTopUnder: '12px',
    paddingTopUnderSelect: isMobile() ? '28px' : '12px',
    marginTop: isMobile() ? 0 : 4
  })
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    dispatch(addUser(state))
    setTimeout(() => {

    enqueueSnackbar('User sucessfully entered', { variant: 'success'})
    navigate('/users')
    setLoading(false)
  }, 500)
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

  const handleChangeParentNRC = (event) => {
      handleChange(event)
      const parentNRC = event.target.value

      // fetch the user with the nrc x

  };




const [systemRoles] = useState (authRoles.sa.includes(user.role) ?
                          [{value: 'SA', label: 'Super Admin'},
                          {value: 'ADMIN', label: 'HQ'},
                          {value: 'EDITOR', label: 'School Admin'},
                          {value: 'GUEST', label: 'Learner'},]
                        : [{value: 'EDITOR', label: 'School Admin'},
                          {value: 'GUEST', label: 'Learner'},])

  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    schoolId,
    categoryId,
    parentFirstName,
    parentLastName,
    parentNRC,
    parentMobile,
    parentDateOfBirth,
  } = state;

  const [schools, setSchools] = useState([])
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState(null)

  useEffect(() => {
    if(schools.length === 0 && categories.length === 0){
      axios.get('/api/schools')
           .then(({data}) => { setSchools(data)})
      axios.get('/api/categories')
           .then(({data}) => { setCategories(data)})
    }
  },[schools.length, categories.length])



  useEffect(() => {
    if(parentNRC)
    if(parentNRC.length >= 2){
      console.log('Fetching Parent')
    axios.get('api/users?nrc='+ parentNRC)
      .then(({data}) => {
        if(data){
          parent !== data && setParent(data)
        } else {
          parent && setParent(null)
        }
      })
    }
  }, [parentNRC])


  useEffect(() => {
    if(parent){
      setState({ ...state, parentFirstName: parent.firstName });
    }
  },[parent])
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

      <Divider style={{marginTop: '8px'}} />
       <h4 style={{marginTop: '16px'}}>Beneficiary Details</h4>
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
      <Divider />
      <h4 style={{marginTop: '16px'}}>Beneficiary School Details</h4>

      <Grid container spacing={6}>
         <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }} style={{paddingTop: spacing.paddingTop}}>
            <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="school-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Insitution</InputLabel>
                <Select
                  labelId="school-select"
                  id="mtx-school-select"
                  name="schoolId"
                  value={schoolId || ""}
                  label="School"
                  disabled={schools.length === 0}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      notched
                      labelWidth={labelWidth}
                      name="school"
                      id="school-select"
                    />
                  }
                >
                  {schools && schools.map(school =>
                    <MenuItem value={school.id} key={school.id}>{school.name}</MenuItem>
                  )}
                  </Select>
              </FormControl>

          </Grid>


          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }} style={{paddingTop: spacing.paddingTop}}>
            <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="category-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Grade</InputLabel>
                <Select
                  labelId="category-select"
                  id="mtx-category-select"
                  name="categoryId"
                  value={categoryId || ""}
                  label="Grade"
                  disabled={categories.length === 0}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      notched
                      labelWidth={labelWidth}
                      name="categories"
                      id="categories-select"
                    />
                  }
                >
                  {categories && categories.map(category =>
                    <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                  )}
                  </Select>
              </FormControl>

          </Grid>
     </Grid>

     <Divider style={{marginTop: '16px'}}/>

     <h4 style={{marginTop: '16px'}}>Parent Details</h4>
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnder}}>
              <TextField
                type="text"
                name="parentNRC"
                label="National Registration Number"
                onChange={handleChange}
                value={parentNRC || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <p>{parent ? JSON.stringify(parent): 'No Parents :('}</p>
        </Grid>
      <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
              <TextField
                type="text"
                name="parentFirstName"
                label="Parent First Name"
                onChange={handleChange}
                value={parentFirstName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!parent}
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

export default BeneficiaryForm;
