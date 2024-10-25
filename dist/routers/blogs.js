"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../lib/multer"));
const blogsController_1 = require("../controllers/blogsController");
const blogRouter = (0, express_1.Router)();
// Route để lấy tất cả bài viết
blogRouter.get("/", blogsController_1.getBlogs);
// Route để tạo một bài viết mới
blogRouter.post("/create", multer_1.default.single("image"), blogsController_1.createBlog);
exports.default = blogRouter;
//# sourceMappingURL=blogs.js.map