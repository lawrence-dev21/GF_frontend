


import React from 'react';
// material-ui
import { Grid, Button, Avatar } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { getSchools } from '../../../redux/actions'
import { useSelector, useDispatch  } from 'react-redux'

import { authRoles } from 'app/auth/authRoles'
import useAuth from 'app/hooks/useAuth'

const selectSchools = state => state.schools.schoolList

const SchoolTable = () => {
    const { user } = useAuth()
    const dispatch = useDispatch() 
    const schools = useSelector(selectSchools)
    const [selectedRows, setSelectedRows] = React.useState([]);

    React.useEffect(() => {
        if(!selectedRows.length && !schools.length){
            dispatch(getSchools())
        }
    }, [dispatch])
    
    const navigate = useNavigate();
    const columns = [
        {
            name: 'avatar',
            label: 'Image',
            options: {
                customBodyRender: (img) => {
                  return (
                    <Avatar variant="rounded" src={img} >
                    </Avatar>
                  )
                }
            }
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true
              }
        },
        {
            name: 'emisId',
            label: 'EMIS',
        },
        {
            name: 'district',
            label: 'District'
        },
        {
            name: 'province',
            label: 'Province'
        },
    ];

    // const handleDeleteRows = () => {
    //     const userIds =  selectedRows.map(row => schools[row].id)
    //     dispatch(deleteUser(userIds[0]))
    // }

    const options = {
        rowsSelected: selectedRows,
        selectableRowsHideCheckboxes: true,
        responsive: 'simple',
        viewColumns: true,
        Selection: false,
        onRowClick: (s) => {
          console.log(s)
        },
        onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
        setSelectedRows(rowsSelected);
      },
        // onRowsDelete: () =>{
        //     handleDeleteRows();
        //     setSelectedRows([])
        // }
    };
    return (
        <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>

                { authRoles.sa.includes(user.role) && (<Button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    navigate('/add-schools');
                                }}
                            >
                                Add School
                            </Button>)}

            </Grid>

            <Grid item padding={2}>
                <MUIDataTable title={'Schools'} data={schools.map(school => {
                    return [
                            school.avatar,
                            school.emisId,
                            school.name,
                            school.district,
                            school.province,
                        ]
                })} columns={columns} options={options} />
            </Grid>
        </Grid>
    );
};

export default SchoolTable;
