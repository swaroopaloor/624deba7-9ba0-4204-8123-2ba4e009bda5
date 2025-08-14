// server.js

// 1. Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');

// 2. Initialize the Express app
const app = express();
const PORT = 3000;

// 3. Middleware Setup
app.use(cors());
app.use(express.json());

// 4. Data Storage
let deviceSavingsData = [];

// 5. Data Loading and Processing Function (for CSV)
const loadData = () => {
    const dataPath = path.join(__dirname, 'data', 'device-saving.csv');
    const results = [];

    fs.createReadStream(dataPath)
        .pipe(csv())
        .on('data', (data) => {
            // Convert strings to numbers and create a proper Date object
            results.push({
                deviceId: parseInt(data.device_id, 10),
                time: new Date(data.timestamp),
                carbonSaved: parseFloat(data.carbon_saved),
                dieselSaved: parseFloat(data.fueld_saved) 
            });
        })
        .on('end', () => {
            // Sort data by time
            deviceSavingsData = results.sort((a, b) => a.time - b.time);
            console.log(`CSV data successfully loaded. ${deviceSavingsData.length} records found.`);
        })
        .on('error', (error) => {
            console.error('Error loading or parsing CSV data:', error);
        });
};

// Load data when the server starts
loadData();

// 6. API Endpoint
app.get('/api/device-savings', (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Please provide both startDate and endDate query parameters.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Invalid date format. Please use ISO 8601 format (YYYY-MM-DD).' });
    }

    const filteredData = deviceSavingsData.filter(item => {
        const itemDate = new Date(item.time);
        return itemDate >= start && itemDate <= end;
    });

    let totalCarbonSavings = 0;
    let totalDieselSavings = 0;
    const monthlyAggregation = {};

    filteredData.forEach(item => {
        totalCarbonSavings += item.carbonSaved;
        totalDieselSavings += item.dieselSaved;

        const monthKey = item.time.toISOString().slice(0, 7); // Format as "YYYY-MM"
        if (!monthlyAggregation[monthKey]) {
            monthlyAggregation[monthKey] = { carbon: 0, diesel: 0 };
        }
        monthlyAggregation[monthKey].carbon += item.carbonSaved;
        monthlyAggregation[monthKey].diesel += item.dieselSaved;
    });

    const chartData = Object.keys(monthlyAggregation).map(month => ({
        month: month,
        carbonSavings: monthlyAggregation[month].carbon,
        dieselSavings: monthlyAggregation[month].diesel,
    })).sort((a,b) => a.month.localeCompare(b.month));

    const monthsInRange = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

    res.json({
        summary: {
            totalCarbonTonnes: totalCarbonSavings / 1000,
            totalDieselLitres: totalDieselSavings,
            monthlyAvgCarbonTonnes: monthsInRange > 0 ? (totalCarbonSavings / 1000) / monthsInRange : 0,
            monthlyAvgDieselLitres: monthsInRange > 0 ? totalDieselSavings / monthsInRange : 0,
        },
        chartData: chartData,
    });
});

// 7. Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
