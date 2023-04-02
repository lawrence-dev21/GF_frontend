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
  import { Span } from "app/components/Typography";
  import {  useState, useRef, useEffect } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  import { isMobile } from '../../../utils/utils'
  import { useTitle } from '../../../hooks/useTitle'
  import { addModule } from '../../../redux/actions'
  import { useDispatch  } from 'react-redux'
  import { useNavigate } from 'react-router-dom';
  import { useSnackbar } from 'notistack';
  import axiosInstance from "axios";

  const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));

  
   

  const ModuleForm = () => {
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
    

    // setSelectedFile(file ? file.name : null);
    
    const [selectedFile, setSelectedFile] = useState(null);

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
    const [labelwidth, setLabelwidth] = useState(0);
    useEffect(() => {
      setLabelwidth(inputLabel.current.offsetWidth);
    }, []);
      const navigate = useNavigate();

    const handleSubmit = (event) => {
      // upload the file first
      setLoading(true)
      axiosInstance.post('http://localhost:1337/api/upload', state.file)
                    .then(res => {
                      const newobject = {
                        title: state.title,
                        data: res.data[0].url,
                        grades: categoriesSelection,
                        description: state?.description
                      }
                        dispatch(addModule(newobject))  
                    })

      setTimeout(() => {
        enqueueSnackbar('Module sucessfully entered', { variant: 'success'})
        navigate('/modules')
        setLoading(false)
      }, 500)
    };


  // const handleFileUpload = (event) =>{
  //     event.persist();
  //     console.log(event.target)
  //       const file = event.target.files[0]
  //       if(file){
  //         let formData = new FormData();
  //         formData.append('files', file)
  //         setState({...state, file: formData})
  //       }
  //     }


  // const _handleReaderLoaded = (readerEvent) => {
  //   let base64String = readerEvent.target.result.toString('base64')
  //   setState({...state, file: base64String})
  //   console.log(base64String)

  // }



    const handleChange = (event) => {
      if(event.persist)
        event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };

    const {
      title,
    description
    } = state;

    const [ categories, setCategories ] = useState([])
    const [ categoriesSelection, setCategoriesSelection ] = useState([])


    useEffect(() => {
      if(categories.length === 0){
        console.log('Fetching categories')
        axiosInstance.get(`http://localhost:1337/api/grades`)
              .then(({data:{data}}) => {setCategories(data.map(grade =>{
                return {value: grade.id, label: grade.attributes.name}
              }))})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Divider />
        <h4 style={{marginTop: '16px'}}>File Upload</h4>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 4, pt: 0 }} style={{paddingTop: spacing.paddingTop}}>
          <Button variant="contained" component="label">
        Upload
        <input hidden accept=".pdf" type="file" onChange={handleFileSelect}/>
           </Button>
             {selectedFile && <p>file: {selectedFile}</p>}
           
            {/* <input
              type="file"
              name="fileUpload"
              onChange={handleFileUpload}
              style={{marginTop: '4px', marginBottom: '16px'}}
            /> */}
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
                    multiple
                    labelId="category-select"
                    id="mtx-category-select"
                    name="categoryId"
                    value={categoriesSelection}
                    label="Category"
                    
                    disabled={categories.length === 0}
                    onChange={(e) => {
                      console.log(e.target.value)
                      setCategoriesSelection(e.target.value)}}
                    input={
                      <OutlinedInput
                        notched
                        labelwidth={labelwidth}
                        name="age"
                        id="category-select"
                      />
                    }
                    
                  >
                    {categories && categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
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
