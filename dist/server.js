"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use('/images', express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.listen(4003, function () { return console.log('server is running on port 4003'); });
//# sourceMappingURL=server.js.map