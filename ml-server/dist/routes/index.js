"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const auth_1 = require("./auth");
exports.restricedRouter = express_1.Router();
exports.unrestrictedRouter = express_1.Router();
exports.restricedRouter.get('/', (req, res) => {
    res.send('Welcome to the api');
});
exports.unrestrictedRouter.use(users_1.userRouter);
exports.unrestrictedRouter.use(auth_1.authRouter);
//# sourceMappingURL=index.js.map