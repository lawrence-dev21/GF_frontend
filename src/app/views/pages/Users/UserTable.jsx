


import React from 'react';
// material-ui
import { Grid, Button, Avatar } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../../redux/actions/UserActions'
import { useSelector, useDispatch  } from 'react-redux'

const selectUsers = state => state.users.userList

const UserTable = () => {
    // first get a columns state
    const dispatch = useDispatch() 
    const users = useSelector(selectUsers)
    const [selectedRows, setSelectedRows] = React.useState([]);

    React.useEffect(() => {
        dispatch(getUsers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        },{
            name: 'role',
            label: 'Role'
        },
        {
            name: 'email',
            label: 'Email'
        },{
            name: 'institution',
            label: 'Institution'
        },
    ];

    const handleDeleteRows = () => {
        const userIds =  selectedRows.map(row => users[row].id)
        dispatch(deleteUser(userIds[0]))
    }

    const options = {
        rowsSelected: selectedRows,
        selectableRowsHideCheckboxes: true,
        responsive: 'standard',
        viewColumns: true,
        Selection: false,
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
                        navigate('/add-users');
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
                            user.role?.name  || 'N/A',
                            user.email,
                            user.school?.name || 'N/A',
                            user.createdAt,
                            user.id,
                        ]
                })} columns={columns} options={options} />
            </Grid>
        </Grid>
    );
};

export default UserTable;
