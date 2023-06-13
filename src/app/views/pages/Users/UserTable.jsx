import React from 'react';
// material-ui
import { Grid, Button, Avatar, Box, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../../redux/actions/UserActions'
import { useSelector, useDispatch  } from 'react-redux'
import { authRoles } from 'app/auth/authRoles';
import useAuth from 'app/hooks/useAuth';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const selectUsers = state => state.users.userList

const UserTable = () => {
    // first get a columns state
    const { user } = useAuth()
    const dispatch = useDispatch() 
    const users = useSelector(selectUsers)
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedUserId, setSelectedUserId] = React.useState(null);

    React.useEffect(() => {
        dispatch(getUsers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    
    const navigate = useNavigate();

    const handleEditUser = (userId) => {
        // Handle edit action here
        console.log('Edit user:', userId);
    }

    const handleDeleteUser = (userId) => {
        // Handle delete action here
        console.log('Delete user:', userId);
    }

    const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setSelectedUserId(userId);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUserId(null);
    }

    const columns = [
        {
            name: 'avatar',
            label: 'Image',
            options: {
                filter: false,
                customBodyRender: (img) => {
                  return (
                    <Avatar variant="rounded" src={img} />
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
            name: 'role',
            label: 'Role'
        },
        {
            name: 'email',
            label: 'Email'
        },
        {
            name: 'institution',
            label: 'Institution'
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const userId = users[tableMeta.rowIndex].id;

                    return (
                        <React.Fragment>
                            <Button
                                size="small"
                                onClick={(event) => handleMenuOpen(event, userId)}
                            >
                                <MoreHorizSharpIcon />
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={selectedUserId === userId && Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => handleEditUser(userId)}>
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit" />
                                </MenuItem>
                                <MenuItem onClick={() => handleDeleteUser(userId)}>
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete" />
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    );
                },
            },
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
            {users.length === 0 && (
                <Grid paddingTop={10} container justifyContent="center" alignItems="center">
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, textAlign: 'center' }} >
                        <Typography variant='h3' component="h2" align='center'>Users</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }} align='center'>
                            No Users found. Click below to create a new one.
                        </Typography>
                        <Button 
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate('/add-users');
                            }}
                        >
                            Create New User
                        </Button>
                    </Box>
                </Grid>
            )}
         
            {users.length > 0 && (
                <Grid item padding={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        {authRoles.sa.includes(user.role) && ( 
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
                        )}
                    </Grid>
                    <Grid item padding={1.5}>
                        <MUIDataTable
                            title={'Users'}
                            data={users
                                .filter(user => user.role.name !== 'Parent' && user.role.name !== 'Student')
                                .map(user => [
                                user.avatar,
                                user.firstName,
                                user.lastName,
                                user.role?.name || 'N/A',
                                user.email,
                                user.school?.name || 'N/A',
                                user.createdAt,
                                user.id,
                            ])}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default UserTable;
