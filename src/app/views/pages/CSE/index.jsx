
import { Grid, Box, Popover, Button, IconButton, Paper, Modal, TableContainer, Typography, TableBody, TableCell, Table, TableRow, TableHead } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {styled } from "@mui/system";
import { useEffect, useState } from "react";
import CSETable from "./CSETable";
import { useNavigate } from "react-router-dom";
import MUIDataTable from 'mui-datatables';
import useAuth from 'app/hooks/useAuth'
import axios from 'axios'
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

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

// to fix later
const CSEModal = (props) => {
  const { open = false, setModalToggle } = props.props
  const [ modalOpen, setModalOpen ] = useState(open)
  const handleClose = () => {
    setModalOpen(false)
    setModalToggle(false)
  }

  useEffect(() => {
    console.log(`Modal has ${open ? 'opened' : 'closed'}.`, modalOpen)
    setModalOpen(open)
  }, [open])

  return(
    <Modal
    open={modalOpen}
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

const CSEClassTable = () => {

  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ popOverToggle, setPopOverToggle ] = useState(false)
  const [ modalToggle, setModalToggle ] = useState(false)
  
  // Popover
  const handleClick = (event) => {
    if(!popOverToggle)
      setAnchorEl(event.currentTarget)
    else
      setAnchorEl(null)
    setPopOverToggle(!popOverToggle)
  }
  
  const [ modalProps, setModalProps ] = useState({open: modalToggle, setModalToggle: setModalToggle})
  // Modal

  const handleModalClick = (event) => {
    setModalProps({open: modalToggle ? false : true, setModalToggle: setModalToggle})
    setModalToggle(!modalToggle)
    console.log(modalProps)
    setAnchorEl(null)
    setPopOverToggle(!popOverToggle)
  }

  const [datalist, setDataList] = useState([])
  const { user } = useAuth()
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
  // fetch data from the clubs of the students
  useEffect(() => {
    axios.get(`api/cse-attendence?id=${user.schoolId}`)
        .then(res => setDataList(res.data))
        .catch(err => console.log(err))
  }, [])
  return (
    <>
      <CSEModal props={modalProps}/>
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
const CSE = () => {
  const navigate  = useNavigate()
  return (
    <Container>

      {/* Previous Classes */}
        <div className="">
          <Typography variant="h5">CSE Classes</Typography>
          <Button
                    sx={{mb: 2, mt: 2}}
                    size="large"
                    variant="contained"
                    color="primary"
                       onClick={() => {
                        navigate('/add-cse');
                    }}
                >
                    Take Attendence
          </Button>
          <CSEClassTable />
        </div>

      {/* Enrollment */}
      <Box sx={{mt: 4}}>
        <Typography variant="h5">CSE Student List</Typography>
        <Button disabled variant="contained" sx={{mb: 2, mt: 2}}>Enroll Student</Button>
        <CSETable />
      </Box>
    </Container>
  );
};

export default CSE;

