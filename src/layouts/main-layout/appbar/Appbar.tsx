import { AppBar, Avatar, Badge, Box, IconButton, Link, Stack, Toolbar, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import SearchInput from 'layouts/main-layout/appbar/SearchInput';
import { Link as RouterLink } from 'react-router-dom';

interface NavbarProps {
  onDrawerToggle: () => void;
}

const MainNavbar = ({ onDrawerToggle }: NavbarProps) => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: 'common.white', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: { xs: 1.5, lg: 2 },
          py: { xs: 1, md: 0 },
        }}
      >
        <Stack direction="row" gap={1} sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <Link component={RouterLink} to="/dashboard" sx={{ display: 'flex', p: 0.5 }}>
            <Image src="/bankdash/bankdash.svg" alt="Logo" sx={{ width: 25 }} />
          </Link>
          <IconButton onClick={onDrawerToggle} sx={{ display: { md: 'none' } }}>
            <IconifyIcon icon="mingcute:menu-line" color="primary.darker" width={25} />
          </IconButton>
        </Stack>

        <Box sx={{ display: { xs: 'none', md: 'block' }, width: { md: 420, xl: 560 } }}>
          <SearchInput fullWidth size="medium" />
        </Box>

        <Stack direction="row" sx={{ alignItems: 'center', gap: { xs: 1.25, md: 2.25 } }}>
          <IconButton sx={{ bgcolor: 'background.paper' }}>
            <Badge badgeContent={12} color="error">
              <IconifyIcon icon="lucide:messages-square" color="primary.darker" width={20} />
            </Badge>
          </IconButton>
          <IconButton sx={{ bgcolor: 'background.paper' }}>
            <Badge badgeContent={5} color="error">
              <IconifyIcon icon="lucide:bell" color="primary.darker" width={20} />
            </Badge>
          </IconButton>
          <IconButton sx={{ bgcolor: 'background.paper', display: { xs: 'none', sm: 'inline-flex' } }}>
            <IconifyIcon icon="lucide:circle-help" color="primary.darker" width={20} />
          </IconButton>
          <Box sx={{ textAlign: 'right', display: { xs: 'none', lg: 'block' } }}>
            <Typography color="primary.darker" fontWeight={700} fontSize={14}>
              Sunrise Traders Pvt. Ltd.
            </Typography>
            <Typography color="primary.light" fontSize={11}>
              SME - GSTIN 27AABCS1234D1Z6
            </Typography>
          </Box>
          <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 13, fontWeight: 700 }}>
            ST
          </Avatar>
        </Stack>
      </Toolbar>
      <Box sx={{ display: { xs: 'block', md: 'none' }, px: 3.15, pb: 1.5 }}>
        <SearchInput fullWidth size="small" />
      </Box>
    </AppBar>
  );
};

export default MainNavbar;
