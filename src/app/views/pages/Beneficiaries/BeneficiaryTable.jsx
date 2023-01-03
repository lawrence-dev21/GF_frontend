


import React from 'react';
// material-ui
import { Grid, Button, Avatar } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { getBeneficiaries } from '../../../redux/actions'
import { useSelector, useDispatch  } from 'react-redux'

const selectBeneficiaries = state => state.beneficiaries.beneficiaryList

const BeneficiaryTable = () => {
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
        },{
            name: 'pgName',
            label: 'P/G Name'
        },{
            name: 'pgAddress',
            label: 'P/G Address'
        },{
            name: 'pgNRC',
            label: 'P/G NRC'
        },{
            name: 'pgMobile',
            label: 'P/G Mobile'
        },
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled
                >
                    Add Beneficiary
                </Button>
            </Grid>

            <Grid item padding={2}>
                <MUIDataTable title={'Beneficiaries'} data={beneficiaries.map(beneficiary => {
                    return [
                            beneficiary?.avatar,
                            beneficiary?.firstName + ' ' + beneficiary?.lastName,
                            beneficiary?.school,
                            beneficiary?.grade,
                            beneficiary?.gender,
                            beneficiary?.dateOfBirth,
                            beneficiary?.parentFirstName + ' ' + beneficiary?.parentLastName,
                            beneficiary?.parentAddress,
                            beneficiary?.parentNRC,
                            beneficiary?.parentMobile,


                        ]
                })} columns={columns} options={options} />
            </Grid>
        </Grid>
    );
};

export default BeneficiaryTable;
