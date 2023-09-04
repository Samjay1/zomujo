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
exports.TestResult = exports.testType = void 0;
/*
* Model for an testResult(holds history of tests taken)
* */
const user_1 = require("./user");
const typeorm_1 = require("typeorm");
var testType;
(function (testType) {
    testType["SLS"] = "SLS";
    testType["GAD"] = "GAD";
    testType["CES"] = "CES";
    testType["BADS"] = "BADS";
    testType["EPDS"] = "EPDS";
})(testType || (exports.testType = testType = {}));
let TestResult = class TestResult {
};
exports.TestResult = TestResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], TestResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], TestResult.prototype, "testType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar" }),
    __metadata("design:type", Object)
], TestResult.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar" }),
    __metadata("design:type", Array)
], TestResult.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.results),
    __metadata("design:type", user_1.User)
], TestResult.prototype, "user", void 0);
exports.TestResult = TestResult = __decorate([
    (0, typeorm_1.Entity)()
], TestResult);
//# sourceMappingURL=testResults.js.map