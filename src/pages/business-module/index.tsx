import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { businessModules } from 'data/business-dashboard';
import { Navigate, useLocation } from 'react-router-dom';

const defaultActions = ['Review Summary', 'Create New Task', 'Export Report'];

const BusinessModulePage = () => {
  const { pathname } = useLocation();
  const module = businessModules.find((item) => item.path === pathname);

  if (!module) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Stack spacing={3} mb={3}>
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
            p: { xs: 3, md: 4 },
          }}
        >
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                display: 'grid',
                placeItems: 'center',
                color: 'primary.main',
                bgcolor: 'neutral.light',
              }}
            >
              <IconifyIcon icon={module.icon} width={28} />
            </Box>
            <Box>
              <Typography variant="h2" color="primary.darker" mb={0.5}>
                {module.title}
              </Typography>
              <Typography color="primary.light" maxWidth={680}>
                {module.description}
              </Typography>
            </Box>
          </Stack>
          <Button variant="contained" startIcon={<IconifyIcon icon="lucide:plus" />}>
            New Activity
          </Button>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {defaultActions.map((action, index) => (
          <Grid item xs={12} md={4} key={action}>
            <Card sx={{ height: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      color: 'primary.main',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <IconifyIcon
                      icon={index === 0 ? 'lucide:layout-dashboard' : index === 1 ? 'lucide:file-plus-2' : 'lucide:download'}
                      width={22}
                    />
                  </Box>
                  <Typography variant="h5" color="primary.darker">
                    {action}
                  </Typography>
                  <Typography color="primary.light">
                    This section is ready for the {module.title.toLowerCase()} workflow.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default BusinessModulePage;
