import React, { useEffect } from 'react'
import { Box, Paper, Modal, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import axiosInstance from 'axios';
import qs from 'qs';

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
  
const CSEModal = ({isOpen, handleClose, attendanceId}) => {
    console.log('isOpen', isOpen)
    const params = qs.stringify({
        populate: ['students.user', 'students.grade']
    })
    useEffect(() => {
        if(attendanceId){
            axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/attendences/${attendanceId}?${params}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => { console.log(err) })
        }
    }, [])
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
  
  export default CSEModal