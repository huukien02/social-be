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
exports.loginUser = void 0;
const users_1 = require("../models/users");
// GET USER
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const user = yield users_1.User.findOne({ where: { username, password } });
        if (!user) {
            return res.status(400).json({
                message: "Đăng nhập thất bại",
                status: false,
            });
        }
        return res.status(200).json({
            message: "Đăng nhập thành công",
            status: true,
            user: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đăng nhập thất bại" });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=loginController.js.map