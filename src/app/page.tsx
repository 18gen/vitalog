'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
  Button,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Navbar from '@/components/Navbar';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [records, setRecords] = useState([
    { date: '01/30', temperature: 36.5, bloodPressure: '120/80', pulse: 75 },
    { date: '01/31', temperature: 37.1, bloodPressure: '118/76', pulse: 72 },
  ]);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Toggle the drawer open/closed
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Add a new record
  const addRecord = () => {
    const newRecord = {
      date: new Date().toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
      }),
      temperature: (36 + Math.random()).toFixed(1),
      bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${
        70 + Math.floor(Math.random() * 10)
      }`,
      pulse: 70 + Math.floor(Math.random() * 10),
    };
    setRecords([newRecord, ...records]);
  };

  // Delete a record
  const deleteRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  // Prepare chart data
  const chartDataTemp = {
    labels: records.map((r) => r.date).reverse(),
    datasets: [
      {
        label: '体温 (°C)',
        data: records.map((r) => r.temperature).reverse(),
        borderColor: theme.palette.mode === 'dark' ? 'cyan' : 'blue',
        fill: false,
      },
    ],
  };
  const chartDataPulse = {
    labels: records.map((r) => r.date).reverse(),
    datasets: [
      {
        label: '心拍数',
        data: records.map((r) => r.pulse).reverse(),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };
  const chartDataBP = {
    labels: records.map((r) => r.date).reverse(),
    datasets: [
      {
        label: '血圧 (高)',
        data: records.map((r) => parseFloat(r.bloodPressure.split('/')[0])).reverse(),
        borderColor: 'red',
        fill: false,
      },
      {
        label: '血圧 (低)',
        data: records.map((r) => parseFloat(r.bloodPressure.split('/')[1])).reverse(),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const drawerWidth = 300;

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Navbar remains at full width and is not shifted */}
      <Navbar toggleDrawer={toggleDrawer} />

      {/* Main content area (below Navbar) shifts when drawer is open */}
      <Box
        sx={{
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginTop: '2px', // Adjust based on Navbar height
          marginRight: isDrawerOpen ? `${drawerWidth}px` : 0,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          トベ さん
        </Typography>

        {isSmallScreen ? (
          <>
            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography variant="subtitle1" mb={1}>
                体温
              </Typography>
              <Line data={chartDataTemp} />
            </Paper>
            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography variant="subtitle1" mb={1}>
                心拍数
              </Typography>
              <Line data={chartDataPulse} />
            </Paper>
            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography variant="subtitle1" mb={1}>
                血圧
              </Typography>
              <Line data={chartDataBP} />
            </Paper>
          </>
        ) : (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="chart tabs">
                <Tab label="体温" {...a11yProps(0)} />
                <Tab label="心拍数" {...a11yProps(1)} />
                <Tab label="血圧" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
              <Paper sx={{ mt: 3, p: 2 }}>
                <Line data={chartDataTemp} />
              </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              <Paper sx={{ mt: 3, p: 2 }}>
                <Line data={chartDataPulse} />
              </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
              <Paper sx={{ mt: 3, p: 2 }}>
                <Line data={chartDataBP} />
              </Paper>
            </CustomTabPanel>
          </>
        )}
      </Box>

      {/* Right Drawer for Record History */}
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        variant="persistent"
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Record History</Typography>
          <IconButton onClick={toggleDrawer}>X</IconButton>
        </Box>
        <Box sx={{ overflow: 'auto', flexGrow: 1, p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addRecord}
            fullWidth
            sx={{ mb: 2 }}
          >
            ＋ Add Record
          </Button>
          <List>
            {records.map((record, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteRecord(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                }
                sx={{
                  mb: 1,
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'white',
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={record.date}
                  secondary={`${record.temperature}°C, ${record.bloodPressure}, ${record.pulse} bpm`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
