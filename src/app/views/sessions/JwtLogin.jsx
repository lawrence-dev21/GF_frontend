import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField, Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: 'lawrence.kasonde@moe.gov.zm',
  password: 'Lusaka@123',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtLogin = () => {

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  useEffect(() => {
    console.log(user)
    if(!user) {
      enqueueSnackbar('Please login', { variant: 'info'})
    } else {
        navigate('/dashboard/default');
        enqueueSnackbar('Successfully logged in', { variant: 'success'})
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/dashboard/default');
      enqueueSnackbar('Successfully logged in', { variant: 'success'})
    } catch (e) {
      setLoading(false);
      enqueueSnackbar('Incorrect email or password', { variant: 'error'})
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
          <Typography variant="h4" align='center' paddingTop={1.5} >
            Ministry of Education
            <Typography variant="h5">
            Global Fund MIS
            </Typography></Typography>
            <JustifyBox p={3} height="65%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/zambia-coats-of-arm.jpg" width="70%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
          <Typography variant="h5" align='center' paddingTop={1.5}>
            SIGN IN
            </Typography>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      fullWidth variant="contained"
                      sx={{ my: 2 }}
                    >
                      Login
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
