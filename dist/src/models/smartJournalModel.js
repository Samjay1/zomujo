"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalPromptDto = exports.JournalEntryDto = exports.JournalPromptCommand = exports.JournalEntryCommand = void 0;
class JournalEntryCommand {
}
exports.JournalEntryCommand = JournalEntryCommand;
class JournalPromptCommand {
}
exports.JournalPromptCommand = JournalPromptCommand;
class JournalEntryDto {
    constructor(journalEntry) {
        this.id = journalEntry.id;
        this.userId = journalEntry.userId;
        this.prompt = journalEntry.prompt;
        this.entry = journalEntry.entry;
    }
}
exports.JournalEntryDto = JournalEntryDto;
class JournalPromptDto {
    constructor(journalPrompt) {
        this.id = journalPrompt.id;
        this.prompt = journalPrompt.prompt;
    }
}
exports.JournalPromptDto = JournalPromptDto;
//# sourceMappingURL=smartJournalModel.js.map