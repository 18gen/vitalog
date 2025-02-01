// src/components/ClientLayout.tsx
'use client';

import { useState } from 'react';
import { Box, Drawer, useTheme } from '@mui/material';
import Navbar from './Navbar';

const drawerWidth = 300;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      {/* This Box wraps the entire page (Navbar + content) and shifts when the drawer opens */}
      <Box
        sx={{
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginRight: drawerOpen ? `${drawerWidth}px` : 0,
        }}
      >
        {/* Pass toggleDrawer to the Navbar so it can open/close the drawer */}
        <Navbar toggleDrawer={toggleDrawer} />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>

      {/* Persistent Drawer on the right */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Record History
            </Box>
            {/* Simple "Close" button */}
            <Box
              component="button"
              onClick={toggleDrawer}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              X
            </Box>
          </Box>
          {/* Drawer Content (e.g. record history) */}
          <Box>
            {/* Replace this with your actual record history list */}
            <Box>Record history content goes here.</Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
