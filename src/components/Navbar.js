import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

const menuItems = [
  { title: 'Profile', icon: <AccountCircle />, action: () => console.log('Profile clicked') },
  { title: 'Logout', icon: <Logout />, action: () => console.log('Logout clicked') },
];

function Navbar({ handleDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', zIndex: 1201 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <div>
          <IconButton
            size="small"
            edge="end"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.2))',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  borderRadius: 1,
                },
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.title} onClick={() => { item.action(); handleClose(); }}>
                {item.icon}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {item.title}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
