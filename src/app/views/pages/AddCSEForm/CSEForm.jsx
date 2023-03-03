
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
  CircularProgress,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import useAuth from 'app/hooks/useAuth'
import { useSnackbar } from 'notistack';
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addCSEAttendence } from '../../../redux/actions/CSEActions'
import { useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  // { field: 'grade', headerName: 'Grade', width: 130, type: 'number'},
]

const CSEForm = () => {
  const [state, setState] = useState({});
  const { user } = useAuth()

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useTitle(': Attendence Sheet')
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
    dispatch(addCSEAttendence(state))
    setTimeout(() => {
    enqueueSnackbar('Attendence sucessfully entered', { variant: 'success'})
    navigate('/cse')
    setLoading(false)
  }, 500)
  };



  const handleChange = (event) => {
    if(event.persist)
      event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

const {
    date,
    topicId,
  } = state;

  const [topics, setTopics] = useState([])
  const [cseStudents, setCSEStudents] = useState([{id: '1', firstName: '', lastName: '' }])


  useEffect(() => {
    if(topics.length === 0){
      console.log('Getting topics for', user)
      axios.get(`/api/cse-topics?id=${user.schoolId}`)
           .then(({data}) => {
             setTopics(data)
          })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[topics.length])

  useEffect(() => {
    if(cseStudents.length === 1){
      axios.get(`/api/cse-students?id=${user.schoolId}`)
           .then(({data}) => {
             setCSEStudents(data)
             setState({...state,
              totalRegistered: data.length,
              schoolId: user.schoolId,
              teacherId: user.id,
              date: new Date().toISOString().slice(0, 10)
            })
          })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[topics.length])

  return (
    <div>
  
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Divider style={{marginTop: '8px'}} />
       <h4 style={{marginTop: '16px'}}>Attendence details</h4>
        <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnder}}>
                <TextField
                label="Date"
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
                defaultValue={new Date().toISOString().slice(0, 10)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: spacing.marginTop }}  style={{paddingTop: spacing.paddingTopUnder}}>
            <FormControl fullWidth variant="outlined">
                <InputLabel shrink ref={inputLabel} htmlFor="topic-select" style={{backgroundColor: '#FFF', paddingLeft: 8, paddingRight: 8}}>Topic</InputLabel>
                <Select
                  labelId="topic-select"
                  id="mtx-topic-select"
                  name="topicId"
                  value={topicId || ""}
                  label="topic"
                  disabled={topics.length === 0}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      notched
                      labelwidth={labelwidth}
                      name="topic"
                      id="topic-select"
                    />
                  }
                >
                  {topics && topics.map(topic =>
                    <MenuItem value={topic.id} key={topic.id}>{topic.name}</MenuItem>
                  )}
                  </Select>
              </FormControl>

          </Grid>
     </Grid>

     <Divider style={{marginTop: '16px'}}/>
      <h4 style={{marginTop: '16px'}}>Class list</h4>

      <Grid container spacing={6}>
            <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 4 }}  style={{paddingBottom: '10px', paddingTop: spacing.paddingTop, height: 350}}>
            <DataGrid
              rows={cseStudents}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(selectedRows) => {
                setState({ ...state, students: selectedRows})
              }}
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

export default CSEForm;

