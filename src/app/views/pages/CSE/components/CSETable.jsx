import React, { useState, useEffect } from 'react';
import { Chip, Box, IconButton, Grid, Popover, List, ListItem, ListItemText } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axiosInstance from 'axios';
import { useNavigate } from 'react-router-dom';
const CSETable = () => {
  const navigate = useNavigate();
  const [datalist, setDataList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCseId, setSelectedCseId] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_BACKEND}api/cses?populate[0]=cse_topics&populate[1]=grades`)
      .then(res => res.data.data)
      .then(async cseData => {
        const updatedCseData = await Promise.all(
          cseData.map(async cseItem => {
            const studentCountResponse = await axiosInstance.get(
              `${process.env.REACT_APP_BACKEND}api/cses/${cseItem.id}?populate[students][count]=true`
            );
            const studentCount = studentCountResponse.data.data.attributes.students.data.attributes.count;
  
            return {
              id: cseItem.id,
              name: cseItem.attributes.name,
              topics: cseItem.attributes.cse_topics.data.map(topic => topic.attributes.name),
              grades: cseItem.attributes.grades.data.map(grade => grade.attributes.name),
              year: cseItem.attributes.startDate,
              enrollments: studentCount,
            };
          })
        );
  
        setDataList(updatedCseData);
      });
  }, []);
  

  const handlePopoverOpen = (event, cseId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCseId(cseId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
            return (
              <>
              {topicItems && 
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {topicItems.map((topic, index) => (
                    <Chip key={index} label={topic} sx={{ my: 0.5 }} />
                    ))}
                </Box>
                }
              </>
            )
          }
      }
    },
    {
        name: 'grades',
        label: 'Grades',
        options: {
          customBodyRender: (gradeItems) => {
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
        name: 'year',
        label: 'Year',
        options: {
          customBodyRender: (year) => {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                {/* if the year is the current year use the primary color else secondary */}
                {/* get year from the date sent */}
                  <Chip label={year} sx={{ my: 0.5 }} color={ new Date(year).getFullYear() === new Date().getFullYear() ? 'primary' : 'secondary'} />
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
      name: 'id',
      label: ' ',
      options: {
        customBodyRender: cseId => {
          return (
            <>
              <IconButton aria-label="view option" variant="contained" onClick={event => handlePopoverOpen(event, cseId)}>
                <MoreHorizIcon />
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <List component="nav" aria-label="view and archive actions">
                  <ListItem onClick={() => navigate(`/cse/${selectedCseId}`)}>
                    <ListItemText primary="View" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Archive" />
                  </ListItem>
                </List>
              </Popover>
            </>
          );
        },
      },
    },
  ];

  const options = {
    viewColumns: true,
    Selection: false,
  };
  return (
    <Grid container padding={2} rowSpacing={1.5} columnSpacing={2}>
      <Grid item padding={2}>
        <MUIDataTable title={'Comprehensive Sexual Education Clubs'} data={datalist} columns={columns} options={options} />
      </Grid>
    </Grid>
  );
};

export default CSETable;
