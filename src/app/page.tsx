'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Container, Typography, Button, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Home() {
  const [records, setRecords] = useState([
    { date: '01/30', temperature: 36.5, bloodPressure: '120/80', pulse: 75 },
    { date: '01/31', temperature: 37.1, bloodPressure: '118/76', pulse: 72 },
  ]);

  const addRecord = () => {
    const newRecord = {
      date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
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

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: 'white', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold">トベ さん</Typography>
      <Typography color="textSecondary">マイナンバー: 1111</Typography>
      
      <Paper sx={{ mt: 3, p: 2 }}>
        <Line data={chartData} />
      </Paper>
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
