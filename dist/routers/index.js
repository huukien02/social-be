"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
// Định nghĩa các route cho người dùng
userRouter.get("/", (req, res) => {
    res.send("Server is running");
});
exports.default = userRouter;
//# sourceMappingURL=index.js.map