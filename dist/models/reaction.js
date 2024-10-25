"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const users_1 = require("./users");
const blogs_1 = require("./blogs");
class Reaction extends sequelize_1.Model {
}
exports.Reaction = Reaction;
// Khởi tạo model Reaction
Reaction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING, // Sử dụng STRING cho loại phản ứng
        allowNull: false,
    },
}, {
    sequelize: _1.sequelize,
    modelName: "Reaction",
    tableName: "reactions", // Tên bảng trong cơ sở dữ liệu
});
// Thiết lập quan hệ với User và Blog
Reaction.belongsTo(users_1.User, {
    foreignKey: "userId", // Khóa ngoại để liên kết với User
    as: "author", // Alias để gọi trong các truy vấn
});
Reaction.belongsTo(blogs_1.Blog, {
    foreignKey: "blogId", // Khóa ngoại để liên kết với Blog
    as: "blog", // Alias để gọi trong các truy vấn
});
users_1.User.hasMany(Reaction, {
    foreignKey: "userId", // Khóa ngoại trong Reaction
    as: "reactions", // Một người dùng có thể có nhiều phản ứng
});
blogs_1.Blog.hasMany(Reaction, {
    foreignKey: "blogId", // Khóa ngoại trong Reaction
    as: "reactions", // Một bài viết có thể có nhiều phản ứng
});
//# sourceMappingURL=reaction.js.map