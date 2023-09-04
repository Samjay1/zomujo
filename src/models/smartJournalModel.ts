import { JournalEntry } from "./smartJournal";
import { JournalPrompt } from "./journalPrompt";


export class JournalEntryCommand {
    id!: string;
    userId!: string;
    promptId!: string;
    entry!: string;
}

export class JournalPromptCommand {
    id!: string;
    prompt!: string;
}
export class JournalEntryDto {
    constructor(journalEntry: JournalEntry | null) {
        this.id = journalEntry!.id;
        this.userId = journalEntry!.userId;
        this.prompt = journalEntry!.prompt
        this.entry = journalEntry!.entry;

    }
    id!: string;
    userId: string;
    prompt: string;
    entry: string;
}
export class JournalPromptDto {
    constructor(journalPrompt: JournalPrompt | null) {
        this.id = journalPrompt!.id;
        this.prompt = journalPrompt!.prompt;
    }

    id: string;
    prompt: string;
}