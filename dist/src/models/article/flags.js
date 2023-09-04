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
exports.Flags = void 0;
const typeorm_1 = require("typeorm");
const content_1 = require("./content");
const user_1 = require("../user");
let Flags = class Flags {
};
exports.Flags = Flags;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Flags.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.flags),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", user_1.User)
], Flags.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Flags.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Flags.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => content_1.Content, content => content.flags),
    __metadata("design:type", content_1.Content)
], Flags.prototype, "content", void 0);
exports.Flags = Flags = __decorate([
    (0, typeorm_1.Entity)()
], Flags);
//# sourceMappingURL=flags.js.map