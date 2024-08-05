import React, { createContext, ReactNode, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// Define types for rental context state
interface Rental {
    id: number;
    vehicleId: number;
    userId: number;
    startDate: string;
    endDate: string;
}

interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    available: boolean;
    pricePerDay: number;
}

interface RentalContextType {
    vehicles: Vehicle[];
    reservations: Rental[];
    searchQuery: string;
    filters: { [key: string]: any };
    sortBy: string;
    searchVehicles: (query: string) => void;
    setFilters: (filters: { [key: string]: any }) => void;
    setSortBy: (sortBy: string) => void;
    makeReservation: (vehicleId: number, userId: number, startDate: string, endDate: string) => void;
    cancelReservation: (reservationId: number) => void;
}

export const RentalContext = createContext<RentalContextType>({
    vehicles: [],
    reservations: [],
    searchQuery: "",
    filters: {},
    sortBy: "",
    searchVehicles: () => {},
    setFilters: () => {},
    setSortBy: () => {},
    makeReservation: () => {},
    cancelReservation: () => {},
});

export function RentalsContextComp() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [reservations, setReservations] = useState<Rental[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filters, setFilters] = useState<{ [key: string]: any }>({});
    const [sortBy, setSortBy] = useState<string>("");

    // Fetch available vehicles (placeholder function)
    useEffect(() => {
        // Simulate API call to fetch vehicles
        const fetchVehicles = async () => {
            // Simulated data
            const data: Vehicle[] = [
                { id: 1, make: "Toyota", model: "Camry", year: 2020, available: true, pricePerDay: 50 },
                { id: 2, make: "Honda", model: "Accord", year: 2019, available: true, pricePerDay: 45 },
                // Add more vehicles
            ];
            setVehicles(data);
        };
        fetchVehicles();
    }, []);

    const searchVehicles = (query: string) => {
        setSearchQuery(query);
        // Implement search logic here
    };

    const makeReservation = (vehicleId: number, userId: number, startDate: string, endDate: string) => {
        // Implement reservation logic here
        const newReservation: Rental = {
            id: Date.now(),
            vehicleId,
            userId,
            startDate,
            endDate,
        };
        setReservations([...reservations, newReservation]);
    };

    const cancelReservation = (reservationId: number) => {
        setReservations(reservations.filter((reservation) => reservation.id !== reservationId));
    };

    return (
        <RentalContext.Provider
            value={{
                vehicles,
                reservations,
                searchQuery,
                filters,
                sortBy,
                searchVehicles,
                setFilters,
                setSortBy,
                makeReservation,
                cancelReservation,
            }}
        >
            <Outlet />
        </RentalContext.Provider>
    );
}
