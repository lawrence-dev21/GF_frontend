


import React, { useState, useEffect } from 'react';
// material-ui
import { Grid} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import useAuth from 'app/hooks/useAuth'
import axios from 'axios'

const CSETable = () => {
    
  const [datalist, setDataList] = useState([])
  const { user } = useAuth()
    const columns = [
        {
            name: 'firstName',
            label: 'First Name',
            options: {
                filter: true
              }
        },
        {
            name: 'lastName',
            label: 'Last Name'
        },
        {
            name: 'grade',
            label: 'Grade'
        },
    ];

    const options = {
        selectableRowsHideCheckboxes: true,
        viewColumns: true,
        Selection: false,
        onRowClick: () => {
          
        }
      };
      // fetch data from the clubs of the students
      useEffect(() => {
        axios.get(`api/cse-students?id=${user.schoolId}`)
            .then(res => setDataList(res.data))
            .catch(err => console.log(err))
      }, [])

 
    return (
        <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            </Grid>
            <Grid item padding={2}>
                <MUIDataTable title={'Comprehensive Sexiual Education materials'} data={datalist} columns={columns} options={options} />
            </Grid>
        </Grid>
    );
};

export default CSETable;
