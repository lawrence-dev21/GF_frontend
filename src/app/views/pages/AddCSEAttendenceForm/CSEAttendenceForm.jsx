
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

import { useSnackbar } from 'notistack';
import { Span } from "app/components/Typography";
import {  useState, useRef, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addCSEAttendence } from '../../../redux/actions/CSEActions'
import { useDispatch  } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'

import axiosInstance from "axios";
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

const CSEAttendenceForm = () => {
  useTitle(': Attendence Sheet')

  const [state, setState] = useState({});
  const { id } = useParams()
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch()

  const [ spacing ] = useState({
    paddingTop: isMobile() ? '12px' : '24px',
    paddingTopUnder: '12px',
    paddingTopUnderSelect: isMobile() ? '28px' : '12px',
    marginTop: isMobile() ? 0 : 4
  })

  const inputLabel = useRef(null);
  const [labelwidth, setLabelwidth] = useState(0);
  const {
    date,
    topicId,
  } = state;

  const [topics, setTopics] = useState([])
  const [cseStudents, setCSEStudents] = useState([{id: '1', firstName: '', lastName: '' }])


  useEffect(() => {
    setLabelwidth(inputLabel.current.offsetWidth);
  }, []);
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    dispatch(addCSEAttendence({cse: id, cse_topic: state.topicId, totalRegistered: cseStudents.length, ...state}))
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


  useEffect(() => {
    const params = qs.stringify({
      populate: ['cse_topics'],
    })
    if(topics.length === 0){
      axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/cses/${id}?${params}`)
           .then(({data}) => {
            console.log('topics',data.data.attributes.cse_topics.data)
             setTopics(
              data.data.attributes.cse_topics.data.map((topic) => {
                return {
                  id: topic.id,
                  name: topic.attributes.name,
                }
              })
             )
          })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[topics.length])

  useEffect(() => {
    const params = qs.stringify({
      populate: ['students.user']
    })
    if(cseStudents.length === 1){
      axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/cses/${id}?${params}`)
           .then(({data}) => {
            const studentsList = data.data.attributes.students.data.map((student) => {
              return {
                id: student?.id,
                firstName: student?.attributes?.user?.data.attributes?.firstName,
                lastName: student?.attributes?.user?.data.attributes?.lastName,
              }
            })
             setCSEStudents(studentsList)
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

export default CSEAttendenceForm;

