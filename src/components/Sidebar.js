import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import sidebarItems from '../utils/sidebarItems';

const drawerWidth = 240;

function Sidebar({ isOpen }) {
  const location = useLocation(); // Get the current route

  return (
    <Drawer
      sx={{
        width: isOpen ? drawerWidth : 0, 
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : 0,
          boxSizing: 'border-box',
          marginTop: '64px', 
          position: 'fixed',
          height: '100%',
          transition: 'width 0.3s ease',
          backgroundColor: '#fff', // Set background color for the sidebar
        },
      }}
      variant="persistent"
      anchor="left"
      open={isOpen} 
    >
      <Toolbar />
      <List>
        {sidebarItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor: location.pathname === item.path ? '#4379F2' : 'transparent', // Highlight active item
              color: location.pathname === item.path ? '#fff' : '#000', // Change text color for active item
              '&:hover': {
                backgroundColor: location.pathname === item.path ? '#4379F2' : '#f0f0f0', // Change hover color
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} sx={{ color: 'inherit' }} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default Sidebar;
