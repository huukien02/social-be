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
exports.addOrUpdateReaction = void 0;
const reaction_1 = require("../models/reaction");
const users_1 = require("../models/users");
const blogs_1 = require("../models/blogs");
const validReactionTypes = ["like", "love", "angry"]; // Các loại phản ứng hợp lệ
const addOrUpdateReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, userId, blogId } = req.body; // Lấy dữ liệu từ request body
    try {
        const user = yield users_1.User.findByPk(userId);
        const blog = yield blogs_1.Blog.findByPk(blogId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        // Tìm Reaction hiện tại của user cho blog
        const existingReaction = yield reaction_1.Reaction.findOne({
            where: {
                userId,
                blogId,
            },
        });
        if (existingReaction) {
            // Nếu đã có reaction, cập nhật loại phản ứng
            existingReaction.type = type;
            yield existingReaction.save();
            return res.status(200).json({
                status: true,
                message: "Đã cập nhật reaction.",
                reaction: existingReaction, // Trả về reaction đã cập nhật
            });
        }
        else {
            // Nếu chưa có reaction, tạo mới
            const newReaction = yield reaction_1.Reaction.create({
                userId,
                blogId,
                type,
            });
            return res.status(201).json({
                status: true,
                message: "Reaction thành công.",
                reaction: newReaction, // Trả về reaction mới được tạo
            });
        }
    }
    catch (error) {
        console.error("Error adding/updating reaction:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.addOrUpdateReaction = addOrUpdateReaction;
//# sourceMappingURL=reactionController.js.map