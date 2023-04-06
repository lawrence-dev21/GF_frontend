import React from 'react';
// material-ui
import { Grid, Button, Avatar, Box, Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { getSchools } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

import { authRoles } from 'app/auth/authRoles';
import useAuth from 'app/hooks/useAuth';

const selectSchools = state => state.schools.schoolList;

const SchoolTable = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const schools = useSelector(selectSchools);
  const [selectedRows, setSelectedRows] = React.useState([]);

  React.useEffect(() => {
    dispatch(getSchools());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const navigate = useNavigate();
  const columns = [
    {
      name: 'avatar',
      label: 'Image',
      options: {
        filter: false,
        customBodyRender: img => {
          return <Avatar variant="rounded" src={img}></Avatar>;
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
      label: 'EMIS'
    },
    {
      name: 'district',
      label: 'District'
    },
    {
      name: 'province',
      label: 'Province'
    }
  ];

  const options = {
    rowsSelected: selectedRows,
    selectableRowsHideCheckboxes: true,
    responsive: 'simple',
    viewColumns: true,
    Selection: false,
    onRowClick: s => {
      console.log(s);
    },
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      setSelectedRows(rowsSelected);
    }
  };

  return (
    <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
            {schools.length === 0 && (
          <Grid paddingTop={10} container justifyContent="center" alignItems="center">
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, textAlign: 'center' }} >
              <Typography variant='h3' component="h2" align='center'>Schools
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }} align='center'>
                No schools found. Click below to create a new one.
              </Typography>
              <Button 
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/add-schools');
                }}
              // put the button at the center 
              >
                Create New School
              </Button>
            </Box>
          </Grid>
        )}

      {schools.length > 0 && (
        <Grid item padding={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          {authRoles.sa.includes(user.role) && (
                <Button
                 size="large"
                 variant="contained"
                   color="primary"
                   onClick={() => {
                  navigate('/add-schools');
             }}
                >
                  Add School
            </Button>
                  )}
           </Grid>
           <Grid item padding={1.5}>
          <MUIDataTable
            title={'Schools'}
            data={schools.map(school => {
              return [
                school?.attributes?.avatar,
                school?.attributes?.emisId,
                school?.attributes?.name,
                school?.attributes?.district?.data?.attributes?.name,
                school?.attributes?.district?.data?.attributes?.province?.data?.attributes?.name
              ];
            })}
            columns={columns}
            options={options}
          />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SchoolTable;
