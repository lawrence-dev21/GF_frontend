
import {
  Button,
  FormControlLabel,
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
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { base64ToImage, isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addModule } from '../../../redux/actions'
import { useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios'

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const ModuleForm = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useTitle(': Add Module')
  const dispatch = useDispatch()
  const [ spacing ] = useState({
    paddingTop: isMobile() ? '12px' : '24px',
    paddingTopUnder: '12px',
    paddingTopUnderSelect: isMobile() ? '28px' : '12px',
    paddingTopSelect: isMobile() ? '28px' : '24px',
    marginTop: isMobile() ? 0 : 4
  })
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    setLoading(true)
    console.log('New Module:', state)
    dispatch(addModule(state))    
    setTimeout(() => {

      enqueueSnackbar('Module sucessfully entered', { variant: 'success'})
      navigate('/modules')
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
  setState({ ...state, file: btoa(binaryString)})
}

  const handleChange = (event) => {
    if(event.persist)
      event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const {
    title,
    file,
    categoryId,
    description
  } = state;

  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    if(categories.length === 0){
      console.log('Fetching categories')
      axios.get(`/api/categories`)
            .then(({data}) => {setCategories(data)})
    }
  }, [])

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Divider />
      <h4 style={{marginTop: '16px'}}>File Upload</h4>
      <Grid container spacing={6}>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 4, pt: 0 }} style={{paddingTop: spacing.paddingTop}}>
          <input
            type="file"
            name="fileUpload"
            onChange={handleFileUpload}
            style={{marginTop: '4px', marginBottom: '16px'}}
          />
        </Grid>
      </Grid>
      <Divider style={{marginTop: '8px'}} />
      <h4 style={{marginTop: '16px'}}>Module Details</h4>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
            <TextField
              type="text"
              name="title"
              label="Title"
              onChange={handleChange}
              value={title || ""}
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
              name="description"
              label="Description"
              onChange={handleChange}
              value={description || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
          <Divider />
          <h4 style={{marginTop: '16px'}}>Category Details</h4>
          <Grid container spacing={6} style={{marginBottom: '24px'}}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4, pt: 0 }}  style={{paddingTop: spacing.paddingTop}}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="category-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Category</InputLabel>
                <Select
                  labelId="category-select"
                  id="mtx-category-select"
                  name="categoryId"
                  value={categoryId || ""}
                  label="Category"
                  disabled={categories.length === 0}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      notched
                      labelWidth={labelWidth}
                      name="age"
                      id="category-select"
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

        <Button color="primary" variant="contained" type="submit" disabled={loading}>
          <Span sx={{ textTransform: "capitalize" }}>{loading ? (<CircularProgress style={{ margin: 'auto', height: 15, width: 15, color: 'white'}}/>) : 'Submit'}</Span>
        </Button>

      </ValidatorForm>
    </div>
  );
};

export default ModuleForm;
