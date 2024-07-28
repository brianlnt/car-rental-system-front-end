export interface AuthenticatedInfo {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    roles: string[];
}
