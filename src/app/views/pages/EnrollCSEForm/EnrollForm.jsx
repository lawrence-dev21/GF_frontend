
import {
  Button,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import useAuth from 'app/hooks/useAuth'
import { useSnackbar } from 'notistack';
import { Span } from "app/components/Typography";
import { useState, useRef, useEffect } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { addCSEAttendence } from '../../../redux/actions/CSEActions'
import { useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  // { field: 'grade', headerName: 'Grade', width: 130, type: 'number'},
]

const CSEEnrollmentForm = () => {
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
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(addCSEAttendence(state))
    setTimeout(() => {
    enqueueSnackbar('Attendence sucessfully entered', { variant: 'success'})
    navigate('/cse')
    setLoading(false)
  }, 500)
  };

  const [cseStudents, setCSEStudents] = useState([{id: '1', firstName: '', lastName: '' }])

  useEffect(() => {
    if(cseStudents.length === 1){
      axios.get(`/api/cse-students?id=${user.schoolId}&cse=false`)
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
  },[cseStudents.length])

  return (
    <div>
  
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Divider style={{marginTop: '8px'}} />
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

export default CSEEnrollmentForm;

