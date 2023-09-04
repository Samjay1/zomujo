"use strict";
/*
* Model for an appointment/session between a Therapist and User
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
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const therapist_1 = require("./therapist");
const user_1 = require("./user");
const payment_1 = require("./payment");
const note_1 = require("./note");
let Appointment = class Appointment {
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Appointment.prototype, "scheduledTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Appointment.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "additionalInformation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => therapist_1.Therapist, therapist => therapist.appointments),
    __metadata("design:type", therapist_1.Therapist)
], Appointment.prototype, "therapist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.appointments),
    __metadata("design:type", user_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_1.Payment, payment => payment.appointment),
    __metadata("design:type", Array)
], Appointment.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => note_1.Note, note => note.appointment),
    __metadata("design:type", Array)
], Appointment.prototype, "notes", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)()
], Appointment);
//# sourceMappingURL=appointment.js.map