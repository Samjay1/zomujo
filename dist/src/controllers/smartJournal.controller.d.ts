import { SuccessResponse } from '../utils/wrappers/sucessResponse';
import { ErrorResponse } from '../utils/wrappers/errorResponse';
import { JournalEntryDto, JournalPromptDto, JournalEntryCommand, JournalPromptCommand } from "../models/smartJournalModel";
import { Controller } from "tsoa";
export declare class SmartJournalController extends Controller {
    /**
     *
     * Creates and saves journal prompts to the database
     */
    upsertPromptAsync(req: JournalPromptCommand): Promise<SuccessResponse<string> | ErrorResponse>;
    /**
     *
     * Retrieves a specific journal prompt with its appropriate id
     */
    getPromptAsync(id: string): Promise<SuccessResponse<JournalPromptDto> | ErrorResponse>;
    /**
     * Deletes a specific journal prompt with its appropriate id
     */
    deletePromptAsync(id: string): Promise<null | ErrorResponse>;
    /**
     *
     * Creates and saves journal entries to the database
     */
    upsertAsync(req: JournalEntryCommand): Promise<SuccessResponse<string> | ErrorResponse>;
    /**
     *
     * Retrieves journal entries of a specific user
     */
    getEntriesAsync(userId: string): Promise<SuccessResponse<JournalEntryDto[]> | ErrorResponse>;
    /**
     *
     * Retrieves a specific journal entry for a user
     */
    getEntryAsync(userId: string, id: string): Promise<SuccessResponse<JournalEntryDto> | ErrorResponse>;
    /**
     *
     * Deletes a specific journal entry of a user
     */
    deleteEntryAsync(userId: string, id: string): Promise<null | ErrorResponse>;
}
