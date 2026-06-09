import { Box, Button, Drawer, List, Stack, Toolbar, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import Logo from 'components/common/Logo';
import { menuLinks } from 'layouts/main-layout/sidebar/MenuLinks';
import MenuListItem from 'layouts/main-layout/sidebar/MenuListItem';
import { Link as RouterLink } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
interface SidebarProps {
  drawerWidth: {
    lg: number;
    md: number;
    sm: number;
  };
}
const Sidebar = ({ drawerWidth }: SidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: {
            xs: drawerWidth.sm,
            lg: drawerWidth.md,
            xl: drawerWidth.lg,
          },
          bgcolor: '#061B3A',
          borderRight: 0,
          color: 'common.white',
        },
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 2,
        py: 3.5,
        overflow: 'hidden',
        width: {
          xs: drawerWidth.sm,
          lg: drawerWidth.md,
          xl: drawerWidth.lg,
        },
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: 100, cursor: 'pointer' }}>
        <Logo color="common.white" subtitle="for Business" />
      </Toolbar>

      <SimpleBar style={{ maxHeight: 'calc(100vh - 220px)' }}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {menuLinks.map((menu) => (
            <MenuListItem key={menu.id} menuItem={menu} />
          ))}
        </List>
      </SimpleBar>
      <Stack
        sx={{
          mt: 'auto',
          mx: 1.5,
          mb: 2,
          p: 2,
          borderRadius: 3,
          bgcolor: 'rgba(37, 99, 235, 0.18)',
          border: '1px solid rgba(255,255,255,0.1)',
          gap: 1.25,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          <Typography fontWeight={700} color="common.white" fontSize={13}>
            AI Business Assistant
          </Typography>
          <Box sx={{ px: 0.75, py: 0.25, borderRadius: 1, bgcolor: '#6D4AFF', fontSize: 11 }}>
            Beta
          </Box>
        </Stack>
        <Typography color="rgba(255,255,255,0.68)" fontSize={12}>
          Ask me anything about your business
        </Typography>
        <Button
          component={RouterLink}
          to="/ai-assistant"
          size="small"
          variant="contained"
          startIcon={<IconifyIcon icon="lucide:sparkles" width={15} />}
        >
          Ask Now
        </Button>
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
