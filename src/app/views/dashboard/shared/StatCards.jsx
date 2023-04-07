  import  { useState, useEffect } from 'react'
import { Box, Card, Grid, Icon, Button, styled, Tooltip, useTheme } from '@mui/material';
import { Small } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom'
import axiosInstance from 'axios';
// import the theme

const StyledCard = styled(Card)(({ theme }) => ({
  alignItems: 'center',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '24px !important',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const theme = useTheme()  

  const navigate = useNavigate();
  const [cardList, setCardList] = useState([])
  const [ gfmisDistricts, setGfmisDistricts] = useState(null)
  const [ gfmisSchools, setGfmisSchools ] = useState(null)
  const [ gfmisStudents, setGfmisStudents ] = useState(null)
  const [ cseMaterials, setCSEMaterials ] = useState(null)


  useEffect(() => {
    axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/v1-get-district-count`)
    .then(response => {
      setGfmisDistricts(response.data.count)
    })
    .catch(error => {
      console.log(error)
    })
    axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/schools`)
    .then(response => {
      console.log(response.data.meta.pagination.total)
      setGfmisSchools(response.data.meta.pagination.total)
    })
    .catch(error => {
      console.log(error)
    })
    axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/students`)
    .then(response => {
      console.log(response.data.meta.pagination.total)
      setGfmisStudents(response.data.meta.pagination.total)
    })
    .catch(error => {
      console.log(error)
    })
    axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/modules`)
    .then(response => {
      console.log(response.data.meta.pagination.total)
      setCSEMaterials(response.data.meta.pagination.total)
    })
    .catch(error => {
      console.log(error)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=> {
      setCardList([
        { name: 'Global Fund Districts', amount: gfmisDistricts, icon: 'public', link: '/' },
        { name: 'Global Fund Schools', amount: gfmisSchools, icon: 'school', link: '/schools' },
        { name: 'Global Fund Learners', amount: gfmisStudents, icon: 'people', link: '/beneficiaries' },
        { name: 'Learning Materials', amount: cseMaterials, icon: 'book', link: '/modules' },
        ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gfmisDistricts,gfmisSchools,gfmisStudents,cseMaterials])

  return (
    <Grid container spacing={3} sx={{ mt: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={6} md={3} lg={3} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>
            <Box sx={{ backgroundColor: theme.palette.primary.main, color: 'white', px: 2, py: 1, display: 'flex', justifyContent: 'auto'}}>
              <Tooltip title="View Details" placement="top">
                <Button sx={{color: 'white'}} onClick={() => navigate(item.link)}>
                    View Details
                </Button>
              </Tooltip>
            </Box>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
