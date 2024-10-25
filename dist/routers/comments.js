"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentsController_1 = require("../controllers/commentsController");
const commentsRouter = (0, express_1.Router)();
// Định nghĩa các route cho người dùng
commentsRouter.post("/create", commentsController_1.createComment); // Tạo người dùng mới
exports.default = commentsRouter;
//# sourceMappingURL=comments.js.map