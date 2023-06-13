import { useState, useEffect } from 'react';
import React from 'react';
// material-ui
import { Grid, Button, Box, Chip, Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { getModules, deleteModule } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import BookPreview from './components/BookPreview';
import { authRoles } from 'app/auth/authRoles';
import useAuth from 'app/hooks/useAuth';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const selectModules = (state) => state.modules.moduleList;

const ModuleTable = () => {
  const { user } = useAuth();
  // Modal functions
  const [displayModal, setDisplayModal] = useState(false);
  const [uploadId, setUploadId] = useState('');
  //const [isLoading, setIsLoading] = useState(true);

  const handleModalClose = () => {
    setDisplayModal(false);
  };

  const dispatch = useDispatch();
  const modules = useSelector(selectModules);
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedmodulesId, setSelectedmodulesId] = React.useState(null);
  useEffect(() => {
    if (!selectedRows.length && !modules.length) {
      dispatch(getModules());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   // Set the loading state to false when schools data is fetched
  //   if (modules.length > 0) {
  //     setIsLoading(false);
  //   }
  // }, [modules]);

  const handleEditModule = (modulesId) => {
    // Handle edit action here
    console.log('Edit module:', modulesId);
  };

  const handleDeleteModule = (modulesId) => {
    // Handle delete action here
    dispatch(deleteModule(modulesId));
    handleMenuClose();
    console.log('Delete module:', modulesId);
  };

  const handleMenuOpen = (event, modulesId) => {
    setAnchorEl(event.currentTarget);
    setSelectedmodulesId(modulesId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedmodulesId(null);
  };

  const navigate = useNavigate();
  const columns = [
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
      },
    },
    {
      name: 'grade',
      label: 'Grade',
      options: {
        customBodyRender: (value) => {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2 }}>
              {value.map((item) => (
                <Chip key={item} label={item} color="primary" size="small" sx={{ marginRight: '6px' }} />
              ))}
            </Box>
          );
        },
      },
    },
    {
      name: 'file',
      label: 'File',
      options: {
        customBodyRender: (pdf) => {
          return (
            <Button
              onClick={() => {
                setUploadId(() => pdf);
                setDisplayModal(true);
              }}
            >
              View Book
            </Button>
          );
        },
      },
    },
    {
      name: 'description',
      label: 'Description',
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const modulesId = modules[tableMeta.rowIndex].id;

          return (
            <React.Fragment>
              <Button size="small" onClick={(event) => handleMenuOpen(event, modulesId)}>
                <MoreHorizSharpIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={selectedmodulesId === modulesId && Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleEditModule(modulesId)}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={() => handleDeleteModule(modulesId)}>
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
  const options = {
    rowsSelected: selectedRows,
    selectableRowsHideCheckboxes: true,
    responsive: 'simple',
    viewColumns: true,
    Selection: false,
    onRowClick: (s) => {
      console.log(s);
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
      <BookPreview open={displayModal} handleClose={handleModalClose} bookId={uploadId} />
      {modules.length === 0 ? (
        // Show empty state if no modules found
        <Grid item xs={12} padding={2}>
          <Grid paddingTop={10} container justifyContent="center" alignItems="center">
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, textAlign: 'center' }} >
              <Typography variant='h3' component="h2" align='center'>Learning Materials
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }} align='center'>
                No Learing Materials found. Click below to create a new one.
              </Typography>
              <Button 
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/add-modules');
                }}
              // put the button at the center 
              >
                Create New Materials
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        // Show the table if modules data is available
        <Grid item xs={12} padding={2}>
          <Grid container justifyContent="left" alignItems="center" spacing={2}>
            {authRoles.sa.includes(user.role) && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate('/add-modules');
                  }}
                >
                  Add Module
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <MUIDataTable
                title="Modules"
                data={modules.map((mod) => ({
                  // mod.avatar,
                  title: mod.attributes.title,
                  grade: mod.attributes.grades.data.map((grade) => grade.attributes.name),
                  file: mod.id,
                  description: mod.attributes.description,
                }))}
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ModuleTable;
