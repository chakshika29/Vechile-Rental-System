import React, { useState } from 'react';

function AddVehicle({ onClose, onAdded, apiUrl, currencyDetails }) {
  const [type, setType] = useState('Car');
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    brand: '',
    rentalPrice: '',
    numberOfSeats: '',
    engineCapacity: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const basePrice = Number(formData.rentalPrice) / currencyDetails.rate;
      const payload = { ...formData, rentalPrice: basePrice, type };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add vehicle');
      }
      onAdded();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <div className="modal-header">
          <h2>Add New Vehicle</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </select>
          </div>

          <div className="form-group">
            <label>Vehicle Number</label>
            <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Brand / Model</label>
            <input name="brand" value={formData.brand} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Rental Price (in {currencyDetails.symbol} per day)</label>
            <input type="number" name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} required min="0.01" step="0.01" />
          </div>

          {type === 'Car' && (
            <div className="form-group">
              <label>Number of Seats</label>
              <input type="number" name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} required min="1" />
            </div>
          )}

          {type === 'Bike' && (
            <div className="form-group">
              <label>Engine Capacity (cc)</label>
              <input type="number" name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} required min="1" />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={onClose} style={{ background: 'transparent', color: 'var(--text)', border: 'none', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" className="btn-primary">Add Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
