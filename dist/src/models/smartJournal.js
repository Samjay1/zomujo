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
exports.JournalEntry = void 0;
const user_1 = require("./user");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../utils/BaseModel");
let JournalEntry = class JournalEntry extends BaseModel_1.BaseModel {
};
exports.JournalEntry = JournalEntry;
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], JournalEntry.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], JournalEntry.prototype, "entry", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], JournalEntry.prototype, "prompt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.journalEntries),
    __metadata("design:type", user_1.User)
], JournalEntry.prototype, "user", void 0);
exports.JournalEntry = JournalEntry = __decorate([
    (0, typeorm_1.Entity)()
], JournalEntry);
//# sourceMappingURL=smartJournal.js.map