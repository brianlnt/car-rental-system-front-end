import { Role } from "./Role";

export interface User {
    userId: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    createdAt?: string;
    updatedAt?: string;
    roles: number[];
}
