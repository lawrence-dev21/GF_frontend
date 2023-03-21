import { Grid, styled} from '@mui/material';
import { Fragment } from 'react';
import StatCards from './shared/StatCards';
import { AdvanceAreaChart } from './echarts';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));


const Analytics = () => {
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12}>

           <Title>Global Fund Management System</Title>
          </Grid>
         
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <AdvanceAreaChart />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
          </Grid>

         
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
