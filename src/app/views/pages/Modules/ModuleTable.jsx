import { useState, useEffect } from 'react';
// material-ui
import { Grid, Button,Box, Chip} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { getModules } from '../../../redux/actions'
import { useSelector, useDispatch  } from 'react-redux'
import BookPreview from './components/BookPreview'
import { authRoles } from 'app/auth/authRoles'
import useAuth from 'app/hooks/useAuth'
const selectModules = state => state.modules.moduleList

const ModuleTable = () => {
    const { user } = useAuth()
    // Modal functions
    const [displayModal, setDisplayModal] = useState(false)
    const [uploadId, setUploadId] = useState('')
    const handleModalClose = () => {
        setDisplayModal(false)
    }

    const dispatch = useDispatch() 
    const modules = useSelector(selectModules)
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        if(!selectedRows.length && !modules.length){
            dispatch(getModules())
        }
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    
    const navigate = useNavigate();
    const columns = [
        {
            name: 'title',
            label: 'Title',
            options: {
                filter: true
              }
        },
        {
            name: 'grade',
            label: 'Grade',
             options: {
                customBodyRender: (value) => {
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2 }}>
                        {value.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            color="primary"
                            size="small"
                            sx={{ marginRight: '6px' }}
                          />
                        ))}
                      </Box>
                    );
                  }
                         
        },
         
            
        
        },

        {
            name: 'file',
            label: 'File',
            options: {
                customBodyRender: (pdf) => {
                  return (
                    <Button onClick={() => {
                        setUploadId(() =>pdf)
                        setDisplayModal(true)
                    }}>View Book</Button>
                  )
                }
            }
        },
        {
            name: 'description',
            label: 'Description'
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
        // onRowsDelete: () =>{
        //     handleDeleteRows();
        //     setSelectedRows([])
        // }
    };
    return (
    <>
        <BookPreview open={displayModal} handleClose={handleModalClose} bookId={uploadId}/>
        <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
        { authRoles.editor.includes(user.role) && 
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
                }
            <Grid item padding={2}>
                <MUIDataTable title={'Modules'} data={modules.map(mod => {
                    return {

                            // mod.avatar,
                            title:mod.attributes.title,
                            grade:mod.attributes.grades.data.map(grade => grade.attributes.name),
                            file:mod.id,
                            description:mod.attributes.description,
                    }
                  
                })} columns={columns} options={options} />
            </Grid>
        </Grid>
    </>
    );
};

export default ModuleTable;
