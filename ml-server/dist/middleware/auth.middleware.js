"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    else
        res.status(503).send('UNAUTHORIZED');
};
//# sourceMappingURL=auth.middleware.js.map