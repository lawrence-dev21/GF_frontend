
import {
  Button,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Span } from "app/components/Typography";
import { useState, useEffect } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { isMobile } from '../../../utils/utils'
import { useTitle } from '../../../hooks/useTitle'
import { enrollCSE } from '../../../redux/actions/CSEActions'
import { useDispatch  } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'
import axiosInstance from "axios";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'grade', headerName: 'Grade', width: 130, type: 'number'},
]

const CSEEnrollmentForm = ({cseProp}) => {
  const [state, setState] = useState({});
  // const { user } = useAuth()
  const { id } = useParams()
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
    setLoading(true)
    console.log('creating attributes', state.students)

    const attributes =  {
      id,
      students:{ 
        connect: state.students.map(row => {
          return {id: row}
        })
      }
    }
    console.log('dispatching', attributes)
    dispatch(enrollCSE(attributes))
    setTimeout(() => {
    enqueueSnackbar('Students successfully enrolled', { variant: 'success'})
    navigate(`/cse/${id}`)
    setLoading(false)
  }, 500)
  };

  const [cseStudents, setCSEStudents] = useState([{id: '1', firstName: '', lastName: '' }])
  // need to get the students that are eligible for the cse 
      useEffect(() => {
      const grades = cseProp.data.attributes.grades.data.map((grade) => grade.id)
      console.log('grades', grades)
      const query = qs.stringify({
        populate: ['user', 'grade'] , 
        filters: {
        $and: [
          {
              $or: grades.map(grade => {
                  return { grade:{id: {$eq: grade}} }
                      })
          },
          {
              $or: [
              {cse: {id: {$null: true}}},
              {cse: {id: {$not: id}}}
              ]
          },
        ]
        },
      }, {
        encodeValuesOnly: true, // prettify URL
      });
        console.log(query)
        if(cseStudents.length === 1){
          
            axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/students?${query}`)
                  .then(res => res.data)
                  .then(({data}) => {
                      console.log(data)
                      setCSEStudents(
                      data.map(student => ({
                          id: student?.id,
                          firstName: student?.attributes?.user?.data?.attributes?.firstName,
                          lastName: student?.attributes?.user?.data?.attributes?.lastName,
                          grade: student?.attributes?.grade?.data?.attributes?.name
                      }))
                  )
                }
            )
            .catch(err => console.log(err))}
  // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [cseStudents.lengths])

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
                console.log(selectedRows)
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

