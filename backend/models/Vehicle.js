class Vehicle {
    constructor(vehicleNumber, brand, rentalPrice) {
        this.vehicleNumber = vehicleNumber;
        this.brand = brand;
        this.rentalPrice = Number(rentalPrice);
        this.type = 'Vehicle';
    }

    calculateRent(days) {
        return this.rentalPrice * days;
    }
}
module.exports = Vehicle;

class Truck extends Vehicle {
  constructor(vehicleNumber, brand, rentalPrice, loadCapacity) {
    super(vehicleNumber, brand, rentalPrice);
    this.loadCapacity = loadCapacity;
  }
  calculateRent(days) {
    return this.rentalPrice * days + (this.loadCapacity > 1000 ? 500 : 0);
  }
}
