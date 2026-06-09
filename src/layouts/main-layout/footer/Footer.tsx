import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" textAlign="center" py={2}>
      <Container maxWidth="xl" disableGutters>
        <Typography color="primary.light" fontSize={12}>
          (c) {new Date().getFullYear()} ConnectBank. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
