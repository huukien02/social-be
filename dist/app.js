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
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routers/index"));
const login_1 = __importDefault(require("./routers/login"));
const users_1 = __importDefault(require("./routers/users"));
const blogs_1 = __importDefault(require("./routers/blogs"));
const comments_1 = __importDefault(require("./routers/comments"));
const reaction_1 = __importDefault(require("./routers/reaction"));
const cors_1 = __importDefault(require("cors")); // Import cors
require("./models/index"); // Import các mô hình
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const blogs_2 = require("./models/blogs");
const users_2 = require("./models/users");
const comments_2 = require("./models/comments");
const reaction_2 = require("./models/reaction");
// Khởi tạo ứng dụng Express và server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = 4000;
// Cấu hình CORS
app.use((0, cors_1.default)());
// Middleware để phân tích JSON
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/index", index_1.default);
app.use("/login", login_1.default);
app.use("/users", users_1.default);
app.use("/blogs", blogs_1.default);
app.use("/comments", comments_1.default);
app.use("/reaction", reaction_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000", // URL Frontend
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // Hàm lấy blogs
    const sendBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blogs = yield blogs_2.Blog.findAll({
                include: [
                    {
                        model: users_2.User,
                        as: "author", // Tên alias đã định nghĩa trong mối quan hệ
                        attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
                    },
                    {
                        model: comments_2.Comment,
                        as: "comments", // Alias đã định nghĩa trong mối quan hệ
                        attributes: ["id", "content", "createdAt"], // Chọn các trường cần thiết từ Comment
                        include: [
                            {
                                model: users_2.User,
                                as: "author", // Nếu cần thông tin tác giả của bình luận
                                attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
                            },
                        ],
                    },
                    {
                        model: reaction_2.Reaction,
                        as: "reactions", // Alias đã định nghĩa trong mối quan hệ với Reaction
                        attributes: ["id", "type", "createdAt"], // Chọn các trường cần thiết từ Reaction
                        include: [
                            {
                                model: users_2.User,
                                as: "author", // Nếu cần thông tin tác giả của phản ứng
                                attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
                            },
                        ],
                    },
                ],
            });
            // Gửi dữ liệu blogs đến frontend
            socket.emit("update_blogs", blogs);
        }
        catch (error) {
            console.error("Error fetching blogs:", error);
        }
    });
    // Gọi hàm sendBlogs liên tục
    const intervalId = setInterval(sendBlogs, 5000); // Gọi hàm mỗi 5 giây (hoặc khoảng thời gian bạn muốn)
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
        clearInterval(intervalId); // Dừng gọi hàm khi socket bị ngắt kết nối
    });
});
// Lắng nghe cổng
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    // await syncDatabase()
}));
//# sourceMappingURL=app.js.map