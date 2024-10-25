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
exports.createBlog = exports.getBlogs = void 0;
const blogs_1 = require("../models/blogs");
const users_1 = require("../models/users");
const comments_1 = require("../models/comments");
const reaction_1 = require("../models/reaction");
// GET USER
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogs_1.Blog.findAll({
            include: [
                {
                    model: users_1.User,
                    as: "author", // Tên alias đã định nghĩa trong mối quan hệ
                    attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
                },
                {
                    model: comments_1.Comment,
                    as: "comments", // Alias đã định nghĩa trong mối quan hệ
                    attributes: ["id", "content", "createdAt"], // Chọn các trường cần thiết từ Comment
                    include: [
                        {
                            model: users_1.User,
                            as: "author", // Nếu cần thông tin tác giả của bình luận
                            attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
                        },
                    ],
                },
                {
                    model: reaction_1.Reaction,
                    as: "reactions", // Alias đã định nghĩa trong mối quan hệ với Reaction
                    attributes: ["id", "type", "createdAt"], // Chọn các trường cần thiết từ Reaction
                    include: [
                        {
                            model: users_1.User,
                            as: "author", // Nếu cần thông tin tác giả của phản ứng
                            attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
                        },
                    ],
                },
            ],
        });
        res.status(200).json(blogs); // Trả về danh sách bài viết
    }
    catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        res.status(500).json({ message: "Có lỗi xảy ra" }); // Trả về lỗi server
    }
});
exports.getBlogs = getBlogs;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, userId } = req.body;
    let imageUrl = req.file ? req.file.path : null; // Lấy đường dẫn ảnh từ Multer
    // Kiểm tra dữ liệu
    if (!title || !content) {
        return res.status(400).json({ message: "Tiêu đề và nội dung là bắt buộc" });
    }
    try {
        if (imageUrl) {
            imageUrl = imageUrl.replace("uploads\\", "");
        }
        // Gán giá trị null nếu imageUrl là một chuỗi rỗng
        if (!imageUrl || imageUrl.trim() === "") {
            imageUrl = null;
        }
        const newBlog = yield blogs_1.Blog.create({ title, content, imageUrl, userId }); // Tạo bài viết mới
        // Gửi blog hiện tại
        const blogWithAuthor = yield blogs_1.Blog.findOne({
            where: { id: newBlog.id },
            include: [
                {
                    model: users_1.User,
                    as: "author", // Tên alias đã định nghĩa trong mối quan hệ
                    attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
                },
            ],
        });
        return res.status(201).json({
            status: true,
            message: "Đăng bài thành công",
            blogWithAuthor,
        }); // Trả về bình luận mới đã tạo
    }
    catch (error) {
        // console.error("Lỗi khi tạo bài viết:", error);
        // res.status(500).json({ message: "Có lỗi xảy ra" }); // Trả về lỗi server
    }
});
exports.createBlog = createBlog;
//# sourceMappingURL=blogsController.js.map