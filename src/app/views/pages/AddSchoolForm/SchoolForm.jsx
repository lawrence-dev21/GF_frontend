
import {
  Button,
  Grid,
  styled,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  OutlinedInput,
  CircularProgress
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom'
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { base64ToImage, isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addSchool } from '../../../redux/actions'
import { useDispatch  } from 'react-redux'
import axiosInstance from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const SchoolForm = () => {
	
  const { enqueueSnackbar } = useSnackbar();
    
  
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  useTitle(': Add School')
  
  const dispatch = useDispatch()
  const [ spacing ] = useState({
    paddingTop: isMobile() ? '12px' : '24px',
    paddingTopUnder: '12px',
    paddingTopUnderSelect: isMobile() ? '28px' : '12px',
    paddingTopSelect: isMobile() ? '28px' : '24px',
    marginTop: isMobile() ? 0 : 4
  })
  const inputLabel = useRef(null);
  const [labelwidth, setLabelwidth] = useState(0);
  useEffect(() => {
    setLabelwidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = async (event) => {
    const message = await dispatch(addSchool({...state, province: state.provinceId, district: state.districtId}))
    if(message.message)
    enqueueSnackbar(message.message, {variant: 'error'})
    setLoading(false)
  }



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

  const {
    name,
    emisId,
    districtId,
    provinceId
  } = state;

  // const [selectLoading, setSelectLoading ] = useState(false)
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
 
  }, [provinces.length])

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
  }, [provinceId])
  

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
      <Divider style={{marginTop: '8px'}} />
      <h4 style={{marginTop: '16px'}}>School Details</h4>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
            <TextField
              type="text"
              name="name"
              label="Name"
              onChange={handleChange}
              value={name || ""}
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
              name="emisId"
              label="EMIS ID"
              onChange={handleChange}
              value={emisId || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
          <Divider />
          <h4 style={{marginTop: '16px'}}>Location Details</h4>
          <Grid container spacing={6} style={{marginBottom: '24px'}}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop, pt: 0 }}  style={{paddingTop: spacing.paddingTopSelect}}>
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
      </Grid>


        <Button color="primary" variant="contained" type="submit" disabled={loading}>
          <Span sx={{ textTransform: "capitalize" }}>{loading ? (<CircularProgress style={{ margin: 'auto', height: 15, width: 15, color: 'white'}}/>) : 'Submit'}</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SchoolForm;
