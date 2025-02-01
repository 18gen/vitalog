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
import AddIcon from '@mui/icons-material/Add';

interface NavbarProps {
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export default function Navbar({ toggleDrawer, isDrawerOpen }: NavbarProps) {
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
          {!isDrawerOpen && (
            <IconButton onClick={toggleDrawer} color="inherit"
              sx={{
                border: '0.5px solid',
                borderRadius: '15%',
                padding: '7px',
              }}>
              <AddIcon />
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
