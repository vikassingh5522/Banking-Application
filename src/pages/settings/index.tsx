import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useThemeMode } from 'providers/ThemeModeProvider';

const SettingsPage = () => {
  const { mode, setMode } = useThemeMode();

  return (
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} md={8} lg={6}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <IconifyIcon icon="lucide:settings" color="primary.main" width={24} />
                <div>
                  <Typography variant="h5" color="text.primary">
                    Account Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose how BankDash looks on this device.
                  </Typography>
                </div>
              </Stack>

              <RadioGroup
                value={mode}
                onChange={(event) => setMode(event.target.value as 'light' | 'dark')}
              >
                <FormControlLabel value="light" control={<Radio />} label="Light mode" />
                <FormControlLabel value="dark" control={<Radio />} label="Dark mode" />
              </RadioGroup>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
