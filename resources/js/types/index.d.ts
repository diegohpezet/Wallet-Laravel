export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    balance: number;
    alias: string;
}

// Define a type for the Transfer
export interface TransferInterface {
    id: number;
    sender: User;
    receiver: User;
    amount: number;
    created_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
