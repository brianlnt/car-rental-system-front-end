import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Typography } from "@mui/material";
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { ReservationService } from "../../services/reservation/reservationService";
import { RoleService } from "../../services/role/roleService";
import { UserService } from "../../services/user/userService";
import { VehicleService } from "../../services/vehicle/vehicleService";
import { User } from "../../models/User";
import { Role } from "../../models/Role";
import { Vehicle } from "../../models/Vehicle";
import dayjs from "dayjs";
import { Reservation } from "../../models/reservation";

// Register necessary Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Initialize services
const reservationService = new ReservationService();
const roleService = new RoleService();
const userService = new UserService();
const vehicleService = new VehicleService();

export default function DashboardAdmin() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [userData, setUserData] = useState<{ name: string; users: number; }[]>([]);
    const [reservationData, setReservationData] = useState<{ name: string; reservations: number; }[]>([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedReservations = await reservationService.getAllReservations();
            const fetchedRoles = await roleService.getAllRoles();
            const fetchedUsers = await userService.getAllUsers();
            const fetchedVehicles = await vehicleService.getAllVehicles();

            setReservations(fetchedReservations);
            setRoles(fetchedRoles);
            setUsers(fetchedUsers);
            setVehicles(fetchedVehicles);

            const monthlyUserCounts: number[] = Array(12).fill(0); // Initialize an array for each month

            fetchedUsers.forEach(user => {
                const month = dayjs(user.createdAt).month(); // Get the month (0-11)
                monthlyUserCounts[month] += 1; // Increment the count for the respective month
            });

            const processedUserData = [
                { name: "Jan", users: monthlyUserCounts[0] },
                { name: "Feb", users: monthlyUserCounts[1] },
                { name: "Mar", users: monthlyUserCounts[2] },
                { name: "Apr", users: monthlyUserCounts[3] },
                { name: "May", users: monthlyUserCounts[4] },
                { name: "Jun", users: monthlyUserCounts[5] },
                { name: "Jul", users: monthlyUserCounts[6] },
                { name: "Aug", users: monthlyUserCounts[7] },
                { name: "Sep", users: monthlyUserCounts[8] },
                { name: "Oct", users: monthlyUserCounts[9] },
                { name: "Nov", users: monthlyUserCounts[10] },
                { name: "Dec", users: monthlyUserCounts[11] },
            ];

            setUserData(processedUserData);


             // Process reservation data to count reservations by month
             const monthlyReservationCounts = Array(12).fill(0); // Initialize an array for each month

             fetchedReservations.forEach(reservation => {
                 const month = dayjs(reservation.reservationDate).month(); // Get the month (0-11)
                 monthlyReservationCounts[month] += 1; // Increment the count for the respective month
             });
 
             const processedReservationData = [
                 { name: "Jan", reservations: monthlyReservationCounts[0] },
                 { name: "Feb", reservations: monthlyReservationCounts[1] },
                 { name: "Mar", reservations: monthlyReservationCounts[2] },
                 { name: "Apr", reservations: monthlyReservationCounts[3] },
                 { name: "May", reservations: monthlyReservationCounts[4] },
                 { name: "Jun", reservations: monthlyReservationCounts[5] },
                 { name: "Jul", reservations: monthlyReservationCounts[6] },
                 { name: "Aug", reservations: monthlyReservationCounts[7] },
                 { name: "Sep", reservations: monthlyReservationCounts[8] },
                 { name: "Oct", reservations: monthlyReservationCounts[9] },
                 { name: "Nov", reservations: monthlyReservationCounts[10] },
                 { name: "Dec", reservations: monthlyReservationCounts[11] },
             ];
 
             setReservationData(processedReservationData);
        }

        fetchData();
    }, []);

    // Transform data for User Role Distribution
    // const userRoleData = {
    //     labels: roles.map(role => role.roleName),
    //     datasets: [
    //         {
    //             label: "User Roles",
    //             data: roles.map(role => users.filter(user => user.useId === role.roleId).length),
    //             backgroundColor: ["#42A5F5", "#66BB6A", "#FFCA28"],
    //             hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFD54F"],
    //             hoverBorderColor: "rgba(255, 255, 255, 1)",
    //             hoverBorderWidth: 2,
    //         },
    //     ],
    // };

    // Transform data for Vehicle Types
    const vehicleTypeData = {
        labels: ["Toyota", "Honda", "Mazda", "Tesla", "BMW", "Huyndai", "Chervolet"], // You may need to adjust this based on your data
        datasets: [
            {
                label: "Number of Vehicles",
                data: [
                    vehicles.filter(vehicle => vehicle.make === "Toyota").length,
                    vehicles.filter(vehicle => vehicle.make === "Honda").length,
                    vehicles.filter(vehicle => vehicle.make === "Mazda").length,
                    vehicles.filter(vehicle => vehicle.make === "Tesla").length,
                    vehicles.filter(vehicle => vehicle.make === "BMW").length,
                    vehicles.filter(vehicle => vehicle.make === "Huyndai").length,
                    vehicles.filter(vehicle => vehicle.make === "Chervolet").length,
                ],
                backgroundColor: "#42A5F5",
                hoverBackgroundColor: "#64B5F6",
                borderColor: "#1E88E5",
                borderWidth: 1,
            },
        ],
    };

    // Example: Vehicle Status Distribution
    const vehicleStatusData = {
        labels: ["Available", "Rented", "Maintenance"],
        datasets: [
            {
                label: "Vehicles",
                data: [
                    vehicles.filter(vehicle => vehicle.availableStatus === "available").length,
                    vehicles.filter(vehicle => vehicle.availableStatus === "rented").length,
                    vehicles.filter(vehicle => vehicle.availableStatus === "maintenance").length,
                ],
                backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
                hoverBackgroundColor: ["#66BB6A", "#FFB74D", "#E57373"],
                hoverBorderColor: "rgba(255, 255, 255, 1)",
                hoverBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    }
                }
            },
        },
        hover: {
            mode: 'index' as const,
            intersect: true,
        },
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 1 }}>
            <Grid container spacing={4}>
                {/* Vehicle Status Distribution */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Vehicle Status Distribution</Typography>
                        <Doughnut data={vehicleStatusData} options={options} />
                    </Card>
                </Grid>

                
                {/* Reservation Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Reservations Over Time</Typography>
                        <Bar 
                            data={{
                                labels: reservationData.map((item) => item.name),
                                datasets: [
                                    {
                                        label: "Reservations",
                                        data: reservationData.map((item) => item.reservations),
                                        backgroundColor: "#42A5F5",
                                    },
                                ],
                            }} 
                            options={options} 
                        />
                    </Card>
                </Grid>

                {/* User Growth Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>User Growth Over Time</Typography>
                        <Bar 
                            data={{
                                labels: userData.map((item) => item.name),
                                datasets: [
                                    {
                                        label: "users",
                                        data: userData.map((item) => item.users),
                                        backgroundColor: "#8884d8",
                                    },
                                ],
                            }} 
                            options={options} 
                        />
                    </Card>
                </Grid>

                {/* Vehicle Types */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Vehicle Types</Typography>
                        <Bar data={vehicleTypeData} options={options} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
    
