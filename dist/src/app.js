"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./shared/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", async (req, res, next) => {
    setTimeout(() => {
        next();
    }, 2000);
}, routes_1.default);
app.get("/", (req, res) => {
    console.log('updated code');
    res.sendFile(__dirname + "/index.html");
});
app.use((req, res) => {
    res.status(404).send({ message: "Route not found", requested: req.url });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
