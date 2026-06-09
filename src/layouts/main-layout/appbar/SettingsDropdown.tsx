import { IconButton } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';

const SettingsDropdown = () => {
  const navigate = useNavigate();

  return (
    <IconButton sx={{ bgcolor: 'background.paper' }} onClick={() => navigate(paths.settings)}>
      <IconifyIcon
        icon="lucide:settings"
        color="text.secondary"
        sx={{ width: { xs: 18, md: 20, xl: 25 }, height: { xs: 18, md: 20, xl: 25 } }}
      />
    </IconButton>
  );
};

export default SettingsDropdown;
