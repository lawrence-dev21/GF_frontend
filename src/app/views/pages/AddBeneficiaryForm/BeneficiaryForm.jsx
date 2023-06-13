
import {
  Button,
  Box,
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
  CircularProgress,
  Icon
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


import { useSnackbar } from 'notistack';
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addBeneficiary } from '../../../redux/actions/BeneficiaryActions'
import { useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import axiosInstance from "axios";
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const BeneficiaryForm = () => {
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
  const [labelwidth, setLabelwidth] = useState(0);
  useEffect(() => {
    setLabelwidth(inputLabel.current.offsetWidth);
  }, []);
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    dispatch(addBeneficiary(state))
    setTimeout(() => {

    enqueueSnackbar('Beneficiary sucessfully entered', { variant: 'success'})
    navigate('/beneficiaries')
    setLoading(false)
  }, 500)
  };



  const handleChange = (event) => {
    if(event.persist)
      event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };


const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    schoolId,
    gradeId,
    parentFirstName,
    parentLastName,
    districtId,
    provinceId,
    parentNRC,
    parentMobile,
    parentAddress,
  } = state;

  const [schools, setSchools] = useState([])
  const [grades, setGrades] = useState([])
  const [parent, setParent] = useState(null)
  const [ provinces, setProvinces ] = useState([])
  const [ districts, setDistricts ] = useState([])

  useEffect(() => {
    if(provinces.length === 0){
      console.log('Fetching Provinces')
      axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/provinces`)
      .then(({data: {data}}) => {
        console.log(data)
        setProvinces(data.map(province => {
          return {label: province.attributes.name, value: province.id}
        }))})
      }
 
  }, [provinces.length]);

  useEffect(() => {
    if(provinceId){ 
      const param = encodeURI(`?filters[province][id][$eq]=${provinceId}`)
      console.log(encodeURI(param))
      const accessToken = localStorage.getItem('accessToken')
      fetch(`${process.env.REACT_APP_BACKEND}api/districts${param}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }      
      })
      .then(res => res.json()) 
      .then(({data}) => {
        console.log(data)
        setDistricts(data.map(district => {
          return {label: district.attributes.name, value: district.id}
        }))
      })
    }
  }, [provinceId]);

  useEffect(() => {
    if(districtId){ 
      const param = encodeURI(`?filters[district][id][$eq]=${districtId}`)
      console.log(encodeURI(param))
      const accessToken = localStorage.getItem('accessToken')
      fetch(`${process.env.REACT_APP_BACKEND}api/schools${param}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }      
      })
      .then(res => res.json()) 
      .then(({data}) => {
        console.log(data)
        setSchools(data.map(school => {
          return {label: school.attributes.name, value: school.id}
        }))
      })
    }
  }, [districtId]);
  

  useEffect(() => {
    if(schools.length === 0 && grades.length === 0){
      setState({...state, gender:'Male'})
          axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/grades`)
          .then(({data: {data}}) => {
               setGrades(data.map(grade => {
                return {label: grade.attributes.name, value: grade.id}
               }))
            })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[schools.length, grades.length])



  useEffect(() => {
    if(parentNRC)
    if(parentNRC.length >= 0){
      console.log('Fetching Parent')
    axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/users?limit=1&populate[0]=parent&filters[nrc][$startsWith]=`+ parentNRC)
      .then(({data}) => {
        const [ parentUser ] = data
        if(parentUser){
          const address = parentUser?.parent ? parentUser?.parent.address : ''
          const newParent = {
            firstName: parentUser.firstName,
            lastName: parentUser.lastName,
            mobile: parentUser.mobile,
            address: address
          }
          parent !== newParent && setParent(newParent) 
        } else {
          parent && setParent(null)
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentNRC])


  useEffect(() => {
    if(parent){
      setState({
        ...state,
        parentFirstName: parent?.firstName,
        parentLastName: parent?.lastName,
        parentMobile: parent?.mobile,
        parentAddress: parent?.address,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[parent])

  return (
    <div>
      <ValidatorForm debounceTime={500} onSubmit={handleSubmit} onError={() => null}>

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
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnder}}>
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
      <h4 style={{marginTop: '16px'}}>Beneficiary School Details</h4>

      <Grid container spacing={6}>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="province-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Province</InputLabel>
                <Select
                  labelId="province-select"
                  id="mtx-province-select"
                  name="provinceId"
                  value={provinceId || ""}
                  label="Province"
                  disabled={provinces.length === 0}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      notched
                      labelwidth={labelwidth}
                      name="age"
                      id="province-select"
                    />
                  }
                >
                  {provinces && provinces.map(province =>
                    <MenuItem value={province.value} key={province.value}>{province.label}</MenuItem>
                  )}
                </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink ref={inputLabel} htmlFor="district-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>District</InputLabel>
              <Select
                labelId="district-select"
                id="mtx-district-select"
                name="districtId"
                value={districtId || ""}
                label="District"
                onChange={handleChange}
                disabled={districts.length === 0}
                input={
                  <OutlinedInput
                    notched
                    labelwidth={labelwidth}
                    name="district"
                    id="district-select"
                  />
                }
              >
                {districts && districts.map(district =>
                  <MenuItem value={district.value} key={district.value}>{district.label}</MenuItem>
                )}
              </Select>
            </FormControl>
        </Grid>
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
                      labelwidth={labelwidth}
                      name="school"
                      id="school-select"
                    />
                  }
                >
                  {schools && schools.map(school =>
                    <MenuItem value={school.value} key={school.value}>{school.label}</MenuItem>
                  )}
                  </Select>
              </FormControl>

          </Grid>


          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }} style={{paddingTop: spacing.paddingTop}}>
            <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="grade-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Grade</InputLabel>
                <Select
                  labelId="grade-select"
                  id="mtx-grade-select"
                  name="gradeId"
                  value={gradeId || ""}
                  label="Grade"
                  disabled={grades.length === 0}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      notched
                      labelwidth={labelwidth}
                      name="grades"
                      id="grades-select"
                    />
                  }
                >
                  {grades && grades.map(grade =>
                    <MenuItem value={grade.value} key={grade.value}>{grade.label}</MenuItem>
                  )}
                  </Select>
              </FormControl>

          </Grid>
     </Grid>

     <Divider style={{marginTop: '16px'}}/>

     <h4 style={{marginTop: '16px'}}>Parent/Guardian Details</h4>
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnder}}>
              <TextField
                type="text"
                name="parentNRC"
                label="National Registration Number"
                onChange={handleChange}
                value={parentNRC || ""}
                validators={["required", "matchRegexp:^\\d{8}1$"]}
                errorMessages={["This field is required", "Input must be 9 digits and end with 1"]}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
   <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
    {
        parent ?
        <Box style={{alignItems: 'center', display: 'flex'}}>
            <Icon style={{ color: "#A2F0A2"}}>
                <CheckCircleIcon />
            </Icon>
            <p style={{marginLeft: 4}}>{`Parent Found ${parent.nrc}`}</p>
        </Box>
        : <Box style={{alignItems: 'center', display: 'flex'}}>
            <Icon style={{ color: "#8282F0"}}>
                <CancelIcon />
            </Icon>
            <p style={{marginLeft: 4}}>No Record Exist</p>
        </Box>
    }
</Grid>
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
                style={{backgroundColor: parent && '#F0F0F0'}}
                disabled={parent}
              />
            </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
              <TextField
                type="text"
                name="parentLastName"
                label="Parent Last Name"
                onChange={handleChange}
                value={parentLastName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{backgroundColor: parent && '#F0F0F0'}}
                disabled={parent}
              />
        </Grid>

      </Grid>
      <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
              <TextField
                type="text"
                name="parentAddress"
                label="Address"
                onChange={handleChange}
                value={parentAddress || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{backgroundColor: (parent && parent?.address) &&  '#F0F0F0'}}
                disabled={parent && parent?.address}
              />
            </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingTop: spacing.paddingTop}}>
              <TextField
                type="text"
                name="parentMobile"
                label="Mobile Number"
                onChange={handleChange}
                value={parentMobile || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{backgroundColor: (parent && parent?.mobile) && '#F0F0F0'}}
                disabled={parent && parent?.mobile}
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
