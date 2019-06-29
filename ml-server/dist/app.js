"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const mongoose_1 = require("mongoose");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./config/passport");
const auth_middleware_1 = require("./middleware/auth.middleware");
exports.app = express_1.default();
const port = 8888;
passport_2.passportInit(passport_1.default);
// connect to mongo
mongoose_1.connect('mongodb://localhost/ml', { useNewUrlParser: true });
mongoose_1.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose_1.connection.once('open', () => console.log('connected to mongo'));
exports.app.use(morgan_1.default('dev'));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(express_session_1.default({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session()); // persistent login sessions
exports.app.use('/', routes_1.unrestrictedRouter);
exports.app.use('/', auth_middleware_1.ensureAuthenticated, routes_1.restricedRouter);
// catch 404 and forward to error handler
exports.app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
// start the Express server
exports.app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map