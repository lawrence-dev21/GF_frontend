
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
import { isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addBeneficiary } from '../../../redux/actions/BeneficiaryActions'
import { useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
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
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
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
    categoryId,
    parentFirstName,
    parentLastName,
    parentNRC,
    parentMobile,
    parentAddress,
  } = state;

  const [schools, setSchools] = useState([])
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState(null)

  useEffect(() => {
    if(schools.length === 0 && categories.length === 0){
      setState({...state, gender:'Male'})
      axios.get('/api/schools')
           .then(({data}) => {
             setSchools(data)
          })
      axios.get('/api/categories')
           .then(({data}) => { setCategories(data)})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentNRC])


  useEffect(() => {
    if(parent){
      setState({
        ...state,
        parentFirstName: parent?.firstName,
        parentLastName: parent?.lastName,
        parentAddress: parent?.address,
        parentMobile: parent?.mobile,
        parentId: parent?.parentId,
        parentUserId: parent?.id,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
