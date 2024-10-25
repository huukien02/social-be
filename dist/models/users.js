"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Kiểu dữ liệu là INTEGER
        autoIncrement: true, // Thiết lập tự động tăng
        primaryKey: true, // Đây là khóa chính
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Đảm bảo email là duy nhất
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Có thể để trống
    },
}, {
    sequelize: _1.sequelize,
    modelName: "User",
    tableName: "users", // Tên bảng trong cơ sở dữ liệu
});
//# sourceMappingURL=users.js.map