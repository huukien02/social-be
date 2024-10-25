"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const users_1 = require("./users");
const blogs_1 = require("./blogs");
class Comment extends sequelize_1.Model {
}
exports.Comment = Comment;
// Khởi tạo model Comment
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: _1.sequelize,
    modelName: "Comment",
    tableName: "comments", // Tên bảng trong cơ sở dữ liệu
});
// Thiết lập quan hệ với User và Blog
Comment.belongsTo(users_1.User, {
    foreignKey: "userId", // Khóa ngoại để liên kết với User
    as: "author", // Alias để gọi trong các truy vấn
});
Comment.belongsTo(blogs_1.Blog, {
    foreignKey: "blogId", // Khóa ngoại để liên kết với Blog
    as: "blog", // Alias để gọi trong các truy vấn
});
users_1.User.hasMany(Comment, {
    foreignKey: "userId",
    as: "comments", // Một người dùng có thể có nhiều bình luận
});
blogs_1.Blog.hasMany(Comment, {
    foreignKey: "blogId",
    as: "comments", // Một bài viết có thể có nhiều bình luận
});
//# sourceMappingURL=comments.js.map