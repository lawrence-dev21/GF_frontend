import React, { useState, useEffect } from 'react';
import CSEAttendanceModal from './CSEAttendanceModal'
import axiosInstance from 'axios';
import MUIDataTable from 'mui-datatables';
import { Popover, Button, Grid, IconButton } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import qs from 'qs';

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


  const CSEAttendenceTable = ({cseId}) => {
  
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ popOverToggle, setPopOverToggle ] = useState(false)
    const [ modalOpen, setModalOpen ] = useState(false)
    const [ attendanceId, setAttendanceId ] = useState(null)

    const params = qs.stringify({
      populate: ['students', 'cse_topic'],
      filters: {
        cse: { id : { $eq : cseId }}
      }
    })

    
    // Popover - works 
    const handleClick = (event) => {
      console.log(attendanceId)
      if(!popOverToggle)
        setAnchorEl(event.currentTarget)
      else
        setAnchorEl(null)
      setPopOverToggle(!popOverToggle)
    }
    
    const handleModalClose = () => {
      setModalOpen(false)
    }
    const handleModalClick = (id) => {
      setModalOpen(true)
      // close the popover menu
      setAnchorEl(null)
      setPopOverToggle(!popOverToggle)
      setAttendanceId(id)
    }
  
    const [datalist, setDataList] = useState([])
    const columns = [
      {
          name: 'date',
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
          name: 'id',
          label: ' ',
          options: {
            customBodyRender: (id) => {
              // Todo - fix the attendance modal onclick function 3/21/2023
              // The custom body render function runs the onclick which is not intended
              return (  
                <IconButton aria-label="view option" variant="contained">
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
      console.log('CSEID',cseId)
      axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/attendences?${params}`)
                  .then(res => res.data)
                  .then(({data}) => setDataList(
              data.map(attendance => ({
                  id: attendance.id,
                  date: attendance.attributes.createdAt,
                  attendenceCount: `${attendance.attributes.students.data.length}/${attendance.attributes.totalRegistered}`,
                  topic: attendance.attributes.cse_topic.data.attributes.name,
              }))
          ))
          .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <>
        <CSEAttendanceModal isOpen={modalOpen} handleClose={handleModalClose} attendanceId={cseId}/>
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
                  <MUIDataTable title={'Comprehensive Sexual Education Attendance'} data={datalist} columns={columns} options={options} />
              </Grid>
          </Grid>
      </>
      )
  }

  export default CSEAttendenceTable;