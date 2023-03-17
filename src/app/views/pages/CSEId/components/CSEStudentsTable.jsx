import React, { useState, useEffect } from 'react';
// material-ui
import { Grid} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import axiosInstance from "axios";

const CSEStudentsTable = ({cseId}) => {
    
  const [datalist, setDataList] = useState([])
//   const { user } = useAuth()
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
        axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/cses/${cseId}?populate[0]=students.user&populate[1]=students.grade`)
            .then(res => res.data)
            .then(({data}) => {
                console.log(data)
                setDataList(
                data.attributes.students.data.map(student => ({
                    id: student?.id,
                    firstName: student?.attributes?.user?.data?.attributes?.firstName,
                    lastName: student?.attributes?.user?.data?.attributes?.lastName,
                    grade: student?.attributes?.grade?.data?.attributes?.name
                }))
            )}
            )
            .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default CSEStudentsTable;
