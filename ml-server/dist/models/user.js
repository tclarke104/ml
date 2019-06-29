"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_nodejs_1 = require("bcrypt-nodejs");
const UserSchema = new mongoose_1.Schema({
    local: {
        email: String,
        password: String,
        name: String
    }
});
UserSchema.methods.generateHash = (password) => {
    return bcrypt_nodejs_1.hashSync(password, bcrypt_nodejs_1.genSaltSync(8));
};
UserSchema.methods.validPassword = (password, localPassword) => {
    return bcrypt_nodejs_1.compareSync(password, localPassword);
};
exports.UserModel = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.js.map