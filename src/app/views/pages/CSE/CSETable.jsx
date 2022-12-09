


import React from 'react';
// material-ui
import { Grid} from '@mui/material';
import MUIDataTable from 'mui-datatables';


const CSETable = () => {
    const columns = [
        {
            name: 'firstname',
            label: 'First Name',
            options: {
                filter: true
              }
        },
        {
            name: 'lastname',
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
            name: 'role',
            label: 'Role'
        },
        {
            name: 'dob',
            label: 'DOB'
        },
        {
            name: 'date',
            label: 'Date of Created'
        }
    ];
    const datalist = [['lawrence', 'kasonde', 'lk@mail.com', '123456/12/1', 'Full-Stack Developer', '1990-12-01', '2022-09-01'],
                      ['Ngalande', 'Banda', 'nb@.com','112435/12/1','Developer', '1986-12-03', '2022-11-24'],
                      ['Frank', 'Chaiwa', 'fc@.com','112435/12/1','Software Engineer', '1994-01-01', '2022-11-24'],
                      ['Michael', 'chuck', 'mck@.com','112435/12/1','Accounts', '1991-11-10', '2022-11-24'],
                      ['Given', 'mwaba', 'gm@.com','112435/12/1','Procurement', '1994-11-7', '2022-11-24'],
                      ['David', 'Mbao', 'dm@.com','112435/12/1','Finance', '1977-10-08', '2022-11-24'],
                      ['Chewe', 'Chileshe', 'cc@.com','112435/12/1','ICT cyberscurity', '1989-02-03', '2022-11-24'],             
];

    const options = {
        selectableRowsHideCheckboxes: false,
        viewColumns: true,
        Selection: true,
        onRowClick: () => {
          
        }
    };
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
