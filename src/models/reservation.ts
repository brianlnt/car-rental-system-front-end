export interface Reservation{
    reservationId: number;
    userId: number;
    vehicleId: number;
    reservationDate: Date;
    effectiveDate: Date;
    expirationDate: Date;
}