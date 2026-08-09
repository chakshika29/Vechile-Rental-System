const express = require('express');
const cors = require('cors');
const Car = require('./models/Car');
const Bike = require('./models/Bike');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store
const vehicles = [];

app.get('/api/vehicles', (req, res) => {
    res.json(vehicles);
});

app.post('/api/vehicles', (req, res) => {
    const { vehicleNumber, brand, rentalPrice, type, numberOfSeats, engineCapacity } = req.body;
    
    // Check if vehicle number already exists
    if (vehicles.find(v => v.vehicleNumber === vehicleNumber)) {
        return res.status(400).json({ error: 'Vehicle with this number already exists.' });
    }

    let vehicle;
    if (type === 'Car') {
        vehicle = new Car(vehicleNumber, brand, rentalPrice, numberOfSeats);
    } else if (type === 'Bike') {
        vehicle = new Bike(vehicleNumber, brand, rentalPrice, engineCapacity);
    } else {
        return res.status(400).json({ error: 'Invalid vehicle type.' });
    }

    vehicles.push(vehicle);
    res.status(201).json(vehicle);
});

app.post('/api/vehicles/calculate', (req, res) => {
    const { vehicleNumber, days } = req.body;
    
    const vehicleData = vehicles.find(v => v.vehicleNumber === vehicleNumber);
    if (!vehicleData) {
        return res.status(404).json({ error: 'Vehicle not found.' });
    }

    // Since our data store array holds the actual class instances in memory
    // vehicleData will have the calculateRent method inherited from Vehicle.
    const rent = vehicleData.calculateRent(days);
    
    res.json({ vehicle: vehicleData, days, totalRent: rent });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
