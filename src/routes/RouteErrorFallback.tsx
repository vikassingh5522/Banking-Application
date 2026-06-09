import { Box, Button, Stack, Typography } from '@mui/material';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return error.statusText || error.data?.message || `Request failed with status ${error.status}.`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while loading this page.';
};

const RouteErrorFallback = () => {
  const error = useRouteError();
  const message = getErrorMessage(error);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'neutral.light',
        px: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: 1,
          maxWidth: 520,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          p: { xs: 3, sm: 4 },
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" color="primary.darker">
          Page could not be loaded
        </Typography>
        <Typography color="primary.light">{message}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload
          </Button>
          <Button component={Link} to="/" variant="outlined">
            Go home
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RouteErrorFallback;
