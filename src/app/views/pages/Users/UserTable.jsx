


import React from 'react';
// material-ui
import { Grid, Button, Avatar } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../../redux/actions/UserActions'
import { useSelector, useDispatch  } from 'react-redux'

const selectUsers = state => state.users.usersList

const UserTable = () => {
    // first get a columns state
    const dispatch = useDispatch() 
    const users = useSelector(selectUsers)
    const [selectedRows, setSelectedRows] = React.useState([]);

    React.useEffect(() => {
        if(!selectedRows.length && !users.length){
            dispatch(getUsers())
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
            name: 'email',
            label: 'Email'
        },
        {
            name: 'nrc',
            label: 'NRC'
        },
        {
            name: 'gender',
            label: 'Gender'
        },
        {
            name: 'role',
            label: 'Role'
        },
        // {
        //     name: 'mobile',
        //     label: 'Mobile'
        // },
        // {
        //     name: 'dob',
        //     label: 'DOB'
        // },
        // {
        //     name: 'creation Date',
        //     label: 'Date Created'
        // },
    ];

    const handleDeleteRows = () => {
        const userIds =  selectedRows.map(row => users[row].id)
        dispatch(deleteUser(userIds[0]))
    }

    const options = {
        rowsSelected: selectedRows,
        selectableRowsHideCheckboxes: false,
        viewColumns: true,
        Selection: true,
        onRowClick: (s) => {
          console.log(s)
        },
        onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
        setSelectedRows(rowsSelected);
      },
        onRowsDelete: () =>{
            handleDeleteRows();
            setSelectedRows([])
        }
    };
    return (
        <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate('/users/add');
                    }}
                >
                    Add User
                </Button>
            </Grid>

            <Grid item padding={2}>
                <MUIDataTable title={'Users'} data={users.map(user => {
                    return [
                            user.avatar,
                            user.firstName,
                            user.lastName,
                            user.email,
                            user.nrc,
                            user.gender,
                            user.role,
                            user.mobile,
                            user.dataOfBirth,
                            user.creationDate,
                            user.id,
                        ]
                })} columns={columns} options={options} />
            </Grid>
        </Grid>
    );
};

export default UserTable;
