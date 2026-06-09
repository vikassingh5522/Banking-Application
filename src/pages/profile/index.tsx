import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import ProfileImage from 'assets/avatar.jpg';
import IconifyIcon from 'components/base/IconifyIcon';
import { useAuth } from 'providers/AuthProvider';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} md={7} lg={5}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={ProfileImage} alt={user?.name} sx={{ width: 88, height: 88 }} />
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    User Profile
                  </Typography>
                  <Typography variant="h4" color="text.primary">
                    {user?.name || 'Charlene Reed'}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {user?.companyName || 'DashBank'}
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconifyIcon icon="majesticons:mail-line" color="primary.main" />
                  <Typography color="text.primary">{user?.email || 'info@dashbank.com'}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconifyIcon icon="lucide:building-2" color="primary.main" />
                  <Typography color="text.primary">
                    {user?.companyName || 'Sunrise Traders Pvt. Ltd.'}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
