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
