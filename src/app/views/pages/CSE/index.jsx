
import { Grid, Chip, Box, Popover, Button, IconButton, Paper, Modal, TableContainer, Typography, TableBody, TableCell, Table, TableRow, TableHead, Select, MenuItem } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {styled } from "@mui/system";
import { useEffect, useState } from "react";
import CSETable from "./CSETable";
import { useNavigate } from "react-router-dom";
import MUIDataTable from 'mui-datatables';
import useAuth from 'app/hooks/useAuth'
import axiosInstance from "axios";
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

const CSETimeTable = () => {
    
  const [datalist, setDataList] = useState([
    ['CSE 1', ['Topic 1', 'Topic 2', 'Topic 3'], ['Grade 10', 'Grade 11'], '2022', '20 Students'],
    ['CSE 2', ['Topic 1', 'Topic 2'], ['Grade 10', 'Grade 11', 'Grade 12'], '2023', '26 Students']
  ])
    const columns = [
        {
            name: 'name',
            label: 'Name',
        },
        {
            name: 'topics',
            label: 'Topics',
            options: {
              customBodyRender: (topicItems) => {
                console.log(topicItems)
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {topicItems.map((topic, index) => (
                      <Chip key={index} label={topic} sx={{ my: 0.5 }} />
                    ))}
                  </Box>
                )
              }
          }
        },
        {
            name: 'grades',
            label: 'Grades',
            options: {
              customBodyRender: (gradeItems) => {
                console.log(gradeItems)
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {gradeItems.map((grade, index) => (
                      <Chip key={index} label={grade} sx={{ my: 0.5 }} />
                    ))}
                  </Box>
                )
              }
          }

        },
        {
            name: 'dates',
            label: 'Dates',
            options: {
              customBodyRender: (year) => {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                    {/* if the year is the current year use the primary color else secondary */}
                      <Chip label={year} sx={{ my: 0.5 }} color={year === (new Date().getFullYear()).toString()  ? 'primary' : 'secondary'} />
                  </Box>
                )
              }
          }
        },
        {
            name: 'enrollments',
            label: 'Students Enrolled'
        },
        {
            name: 'edit',
            label: ' ',
            options: {
              customBodyRender: () => {
                return (
                  <IconButton aria-label="view option" variant="contained">
                    <MoreHorizIcon />
                  </IconButton>
                )
              }
          }
        }
    ];

    const options = {
        viewColumns: true,
        Selection: false,
      };
    return (
        <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
            <Grid item padding={2}>
                <MUIDataTable title={'Comprehensive Sexiual Education materials'} data={datalist} columns={columns} options={options} />
            </Grid>
        </Grid>
    );
};


// to fix later
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

const CSEClassTable = () => {

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
    axiosInstance.get(`api/cse-attendence?id=${user.schoolId}`)
        .then(res => setDataList(res.data))
        .catch(err => console.log(err))
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
const CSE = () => {
  const navigate  = useNavigate()
  return (
    <Container>

      <CSETimeTable />
      {/* select option with multiple cse's */}
      {/* <Select>
        <MenuItem>+ Add CSE</MenuItem>
      </Select> */}
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
        <Button
                    sx={{mb: 2, mt: 2}}
                    size="large"
                    variant="contained"
                    color="primary"
                       onClick={() => {
                        navigate('/enroll-cse');
                    }}
                >
                    Enroll Student
          </Button>
        <CSETable />
      </Box>
    </Container>
  );
};

export default CSE;

