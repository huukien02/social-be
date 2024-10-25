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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.uploadAvatar = exports.createUser = exports.getUser = void 0;
const users_1 = require("../models/users");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// GET USER
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id; // Lấy ID từ tham số URL
    try {
        // Tìm người dùng trong cơ sở dữ liệu theo ID
        const user = yield users_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({
                message: "Người dùng không tồn tại",
                status: false,
            });
        }
        // Nếu người dùng tồn tại, trả về thông tin người dùng
        return res.status(200).json({
            message: "Lấy thông tin người dùng thành công",
            status: true,
            user, // Trả về thông tin người dùng
        });
    }
    catch (error) {
        console.error(error); // In lỗi ra console để dễ dàng debug
        return res.status(500).json({
            message: "Có lỗi xảy ra khi lấy thông tin người dùng",
            status: false,
        });
    }
});
exports.getUser = getUser;
// CREATE USER
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const existingUserByEmail = yield users_1.User.findOne({ where: { email } });
        if (existingUserByEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại",
                status: false,
            });
        }
        // Kiểm tra xem username đã tồn tại hay chưa
        const existingUserByUsername = yield users_1.User.findOne({ where: { username } });
        if (existingUserByUsername) {
            return res.status(400).json({
                message: "Username đã tồn tại",
                status: false,
            });
        }
        // Tạo người dùng mới trong cơ sở dữ liệu
        const newUser = yield users_1.User.create({ username, email, password });
        res.status(201).json({
            message: "Người dùng mới đã được tạo",
            user: newUser,
            status: true,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi tạo người dùng" });
    }
});
exports.createUser = createUser;
// UPLOAD AVATAR
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.body.userId; // Lấy ID người dùng từ req.body
    const avatar = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Lấy đường dẫn của ảnh tải lên
    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = yield users_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tìm thấy" });
        }
        // Kiểm tra xem người dùng có ảnh cũ không
        if (user.avatar) {
            // Lấy đường dẫn đầy đủ của ảnh cũ
            const oldAvatarPath = path_1.default.resolve(__dirname, "../../uploads", path_1.default.basename(user.avatar));
            // Xóa ảnh cũ
            fs_1.default.unlink(oldAvatarPath, (err) => {
                if (err) {
                    console.error("Không thể xóa ảnh cũ:", err);
                }
            });
        }
        // Cập nhật thông tin ảnh trong cơ sở dữ liệu
        user.avatar = `${avatar}`.replace("uploads\\", ""); // Cập nhật trường avatar
        yield user.save(); // Lưu lại thông tin người dùng
        return res.status(200).json({
            status: true,
            message: "Cập nhật ảnh thành công",
            avatar,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, message: "Đã xảy ra lỗi khi cập nhật ảnh" });
    }
});
exports.uploadAvatar = uploadAvatar;
// UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, userId } = req.body;
    try {
        // Ensure userId is provided
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        // Find the user by ID
        const user = yield users_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update fields only if they are provided
        if (email)
            user.email = email;
        if (username)
            user.username = username;
        // Save the updated user to the database
        yield user.save();
        return res
            .status(200)
            .json({ status: true, message: "User updated successfully", user });
    }
    catch (error) {
        return res
            .status(500)
            .json({ status: false, message: "Failed to update user", error });
    }
});
exports.updateUser = updateUser;
// DELETE USER
const deleteUser = (req, res) => {
    const userId = req.params.id;
    res.send(`Người dùng có ID: ${userId} đã bị xóa`);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map