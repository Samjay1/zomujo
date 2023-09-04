import { JournalEntry } from "./smartJournal";
import { JournalPrompt } from "./journalPrompt";
export declare class JournalEntryCommand {
    id: string;
    userId: string;
    promptId: string;
    entry: string;
}
export declare class JournalPromptCommand {
    id: string;
    prompt: string;
}
export declare class JournalEntryDto {
    constructor(journalEntry: JournalEntry | null);
    id: string;
    userId: string;
    prompt: string;
    entry: string;
}
export declare class JournalPromptDto {
    constructor(journalPrompt: JournalPrompt | null);
    id: string;
    prompt: string;
}
