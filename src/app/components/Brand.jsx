import { Box, styled } from '@mui/material';
import logo from './logo/zambia-coats-of-arm.jpg'


const Logo = () => {
  return (
      <img src={logo} alt="" width="80" style={{ borderRadius: 4 }} />
  );
};

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '20px auto'
  // padding: '20px',
  // padding: '20px 18px 20px 29px',
}));


const Brand = ({ children }) => {
  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <Logo />
      </Box>
    </BrandRoot>
  );
};

export default Brand;
