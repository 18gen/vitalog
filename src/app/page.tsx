'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Container, Typography, Button, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';


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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Home() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [records, setRecords] = useState([
    { date: '01/30', temperature: 36.5, bloodPressure: '120/80', pulse: 75 },
    { date: '01/31', temperature: 37.1, bloodPressure: '118/76', pulse: 72 },
  ]);
  
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addRecord = () => {
    const newRecord = {
      date: new Date().toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
      }),
      temperature: (36 + Math.random()).toFixed(1),
      bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 10)}`,
      pulse: 70 + Math.floor(Math.random() * 10),
    };
    setRecords([newRecord, ...records]); // Reverse order
  };

  const deleteRecord = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const chartData = {
    labels: records.map((r) => r.date).reverse(),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: records.map((r) => r.temperature).reverse(),
        borderColor: 'blue',
        fill: false,
      },
    ],
  }; 
  const chartData1 = {
    labels: records.map((r) => r.date).reverse(),
    datasets: [
      {
        label: 'Pulse',
        data: records.map((r) => r.pulse).reverse(),
        borderColor: 'blue',
        fill: false,
      },
    ],
  }; 
  const chartData2 = {
    labels: records.map((r) => r.date).reverse(),
    datasets: [
      {
        label: 'Blood Pressure(high)',
        data: records.map((r) => parseFloat(r.bloodPressure.split('/')[0])).reverse(),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Blood Pressure(low)',
        data: records.map((r) => parseFloat(r.bloodPressure.split('/')[1])).reverse(),
        borderColor: 'blue',
        fill: false,
      },

    ],
  }; 

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: 'white', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" marginBottom="30px">トベ さん</Typography>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: isSmallScreen ? "none" : "block" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="体温" {...a11yProps(0)} />
          <Tab label="心拍数" {...a11yProps(1)} />
          <Tab label="血圧" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Paper  sx={{ mt: 3, p: 2, display:isSmallScreen ? "block":"none", }}>
          <p style={{ marginBottom: "10px" }}>体温</p>
          <Line data={chartData} />  
      </Paper>
      <Paper sx={{ mt: 3, p: 2, display:isSmallScreen ? "block":"none", }}>
          <p style={{ marginBottom: "10px" }}>心拍数</p>
          <Line data={chartData1} />  
      </Paper>
      <Paper sx={{ mt: 3, p: 2, display:isSmallScreen ? "block":"none", }}>
          <p style={{ marginBottom: "10px" }}>血圧</p>
          <Line data={chartData2} />  
      </Paper>
      <CustomTabPanel value={value} index={0} >
        <Paper sx={{ mt: 3, p: 2, display: isSmallScreen ? "none" : "block"}}>
          <Line data={chartData} />  
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} >
        <Paper sx={{ mt: 3, p: 2, display: isSmallScreen ? "none" : "block"}}>
          <Line data={chartData1} />  
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} >
        <Paper sx={{ mt: 3, p: 2, display: isSmallScreen ? "none" : "block" }}>
          <Line data={chartData2} />  
        </Paper>
      </CustomTabPanel>
      </Box>
      <Button onClick={addRecord} variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>＋</Button>
      <List sx={{ mt: 3 }}>
        {records.map((record, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" onClick={() => deleteRecord(index)}>
              <DeleteIcon color="error" />
            </IconButton>
          }>
            <ListItemText primary={`${record.date} - ${record.temperature}°C - ${record.bloodPressure} - ${record.pulse} bpm`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );

}