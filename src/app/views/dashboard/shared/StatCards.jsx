  import  { useState, useEffect } from 'react'
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { getModules } from 'app/redux/actions'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
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

const selectModules = state => state.modules.moduleList
const StatCards = () => {
  const navigate = useNavigate();
  const [cardList, setCardList] = useState([])
  const dispatch = useDispatch() 
  const modules = useSelector(selectModules)
  const [count, setCount] = useState(null)
  const [gender, setGender] = useState(null)
  useEffect(() => {
      if(!count){
        fetch('/api/student-count').then(({data}) => setCount(data))
      }
if(!gender){
        fetch('/api/student-gender-count').then(({data}) => setGender(data))
}
      if(!modules.length){
          dispatch(getModules())
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, count])
  useEffect(()=> {
    if(!cardList.length){
      setCardList([...cardList,
          { name: 'Modules', amount: modules.length, icon: 'book', link: '/modules' }])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules,count])

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={() => navigate(item.link)}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
