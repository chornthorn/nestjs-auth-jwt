export interface IUser {
    id: number;
    name: string;
    email: string;
    password?: string;
    role?: UserRole;
}
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    USER = "user"
}
