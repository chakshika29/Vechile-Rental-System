const Vehicle = require('./Vehicle');

class Bike extends Vehicle {
    constructor(vehicleNumber, brand, rentalPrice, engineCapacity) {
        super(vehicleNumber, brand, rentalPrice);
        this.engineCapacity = Number(engineCapacity);
        this.type = 'Bike';
    }
}
module.exports = Bike;
