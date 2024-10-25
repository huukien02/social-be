"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const multer_1 = __importDefault(require("../lib/multer"));
const userRouter = (0, express_1.Router)();
// Định nghĩa các route cho người dùng
userRouter.get("/:id", userController_1.getUser); // Lấy thông tin người dùng theo ID
userRouter.post("/create", userController_1.createUser); // Tạo người dùng mới
userRouter.put("/upload-avatar", multer_1.default.single("avatar"), userController_1.uploadAvatar);
userRouter.put("/update", userController_1.updateUser); // Cập nhật thông tin người dùng theo ID
userRouter.delete("/:id", userController_1.deleteUser); // Xóa người dùng theo ID
exports.default = userRouter;
//# sourceMappingURL=users.js.map