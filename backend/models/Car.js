const Vehicle = require('./Vehicle');

class Car extends Vehicle {
    constructor(vehicleNumber, brand, rentalPrice, numberOfSeats) {
        super(vehicleNumber, brand, rentalPrice);
        this.numberOfSeats = Number(numberOfSeats);
        this.type = 'Car';
    }
}
module.exports = Car;
