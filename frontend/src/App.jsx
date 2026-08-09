import { useState, useEffect } from 'react';
import VehicleList from './components/VehicleList';
import AddVehicle from './components/AddVehicle';
import RentCalculator from './components/RentCalculator';

const API_URL = 'http://localhost:3001/api/vehicles';

const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83.5 }
};

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const currencyDetails = CURRENCIES[currency];

  const fetchVehicles = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleVehicleAdded = () => {
    fetchVehicles();
    setShowAddModal(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>LuxRentals</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--surface-border)' }}
          >
            {Object.keys(CURRENCIES).map(c => (
              <option key={c} value={c}>{c} ({CURRENCIES[c].symbol})</option>
            ))}
          </select>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            + Add Vehicle
          </button>
        </div>
      </header>

      <div className="main-grid">
        <div className="left-column">
          <VehicleList vehicles={vehicles} currencyDetails={currencyDetails} />
        </div>
        <div className="right-column">
          <RentCalculator vehicles={vehicles} currencyDetails={currencyDetails} />
        </div>
      </div>

      {showAddModal && (
        <AddVehicle 
          onClose={() => setShowAddModal(false)} 
          onAdded={handleVehicleAdded} 
          apiUrl={API_URL}
          currencyDetails={currencyDetails}
        />
      )}
    </div>
  );
}

export default App;
