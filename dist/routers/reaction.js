"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reactionController_1 = require("../controllers/reactionController");
const reactionRouter = (0, express_1.Router)();
// Định nghĩa các route cho người dùng
reactionRouter.post("/add", reactionController_1.addOrUpdateReaction);
exports.default = reactionRouter;
//# sourceMappingURL=reaction.js.map