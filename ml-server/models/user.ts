import { Schema, model } from 'mongoose';
import { compareSync, hashSync, genSaltSync } from 'bcrypt-nodejs';
import { User } from './interfaces';

const UserSchema = new Schema({
    local: {
        email: String,
        password: String,
        name: String
    }
})

UserSchema.methods.generateHash = (password: string) => {
    return hashSync(password, genSaltSync(8));
}

UserSchema.methods.validPassword = (password: string, localPassword: string) => {
    return compareSync(password, localPassword);
}

export const UserModel = model<User>('User', UserSchema);
