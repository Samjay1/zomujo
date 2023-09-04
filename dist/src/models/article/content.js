"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const typeorm_1 = require("typeorm");
const categories_1 = require("./categories");
const flags_1 = require("./flags");
const comments_1 = require("./comments");
const likes_1 = require("./likes");
const user_1 = require("../user");
let Content = class Content {
};
exports.Content = Content;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Content.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Content.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Content.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Content.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.content),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", user_1.User)
], Content.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => categories_1.Category, category => category.content),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Content.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => flags_1.Flags, flags => flags.content),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Content.prototype, "flags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_1.Comments, comments => comments.content),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Content.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_1.Likes, likes => likes.content),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Content.prototype, "likes", void 0);
exports.Content = Content = __decorate([
    (0, typeorm_1.Entity)()
], Content);
//# sourceMappingURL=content.js.map