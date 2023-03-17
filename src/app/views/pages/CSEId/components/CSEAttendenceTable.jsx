import React, { useState, useEffect } from "react";
import axiosInstance from "axios";
import MUIDataTable from "mui-datatables";
import { Popover, Paper, Button, Modal, Box, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Grid, IconButton } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Modal Style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const popOverOptions = {
  anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },

}

const CSEModal = ({isOpen, handleClose}) => {
    // const { props: {isOpen, handleClose}} = props
    console.log('isOpen', isOpen)
    return(
      <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Student Example</TableCell>
                <TableCell>Sexual Harrasment</TableCell>
                <TableCell>1/1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  
      </Box>
    </Modal>
    )
  }
  
  const CSEAttendenceTable = ({cseId}) => {
  
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ popOverToggle, setPopOverToggle ] = useState(false)
    const [ modalOpen, setModalOpen ] = useState(false)
  
    // Popover - works 
    const handleClick = (event) => {
      if(!popOverToggle)
        setAnchorEl(event.currentTarget)
      else
        setAnchorEl(null)
      setPopOverToggle(!popOverToggle)
    }
    
    const handleModalClose = () => {
      setModalOpen(false)
    }
    const handleModalClick = () => {
      setModalOpen(true)
      // close the popover menu
      setAnchorEl(null)
      setPopOverToggle(!popOverToggle)
    }
  
    const [datalist, setDataList] = useState([])
    const columns = [
      {
          name: 'creationDate',
          label: 'Date',
          options: {
              filter: true
            }
      },
      {
          name: 'topic',
          label: 'Topic'
      },
      {
          name: 'attendenceCount',
          label: 'Attendence Count'
      },
      {
          name: 'edit',
          label: ' ',
          options: {
            customBodyRender: () => {
              return (
                <IconButton aria-label="view option" variant="contained" onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
              )
            }
        }
      },
      
  ];
  
    const options = {
      selectableRowsHideCheckboxes: true,
      viewColumns: true,
      Selection: false,
      onRowClick: () => {
        
      }
    };
    useEffect(() => {
      axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/cses/${cseId}?populate[0]=students.user`)
          .then(res => res.data)
          .then(data => setDataList(
              data.students.map(student => ({
                  id: student._id,
                  firstName: student.attributes.user.data.attributes.firstName,
                  lastName: student.attributes.user.data.attributes.lastName,
                  grade: student.attributes.grade.data.attributes.name
              }))
          ))
          .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <>
        <CSEModal isOpen={modalOpen} handleClose={handleModalClose}/>
        <Popover 
            open={popOverToggle}
            onClose={handleClick}
            anchorEl={anchorEl}
            anchorOrigin={popOverOptions.anchorOrigin}
            transformOrigin={popOverOptions.transformOrigin}
            >
          <Button onClick={handleModalClick} >View Attendence</Button>
        </Popover>
        <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
              </Grid>
              <Grid item padding={2}>
                  <MUIDataTable title={'Comprehensive Sexiual Education materials'} data={datalist} columns={columns} options={options} />
              </Grid>
          </Grid>
      </>
      )
  }

  export default CSEAttendenceTable;