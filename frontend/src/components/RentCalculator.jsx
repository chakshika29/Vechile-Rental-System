import React, { useState } from 'react';

function RentCalculator({ vehicles, currencyDetails }) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!vehicleNumber) {
      setError('Please select a vehicle');
      return;
    }

    try {
      const response = await fetch('https://vechile-rental-system.onrender.com/api/vehicles/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleNumber, days: Number(days) })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Calculation failed');
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="glass-panel">
      <h2 className="mb-2">Calculate Rent</h2>
      
      <form onSubmit={handleCalculate}>
        <div className="form-group">
          <label>Select Vehicle</label>
          <select value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)}>
            <option value="">-- Choose a Vehicle --</option>
            {vehicles.map(v => (
              <option key={v.vehicleNumber} value={v.vehicleNumber}>
                {v.brand} ({v.vehicleNumber}) - {currencyDetails.symbol}{(v.rentalPrice * currencyDetails.rate).toFixed(2)}/day
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Rental Duration (Days)</label>
          <input 
            type="number" 
            value={days} 
            onChange={(e) => setDays(e.target.value)} 
            required 
            min="1"
          />
        </div>

        <button type="submit" className="btn-secondary" style={{ width: '100%' }}>
          Calculate Total
        </button>
      </form>

      {error && <div style={{ color: 'var(--danger)', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}

      {result && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Estimated Cost</h3>
          <div className="vehicle-details">
            <p><span>Vehicle:</span> <span>{result.vehicle.brand}</span></p>
            <p><span>Rate:</span> <span>{currencyDetails.symbol}{(result.vehicle.rentalPrice * currencyDetails.rate).toFixed(2)} / day</span></p>
            <p><span>Duration:</span> <span>{result.days} days</span></p>
            <div className="price-tag" style={{ borderTopColor: 'rgba(16, 185, 129, 0.3)' }}>
              Total: {currencyDetails.symbol}{(result.totalRent * currencyDetails.rate).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentCalculator;
