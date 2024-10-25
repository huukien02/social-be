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
exports.syncDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("socket", "root", "", {
    host: "localhost",
    dialect: "mysql",
});
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Đồng bộ hóa các mô hình với cơ sở dữ liệu
        yield exports.sequelize.sync({ force: true }); // Sử dụng { force: true } để xóa bảng hiện có và tạo lại
        console.log("Cơ sở dữ liệu đã được đồng bộ hóa thành công!");
    }
    catch (error) {
        console.error("Lỗi khi đồng bộ hóa cơ sở dữ liệu:", error);
    }
});
exports.syncDatabase = syncDatabase;
//# sourceMappingURL=index.js.map