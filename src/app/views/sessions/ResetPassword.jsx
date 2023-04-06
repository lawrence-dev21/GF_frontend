import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ResetPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 500,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('/auth/reset-password', { token, password });
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <ResetPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="password"
                  name="password"
                  size="small"
                  label="New Password"
                  value={password}
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />

                <TextField
                  type="password"
                  name="confirmPassword"
                  size="small"
                  label="Confirm New Password"
                  value={confirmPassword}
                  variant="outlined"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />

                <Button fullWidth variant="contained" color="primary" type="submit">
                  Reset Password
                </Button>

                {error && <Box sx={{ mt: 2, color: 'error.main' }}>{error}</Box>}
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ResetPasswordRoot>
  );
};

export default ResetPassword;
