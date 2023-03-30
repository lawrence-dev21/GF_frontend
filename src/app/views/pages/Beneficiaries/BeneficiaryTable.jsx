


import React from 'react';
// material-ui
import { Grid, Button, Avatar, Box,Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { getBeneficiaries } from '../../../redux/actions'
import { useSelector, useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authRoles } from 'app/auth/authRoles';
import useAuth from 'app/hooks/useAuth';

const selectBeneficiaries = state => state.beneficiaries.beneficiaryList

const BeneficiaryTable = () => {
    const { user } = useAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const beneficiaries = useSelector(selectBeneficiaries)
    const [selectedRows, setSelectedRows] = React.useState([]);

    React.useEffect(() => {
        if(!selectedRows.length && !beneficiaries.length){
            dispatch(getBeneficiaries())
        }
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    
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
            name: 'school',
            label: 'School'
        },{
            name: 'grade',
            label: 'Grade'
        },{
            name: 'gender',
            label: 'Gender'
        },{
            name: 'dateOfBirth',
            label: 'Date of Birth'
        }
    ];
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
    };
    return (
    <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>

                {beneficiaries.length === 0 && (
                        <Grid paddingTop={10} container justifyContent="center" alignItems="center">
                            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, textAlign: 'center' }} >
                            <Typography variant='h3' component="h2" align='center'>Beneficiaries
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }} align='center'>
                                No beneficiaries found. Click below to create a new one.
                            </Typography>
                            <Button 
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                navigate('/add-beneficiaries');
                
                                }}
                            // put the button at the center 
                            >
                                Create beneficiary
                            </Button>
                            </Box>
                        </Grid>
                        )}
                        

        {beneficiaries.length > 0 && (
        <Grid item padding={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          {authRoles.sa.includes(user.role) && (                              
           
           <Button
           size="large"
           variant="contained"
           color="primary"
              onClick={() => {
               navigate('/add-beneficiaries');
           }}
       >
           Add Beneficiary
       </Button>
                  )}
           </Grid>
           <MUIDataTable title={'Beneficiaries'} data={beneficiaries.map(beneficiary => {
                    return [
                            beneficiary?.attributes?.user?.data?.attributes?.avatar,
                            beneficiary?.attributes?.user?.data?.attributes?.firstName + ' ' + beneficiary?.attributes?.user?.data?.attributes?.lastName,
                            beneficiary?.attributes?.school?.data?.attributes?.name,
                            beneficiary?.attributes?.grade?.data?.attributes?.name,
                            beneficiary?.attributes?.user?.data?.attributes?.gender,
                            beneficiary?.attributes?.user?.data?.attributes?.dateOfBirth,
                            beneficiary?.attributes?.parent?.data?.attributes?.users_permissions_user?.data?.attributes?.firstName + ' ' + beneficiary?.attributes?.parent?.data?.attributes?.users_permissions_user?.data?.attributes?.lastName,
                            beneficiary?.attributes?.parent?.data?.attributes?.address,
                            beneficiary?.attributes?.parent?.data?.attributes?.users_permissions_user?.data?.attributes?.nrc,
                            beneficiary?.attributes?.parent?.data?.attributes?.users_permissions_user?.data?.attributes?.mobile,
                        ]
                })} columns={columns} options={options} />
        </Grid>
      )}
        </Grid>
    );
};

export default BeneficiaryTable;
