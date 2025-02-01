'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
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
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Navbar from '@/components/Navbar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

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
  const isLargeScreen = useMediaQuery('(min-width:900px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [records, setRecords] = useState([
    { date: '01/30', temperature: 36.5, bloodPressure: '120/80', pulse: 75 },
    { date: '01/31', temperature: 37.1, bloodPressure: '118/76', pulse: 72 },
  ]);
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [temperature, setTemperature] = useState(0);
  const [bloodPressureHigh, setBloodPressureHigh] = useState(0);
  const [bloodPressureLow, setBloodPressureLow] = useState(0);
  const [pulse, setPulse] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [isDrawerOpen]);

  const addRecord = () => {
    // Validate data
    // if (
    // ) {
    //   alert('Invalid vital data. Please check the values.');
    //   return;
    // }

    const newRecord = {
      date: selectedDate.toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
      }),
      temperature: temperature,
      bloodPressure: `${bloodPressureHigh}/${bloodPressureLow}`,
      pulse: pulse,
    };
    setRecords([newRecord, ...records]);
  };

  const deleteRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const exportData = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      records.map((record) => Object.values(record).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vital_records.csv');
    document.body.appendChild(link);
    link.click();
  };

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

  const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  const drawerWidth = 300;

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Box
        sx={{
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginRight: isDrawerOpen ? `${drawerWidth}px` : 0,
        }}
      >
        <Navbar toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      </Box>

      <Box
        sx={{
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginTop: '2px',
          marginRight: isDrawerOpen ? `${drawerWidth}px` : 0,
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          トベ さん
        </Typography>

        {isSmallScreen ? (
          <>
            <Paper sx={{ mt: 3, p: 2, overflowX: 'auto' }}>
              <Typography variant="subtitle1" mb={1}>
                体温
              </Typography>
              <div style={{ minWidth: '500px' }}>
                <Line data={chartDataTemp} options={chartOptions} />
              </div>
            </Paper>
            <Paper sx={{ mt: 3, p: 2, overflowX: 'auto' }}>
              <Typography variant="subtitle1" mb={1}>
                心拍数
              </Typography>
              <div style={{ minWidth: '500px' }}>
                <Line data={chartDataPulse} options={chartOptions} />
              </div>
            </Paper>
            <Paper sx={{ mt: 3, p: 2, overflowX: 'auto' }}>
              <Typography variant="subtitle1" mb={1}>
                血圧
              </Typography>
              <div style={{ minWidth: '500px' }}>
                <Line data={chartDataBP} options={chartOptions} />
              </div>
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
              <Line data={chartDataTemp} options={chartOptions} />
              </Paper>
                
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              <Paper sx={{ mt: 3, p: 2 }}>
                <Line data={chartDataPulse} options={chartOptions} />
              </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
              <Paper sx={{ mt: 3, p: 2 }}>
                <Line data={chartDataBP} options={chartOptions} />
              </Paper>
            </CustomTabPanel>
          </>
        )}
      </Box>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        variant={isLargeScreen ? 'persistent' : 'temporary'}
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: theme.palette.background.paper,
            position: isSmallScreen ? 'absolute' : 'fixed',
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
          <IconButton onClick={toggleDrawer}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{ overflow: 'auto', flexGrow: 1, p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue || new Date())}
              sx={{ mb: 2, width: '100%' }}
            />
          </LocalizationProvider>
          <TextField label="体温 (°C)" fullWidth value={temperature} onChange={(e) => setTemperature(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="血圧 (高)" fullWidth value={bloodPressureHigh} onChange={(e) => setBloodPressureHigh(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="血圧 (低)" fullWidth value={bloodPressureLow} onChange={(e) => setBloodPressureLow(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="心拍数" fullWidth value={pulse} onChange={(e) => setPulse(e.target.value)} sx={{ mb: 2 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={addRecord}
            fullWidth
            sx={{ mb: 2 }}
          >
            ＋ Add Record
          </Button>
          <Button
            variant="outlined"
            onClick={exportData}
            fullWidth
            sx={{ mb: 2 }}
          >
            Export Data as CSV
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
