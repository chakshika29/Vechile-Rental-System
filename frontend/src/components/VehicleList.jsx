import React from 'react';

function VehicleList({ vehicles, currencyDetails }) {
  if (vehicles.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h3 style={{ color: 'var(--text-muted)' }}>No vehicles available.</h3>
        <p>Click "Add Vehicle" to add a new car or bike to the catalog.</p>
      </div>
    );
  }

  return (
    <div className="vehicle-grid">
      {vehicles.map((v) => (
        <div key={v.vehicleNumber} className="glass-panel vehicle-card">
          <div className="vehicle-type-badge">{v.type}</div>
          <h3>{v.brand}</h3>
          <div className="vehicle-details">
            <p><span>Vehicle No:</span> <span>{v.vehicleNumber}</span></p>
            {v.type === 'Car' && (
              <p><span>Seats:</span> <span>{v.numberOfSeats}</span></p>
            )}
            {v.type === 'Bike' && (
              <p><span>Engine:</span> <span>{v.engineCapacity}cc</span></p>
            )}
          </div>
          <div className="price-tag">
            {currencyDetails.symbol}{(v.rentalPrice * currencyDetails.rate).toFixed(2)} <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/ day</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VehicleList;
