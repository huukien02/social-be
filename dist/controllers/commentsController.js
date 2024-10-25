"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = void 0;
const comments_1 = require("../models/comments"); // Đường dẫn đến model Comment
const users_1 = require("../models/users"); // Đường dẫn đến model User
const blogs_1 = require("../models/blogs"); // Đường dẫn đến model Blog
// Hàm tạo bình luận
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, userId, blogId } = req.body; // Lấy dữ liệu từ request body
        // Kiểm tra xem userId và blogId có hợp lệ không
        const user = yield users_1.User.findByPk(userId);
        const blog = yield blogs_1.Blog.findByPk(blogId);
        if (!user || !blog) {
            return res.status(400).json({ message: "User or Blog not found." });
        }
        // Tạo bình luận mới
        const comment = yield comments_1.Comment.create({
            content,
            userId, // Khóa ngoại để liên kết với User
            blogId, // Khóa ngoại để liên kết với Blog
        });
        return res.status(201).json({
            status: true,
            message: "Bình luận thành công",
            comment,
        }); // Trả về bình luận mới đã tạo
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createComment = createComment;
//# sourceMappingURL=commentsController.js.map