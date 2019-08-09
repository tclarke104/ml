import { Document } from 'mongoose';

export interface User extends Document {
    local: {
        email: string;
        password: string;
        name: string;
    }
    socketIds: [Number];
    validPassword(password: string, localPassword: string): boolean,
    generateHash(password: string): string
}