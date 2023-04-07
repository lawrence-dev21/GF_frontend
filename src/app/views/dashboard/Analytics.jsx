import { Grid, styled} from '@mui/material';
import { Fragment } from 'react';
import StatCards from './shared/StatCards';
import AttendanceChart from './shared/AttendanceChart';

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

  const data = [12, 19, 3, 5, 7];
  const labels = ['2023-04-01', '2023-04-02', '2023-04-03', '2023-04-04', '2023-04-05'];
  const title = 'Attendance';

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item sx={{ mb: 0}}>
           <Title>Global Fund Management System</Title>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <StatCards />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{mt: 4}}>
          <Grid item lg={6} md={6} sm={6} xs={6}>
              <AttendanceChart data={data} labels={labels} title={title} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
              <AttendanceChart data={data} labels={labels} title={title} />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
