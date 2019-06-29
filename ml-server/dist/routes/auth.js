"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
exports.authRouter = express_1.Router();
exports.authRouter.post('/signup', passport_1.authenticate('local-signup'), (req, res) => {
    res.send('woohoo');
});
exports.authRouter.post('/login', passport_1.authenticate('local-login'), (req, res) => {
    res.send('woohoo');
});
//# sourceMappingURL=auth.js.map