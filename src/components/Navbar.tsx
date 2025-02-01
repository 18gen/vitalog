// src/components/Navbar.tsx
'use client';

import { useThemeToggle } from '@/components/ThemeProviderWrapper';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  toggleDrawer: () => void;
}

export default function Navbar({ toggleDrawer }: NavbarProps) {
  const { darkMode, toggleTheme } = useThemeToggle();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">VitaLog</Typography>
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton
            data-screenshot="toggle-mode"
            onClick={toggleTheme}
            color="inherit"
            sx={{
              border: '0.5px solid',
              borderRadius: '15%',
              padding: '7px',
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton onClick={toggleDrawer} color="inherit">
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
