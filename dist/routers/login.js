"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const loginRouter = (0, express_1.Router)();
// Định nghĩa các route cho người dùng
loginRouter.post("", loginController_1.loginUser); // Tạo người dùng mới
exports.default = loginRouter;
//# sourceMappingURL=login.js.map