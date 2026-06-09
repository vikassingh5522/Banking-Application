import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  Stack,
  Typography,
} from '@mui/material';
import ProfileImage from 'assets/avatar.jpg';
import IconifyIcon from 'components/base/IconifyIcon';
import { useAuth } from 'providers/AuthProvider';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import paths from 'routes/path';

/* ------------------------Profile dropdown Data --------------------------- */
const profileData = [
  {
    href: paths.profile,
    title: 'My Profile',
    subtitle: 'Account Settings',
    icon: 'fa:user-circle-o',
    color: 'primary.light',
  },
];
/* -------------------------------------------------------------------------- */
const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleOpenDropdown = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate(paths.login, { replace: true });
  };

  return (
    <Fragment>
      <IconButton sx={{ p: 0, position: 'relative' }} onClick={handleOpenDropdown}>
        <Avatar
          alt="Avatar"
          src={ProfileImage}
          slotProps={{
            img: {
              sx: {
                objectFit: 'cover',
                position: 'absolute',
                top: '75%',
                left: '30%',
                transform: 'translate(-50%, -50%) scale(1.5)',
              },
            },
          }}
          sx={{ width: { xs: 40, md: 45, xl: 60 }, height: { xs: 40, md: 45, xl: 60 } }}
        />
      </IconButton>
      {/* Profile Menu Dropdown*/}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: 280,
            bgcolor: 'background.default',
          },
        }}
      >
        <Box p={3}>
          <Typography variant="subtitle1" color="text.primary">
            User Profile
          </Typography>
          <Stack direction="row" py={2.5} spacing={1.5} alignItems="center">
            <Avatar src={ProfileImage} alt="Profile Image" sx={{ width: 65, height: 65 }} />
            <Box>
              <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                {user?.name || 'Charlene Reed'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {user?.title || 'Designer'}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <IconifyIcon icon="majesticons:mail-line" />
                {user?.email || 'info@dashbank.com'}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          {profileData.map((profileItem) => (
            <Box key={profileItem.title} sx={{ py: 1.5, px: 0 }}>
              <Link href={profileItem.href}>
                <Stack direction="row" spacing={1.5}>
                  <Stack
                    direction="row"
                    sx={{
                      width: 45,
                      height: 45,
                      bgcolor: 'neutral.light',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1.5,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        minwidth: 24,
                        height: 24,
                        bgcolor: 'transparent',
                      }}
                    >
                      <IconifyIcon icon={profileItem.icon} color={profileItem.color} />
                    </Avatar>
                  </Stack>
                  <div>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: 150,
                      }}
                    >
                      {profileItem.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: 150,
                      }}
                      noWrap
                    >
                      {profileItem.subtitle}
                    </Typography>
                  </div>
                </Stack>
              </Link>
            </Box>
          ))}
          <Box mt={1.25}>
            <Button onClick={handleLogout} variant="outlined" color="error" fullWidth>
              Logout
            </Button>
          </Box>
        </Box>
      </Menu>
    </Fragment>
  );
};

export default ProfileDropdown;
