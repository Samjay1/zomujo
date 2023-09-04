"use strict";
/*
* Therapist DB model
* */
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
exports.Therapist = void 0;
// TODO: therapist profile metadata
/*  specializations, qualifications, availability
*   suggested: separate models with relational links if discrete
*   to be provided by therapist
*/
const typeorm_1 = require("typeorm");
const appointment_1 = require("./appointment");
const profile_1 = require("./profile");
let Therapist = class Therapist {
};
exports.Therapist = Therapist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Therapist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Therapist.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Therapist.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Therapist.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Therapist.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Therapist.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Therapist.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_1.Appointment, appointment => appointment.therapist),
    __metadata("design:type", Array)
], Therapist.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_1.Profile, profile => profile.therapist),
    __metadata("design:type", profile_1.Profile)
], Therapist.prototype, "profile", void 0);
exports.Therapist = Therapist = __decorate([
    (0, typeorm_1.Entity)()
], Therapist);
//# sourceMappingURL=therapist.js.map