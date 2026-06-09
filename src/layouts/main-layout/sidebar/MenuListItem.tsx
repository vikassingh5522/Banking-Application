import { alpha, Box, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { MenuLinkType } from 'layouts/main-layout/sidebar/MenuLinks';
import { Link as RouterLink, useLocation } from 'react-router-dom';
interface MenuListProps {
  menuItem: MenuLinkType;
  onDrawerClose?: () => void;
}
const MenuListItem = ({ menuItem, onDrawerClose }: MenuListProps) => {
  const location = useLocation();

  const isActive = location.pathname === menuItem.link;

  return (
    <ListItem
      key={menuItem.id}
      sx={{
        px: 1.25,
      }}
    >
      <Box
        component={RouterLink}
        to={menuItem.link}
        onClick={onDrawerClose}
        sx={{
          py: 1.15,
          px: 1.75,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flex: 1,
          borderRadius: 2,
          color: isActive ? 'common.white' : alpha('#ffffff', 0.72),
          bgcolor: isActive ? 'primary.main' : 'transparent',
          textDecoration: 'none',
          transition: 'background-color 0.2s ease, color 0.2s ease',
          '&:hover, &:focus': {
            backgroundColor: isActive ? 'primary.main' : alpha('#ffffff', 0.08),
            color: 'common.white',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            color: 'inherit',
          }}
        >
          <IconifyIcon icon={menuItem.icon} width={20} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{
                fontSize: { xs: 'caption.fontSize', xl: 'body1.fontSize' },
                fontWeight: 500,
                lineHeight: 1.25,
              }}
            >
              {menuItem.title}
            </Typography>
          }
        />
      </Box>
    </ListItem>
  );
};

export default MenuListItem;
