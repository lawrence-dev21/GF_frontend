import { Grid, styled} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import StatCards from './shared/StatCards';
import AttendanceChart from './shared/AttendanceChart';
import axiosInstance from 'axios';

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
  const processData = (response) => {
    console.log(response)
    console.log('Response Data',response.data)
    const dataMap = new Map();

    response.data.forEach((attendance) => {
      console.log('attendance', attendance)
        const date = new Date(attendance.attributes.publishedAt).toISOString().slice(0, 10);
        const studentsCount = attendance.attributes.students.data.length;

        if (dataMap.has(date)) {
            dataMap.set(date, dataMap.get(date) + studentsCount);
        } else {
            dataMap.set(date, studentsCount);
        }
    });

    const data = [];
    const labels = [];

    dataMap.forEach((value, key) => {
        labels.push(key);
        data.push(value);
    });

    return { data, labels };
};
  const [ data, setData ] = useState([]);
  const [ labels, setLabels ] = useState(['2023-04-01', '2023-04-02', '2023-04-03', '2023-04-04', '2023-04-05']);
  const [ data2 ] = useState([12, 19, 3, 5, 7]);
  const [ labels2 ] = useState(['2023-04-01', '2023-04-02', '2023-04-03', '2023-04-04', '2023-04-05']);

  useEffect(() => {
    axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/attendences?populate=students`)
      .then(res => processData(res.data))
      .then(({data, labels}) => {
                                setData(data);
                               setLabels(labels);
                              })
  }, [])
  
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
          { data.length && 
          (
          <>
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <Title>Sexual Reproductive Health</Title>
                <AttendanceChart data={data} labels={labels} title={title} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <Title>Sexual Reproductive Health</Title>
                <AttendanceChart data={data2} labels={labels2} title={title} />
            </Grid>
          </>)
          }
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
