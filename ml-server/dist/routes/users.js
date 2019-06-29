"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.userRouter = express_1.Router();
exports.userRouter.get('/users', controllers_1.getUser);
//# sourceMappingURL=users.js.map