"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const users_1 = require("./users");
class Blog extends sequelize_1.Model {
}
exports.Blog = Blog;
Blog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: _1.sequelize,
    modelName: "Blog",
    tableName: "blogs",
});
// Thiết lập quan hệ với User
Blog.belongsTo(users_1.User, {
    foreignKey: "userId", // Khóa ngoại để liên kết với User
    as: "author", // Alias để gọi trong các truy vấn
});
users_1.User.hasMany(Blog, {
    foreignKey: "userId",
    as: "blogs", // Một người dùng có thể có nhiều bài viết
});
//# sourceMappingURL=blogs.js.map