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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartJournalController = void 0;
const data_source_1 = require("../data-source");
const smartJournal_1 = require("../models/smartJournal");
const sucessResponse_1 = require("../utils/wrappers/sucessResponse");
const errorResponse_1 = require("../utils/wrappers/errorResponse");
const smartJournalModel_1 = require("../models/smartJournalModel");
const journalPrompt_1 = require("../models/journalPrompt");
const tsoa_1 = require("tsoa");
let SmartJournalController = class SmartJournalController extends tsoa_1.Controller {
    /**
     *
     * Creates and saves journal prompts to the database
     */
    async upsertPromptAsync(req) {
        try {
            const smartJournalRepository = data_source_1.dataSource.getRepository(journalPrompt_1.JournalPrompt);
            const { id, prompt } = req;
            const journalPrompt = new journalPrompt_1.JournalPrompt();
            const isNew = typeof id == "string" && id.trim().length === 0;
            if (isNew) {
                journalPrompt.prompt = prompt;
                await smartJournalRepository.save(journalPrompt);
                return new sucessResponse_1.SuccessResponse(journalPrompt.id, 201);
            }
            const promptJournal = await smartJournalRepository.findOneBy({ id: id });
            if (promptJournal == null)
                return new errorResponse_1.ErrorResponse(404, "Entity not found");
            promptJournal.prompt = prompt;
            await smartJournalRepository.save(promptJournal);
            return new sucessResponse_1.SuccessResponse(id, 200);
        }
        catch (error) {
            return new errorResponse_1.ErrorResponse(400, error.message);
        }
    }
    /**
     *
     * Retrieves a specific journal prompt with its appropriate id
     */
    async getPromptAsync(id) {
        try {
            const smartJournalRepository = data_source_1.dataSource.getRepository(journalPrompt_1.JournalPrompt);
            const jPrompt = await smartJournalRepository.findOneBy({
                id: id
            });
            if (jPrompt == null) {
                return new errorResponse_1.ErrorResponse(404, "Entity not found");
            }
            const journalPrompt = new smartJournalModel_1.JournalPromptDto(jPrompt);
            return new sucessResponse_1.SuccessResponse(journalPrompt, 200);
        }
        catch (e) {
            return new errorResponse_1.ErrorResponse(400, e.message);
        }
    }
    /**
     * Deletes a specific journal prompt with its appropriate id
     */
    async deletePromptAsync(id) {
        try {
            const smartJournalRepository = data_source_1.dataSource.getRepository(journalPrompt_1.JournalPrompt);
            const jPrompt = await smartJournalRepository.findOneBy({
                id: id
            });
            if (jPrompt == null)
                return new errorResponse_1.ErrorResponse(404, "Entity not found");
            await smartJournalRepository.remove(jPrompt);
            return null;
        }
        catch (e) {
            return new errorResponse_1.ErrorResponse(400, e.message);
        }
    }
    /**
     *
     * Creates and saves journal entries to the database
     */
    async upsertAsync(req) {
        try {
            const smartJournalRepository = data_source_1.dataSource.getRepository(smartJournal_1.JournalEntry);
            const journalPromptRepository = data_source_1.dataSource.getRepository(journalPrompt_1.JournalPrompt);
            const { userId, id, entry, promptId } = req;
            const journalEntry = new smartJournal_1.JournalEntry();
            const promptJournal = await journalPromptRepository.findOneBy({ id: promptId });
            const prompt = promptJournal.prompt;
            const isNew = typeof id == "string" && id.trim().length === 0;
            if (isNew) {
                journalEntry.userId = userId;
                journalEntry.entry = entry;
                journalEntry.prompt = prompt;
                await smartJournalRepository.save(journalEntry);
                return new sucessResponse_1.SuccessResponse(journalEntry.id, 201);
            }
            const entryJournal = await smartJournalRepository.findOneBy({ id: id });
            entryJournal.entry = entry;
            await smartJournalRepository.save(entryJournal);
            return new sucessResponse_1.SuccessResponse(id, 200);
        }
        catch (error) {
            return new errorResponse_1.ErrorResponse(400, error.message);
        }
    }
    /**
     *
     * Retrieves journal entries of a specific user
     */
    async getEntriesAsync(userId) {
        try {
            const smartJournalRepository = data_source_1.dataSource.getRepository(smartJournal_1.JournalEntry);
            const jEntries = await smartJournalRepository.findBy({
                userId: userId
            });
            const journalEntries = jEntries.map(x => new smartJournalModel_1.JournalEntryDto(x));
            return new sucessResponse_1.SuccessResponse(journalEntries, 200);
        }
        catch (error) {
            return new errorResponse_1.ErrorResponse(400, error.message);
        }
    }
    /**
     *
     * Retrieves a specific journal entry for a user
     */
    async getEntryAsync(userId, id) {
        try {
            const smartJournalRepository = data_source_1.dataSource.getRepository(smartJournal_1.JournalEntry);
            const jEntry = await smartJournalRepository.findOneBy({
                userId: userId,
                id: id
            });
            if (jEntry == null)
                return new errorResponse_1.ErrorResponse(404, "Entity not found");
            const journalEntry = new smartJournalModel_1.JournalEntryDto(jEntry);
            return new sucessResponse_1.SuccessResponse(journalEntry, 200);
        }
        catch (error) {
            return new errorResponse_1.ErrorResponse(400, error.message);
        }
    }
    /**
     *
     * Deletes a specific journal entry of a user
     */
    async deleteEntryAsync(userId, id) {
        try {
            const smartJournalRepository = data_source_1.dataSource.getRepository(smartJournal_1.JournalEntry);
            const journalEntry = await smartJournalRepository.findOneBy({
                userId: userId,
                id: id
            });
            if (journalEntry == null) {
                return new errorResponse_1.ErrorResponse(404, `Entity not found`);
            }
            await smartJournalRepository.remove(journalEntry);
            return null;
        }
        catch (error) {
            return new errorResponse_1.ErrorResponse(400, error.message);
        }
    }
};
exports.SmartJournalController = SmartJournalController;
__decorate([
    (0, tsoa_1.Post)("/savePrompt"),
    (0, tsoa_1.SuccessResponse)(201, "Journal prompt created"),
    (0, tsoa_1.Response)(200, "Journal prompt updated"),
    (0, tsoa_1.Response)(404, "Prompt not found"),
    (0, tsoa_1.Response)(400, "An error occurred"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [smartJournalModel_1.JournalPromptCommand]),
    __metadata("design:returntype", Promise)
], SmartJournalController.prototype, "upsertPromptAsync", null);
__decorate([
    (0, tsoa_1.Get)("/getPrompt/{id}"),
    (0, tsoa_1.SuccessResponse)(200, "Journal prompt retrieved"),
    (0, tsoa_1.Response)(404, "Prompt Not found"),
    (0, tsoa_1.Response)(400, "An error occurred"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartJournalController.prototype, "getPromptAsync", null);
__decorate([
    (0, tsoa_1.Delete)("/deletePrompt/{id}"),
    (0, tsoa_1.SuccessResponse)(204, "Journal prompt deleted"),
    (0, tsoa_1.Response)(404, "Entry Not found"),
    (0, tsoa_1.Response)(400, "An error occurred"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartJournalController.prototype, "deletePromptAsync", null);
__decorate([
    (0, tsoa_1.Post)("/saveEntry"),
    (0, tsoa_1.SuccessResponse)(201, "Journal entry created"),
    (0, tsoa_1.Response)(200, "Journal entry updated"),
    (0, tsoa_1.Response)(404, "Entry Not found"),
    (0, tsoa_1.Response)(400, "An error occurred"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [smartJournalModel_1.JournalEntryCommand]),
    __metadata("design:returntype", Promise)
], SmartJournalController.prototype, "upsertAsync", null);
__decorate([
    (0, tsoa_1.Get)("/getEntries/{userId}"),
    (0, tsoa_1.SuccessResponse)(200, "Journal entries retrieved"),
    (0, tsoa_1.Response)(400, "An error occurred"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartJournalController.prototype, "getEntriesAsync", null);
__decorate([
    (0, tsoa_1.Get)("/getEntries/{userId}/getEntry/{id}"),
    (0, tsoa_1.SuccessResponse)(200, "Journal entry retrieved"),
    (0, tsoa_1.Response)(404, "Entry Not found"),
    (0, tsoa_1.Response)(400, "An error occurred"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SmartJournalController.prototype, "getEntryAsync", null);
__decorate([
    (0, tsoa_1.Delete)("/delete/{userId}/deleteEntry/{id}"),
    (0, tsoa_1.Response)(204, "Journal entry deleted"),
    (0, tsoa_1.Response)(404, "Entry Not found"),
    (0, tsoa_1.Response)(400, "An error occurred"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SmartJournalController.prototype, "deleteEntryAsync", null);
exports.SmartJournalController = SmartJournalController = __decorate([
    (0, tsoa_1.Route)("/smartJournal"),
    (0, tsoa_1.Tags)('SmartJournalController')
], SmartJournalController);
//# sourceMappingURL=smartJournal.controller.js.map