"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const items_1 = __importDefault(require("./routes/items"));
const app = express_1.default();
app.use(body_parser_1.json());
app.use("/items", items_1.default);
/** Middleware */
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
