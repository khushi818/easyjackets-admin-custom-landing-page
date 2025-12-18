import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const DashboardAdmin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPluginDropdown, setOpenPluginDropdown] = useState(false); // State for the dropdown
  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePluginDropdownToggle = () => {
    setOpenPluginDropdown(!openPluginDropdown);
  };

  const mainItems = [
    // { name: 'Role Admin', icon: <PersonAddIcon />, link: '/role' },
    { name: 'Products', icon: <InventoryIcon />, link: '/products' },
    { name: 'Orders', icon: <ListAltIcon />, link: '/orders' },
    { name : 'Features' , icon : '', link : '/features' },
    { name : 'Bulk Order' , icon : '', link : '/bulkorder' },
    { name : 'Website' , icon : '' , link : '/website'},
    { name : 'Blog' , icon : '' , link : '/blogs'},
    { name :  'Customer' , icon  : '' , link : '/users'},
    { name : 'MetaData' , icon : '' , link : '/metadata'}
  ];

  const pluginItems = [
    {name : 'Categories' , link : '/category'},
    {name : 'Colors' , link : '/colors'},
    { name: 'Collars', link: '/collar' },
    { name: 'Sleeves', link: '/sleeves' },
    { name: 'Closure', link: '/closure' },
    { name: 'Pockets', link: '/pockets' },
    { name: 'Linings', link: '/linings' },
    { name: 'Designs', link: '/design' },
    { name: 'Materials', link: '/material' },
    { name: 'Size', link: '/size' }
  ];

  const navigate = useNavigate()
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {mainItems.map((item, index) => (
          <Link to={item.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}

        {/* Plugins Dropdown */}
        <ListItem button onClick={handlePluginDropdownToggle}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Plugins" />
          {openPluginDropdown ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPluginDropdown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {pluginItems.map((item, index) => (
              <Link to={item.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Collapse>

        {/* Logout */}
        <Link to="/">
          <ListItem
            button
            onClick={() => {
              sessionStorage.clear();
              logout();
              navigate('/')
            }}
            style={{ cursor: 'pointer' }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            display: { xs: 'none', sm: 'block' },
          }}
          open
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Typography>
            <Outlet />
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardAdmin;
