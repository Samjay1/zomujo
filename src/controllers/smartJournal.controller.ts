import {dataSource} from '../data-source';
import {JournalEntry} from '../models/smartJournal';
import {SuccessResponse} from '../utils/wrappers/sucessResponse';
import {ErrorResponse} from '../utils/wrappers/errorResponse';
import {JournalEntryDto, JournalPromptDto, JournalEntryCommand, JournalPromptCommand} from "../models/smartJournalModel";
import {JournalPrompt} from "../models/journalPrompt";

import {Controller, Delete, Get, Post, Body, Route, Tags, Response, SuccessResponse as TsSuccessResponse} from "tsoa";

@Route("/smartJournal")
@Tags('SmartJournalController')
export class SmartJournalController extends Controller {

    /**
     *
     * Creates and saves journal prompts to the database
     */
    @Post("/savePrompt")
    @TsSuccessResponse(201, "Journal prompt created")
    @Response(200, "Journal prompt updated")
    @Response<ErrorResponse>(404, "Prompt not found")
    @Response<ErrorResponse>(400, "An error occurred")
    public async upsertPromptAsync(@Body() req: JournalPromptCommand ): Promise<SuccessResponse<string> | ErrorResponse> {
        try {
            const smartJournalRepository = dataSource.getRepository(JournalPrompt);
            const {id, prompt} = req;
            const journalPrompt = new JournalPrompt();
            const isNew: boolean = typeof id == "string" && id.trim().length === 0;
            if (isNew) {
                journalPrompt.prompt = prompt;
                await smartJournalRepository.save(journalPrompt);
                return new SuccessResponse<string>(journalPrompt.id, 201);
            }
            const promptJournal = await smartJournalRepository.findOneBy({id: id});
            if(promptJournal == null) return new ErrorResponse(404, "Entity not found");
            promptJournal!.prompt = prompt;
            await smartJournalRepository.save(promptJournal!);
            return new SuccessResponse<string>(id, 200);
        } catch (error: any) {
            return new ErrorResponse(400, error.message);
        }
    }

    /**
     *
     * Retrieves a specific journal prompt with its appropriate id
     */
    @Get("/getPrompt/{id}")
    @TsSuccessResponse(200, "Journal prompt retrieved")
    @Response<ErrorResponse>(404, "Prompt Not found")
    @Response<ErrorResponse>(400, "An error occurred")
    public async getPromptAsync(id:string): Promise<SuccessResponse<JournalPromptDto> | ErrorResponse> {
        try{
            const smartJournalRepository = dataSource.getRepository(JournalPrompt);
            const jPrompt = await smartJournalRepository.findOneBy({
                id: id
            });
            if(jPrompt == null) {
                return new ErrorResponse(404, "Entity not found");
            }
            const journalPrompt = new JournalPromptDto(jPrompt);
            return new SuccessResponse<JournalPromptDto>(journalPrompt, 200);

        } catch(e: any) {
            return new ErrorResponse(400, e.message);
        }
    }

    /**
     * Deletes a specific journal prompt with its appropriate id
     */
    @Delete("/deletePrompt/{id}")
    @TsSuccessResponse(204, "Journal prompt deleted")
    @Response<ErrorResponse>(404, "Entry Not found")
    @Response<ErrorResponse>(400, "An error occurred")
    public async deletePromptAsync(id:string): Promise<null | ErrorResponse> {
        try {
            const smartJournalRepository = dataSource.getRepository(JournalPrompt);
            const jPrompt = await smartJournalRepository.findOneBy({
                id: id
            });
            if(jPrompt == null) return new ErrorResponse(404, "Entity not found");

            await smartJournalRepository.remove(jPrompt);
            return null;
        } catch(e: any) {
            return new ErrorResponse(400, e.message);
        }
    }

    /**
     *
     * Creates and saves journal entries to the database
     */
    @Post("/saveEntry")
    @TsSuccessResponse(201, "Journal entry created")
    @Response(200, "Journal entry updated")
    @Response<ErrorResponse>(404, "Entry Not found")
    @Response<ErrorResponse>(400, "An error occurred")
    public async upsertAsync(@Body() req: JournalEntryCommand ): Promise<SuccessResponse<string> | ErrorResponse> {
        try {
            const smartJournalRepository = dataSource.getRepository(JournalEntry);
            const journalPromptRepository = dataSource.getRepository(JournalPrompt);
            const {userId, id, entry, promptId} = req;
            const journalEntry = new JournalEntry();
            const promptJournal = await journalPromptRepository.findOneBy({id: promptId});
            const prompt = promptJournal!.prompt;
            const isNew: boolean = typeof id == "string" && id.trim().length === 0;
            if (isNew) {
                journalEntry.userId = userId;
                journalEntry.entry = entry;
                journalEntry.prompt = prompt;
                await smartJournalRepository.save(journalEntry);
                return new SuccessResponse<string>(journalEntry.id, 201);
            }
            const entryJournal = await smartJournalRepository.findOneBy({id: id});
            entryJournal!.entry = entry;
            await smartJournalRepository.save(entryJournal!);
            return new SuccessResponse<string>(id, 200);


        } catch (error: any) {
            return new ErrorResponse(400, error.message);
        }
    }

    /**
     *
     * Retrieves journal entries of a specific user
     */
    @Get("/getEntries/{userId}")
    @TsSuccessResponse(200, "Journal entries retrieved")
    @Response<ErrorResponse>(400, "An error occurred")
    public async getEntriesAsync(userId:string): Promise<SuccessResponse<JournalEntryDto[]> | ErrorResponse> {
        try {
            const smartJournalRepository = dataSource.getRepository(JournalEntry);
            const jEntries = await smartJournalRepository.findBy({
                userId: userId
            });
            const journalEntries: JournalEntryDto[] = jEntries.map(x => new JournalEntryDto(x));
            return new SuccessResponse<JournalEntryDto[]>(journalEntries, 200);

        } catch (error: any) {
            return new ErrorResponse(400, error.message);
        }
    }

    /**
     *
     * Retrieves a specific journal entry for a user
     */
    @Get("/getEntries/{userId}/getEntry/{id}")
    @TsSuccessResponse(200, "Journal entry retrieved")
    @Response<ErrorResponse>(404, "Entry Not found")
    @Response<ErrorResponse>(400, "An error occurred")
    public async getEntryAsync(userId:string, id: string): Promise<SuccessResponse<JournalEntryDto> | ErrorResponse> {
        try {
            const smartJournalRepository = dataSource.getRepository(JournalEntry);
            const jEntry = await smartJournalRepository.findOneBy({
                userId: userId,
                id: id
            });

            if(jEntry == null) return new ErrorResponse(404, "Entity not found");

            const journalEntry: JournalEntryDto = new JournalEntryDto(jEntry);
            return new SuccessResponse<JournalEntryDto>(journalEntry, 200);

        } catch (error: any) {
            return new ErrorResponse(400, error.message);
        }
    }

    /**
     *
     * Deletes a specific journal entry of a user
     */
    @Delete("/delete/{userId}/deleteEntry/{id}")
    @Response(204, "Journal entry deleted")
    @Response<ErrorResponse>(404, "Entry Not found")
    @Response<ErrorResponse>(400, "An error occurred")
    public async deleteEntryAsync(userId:string, id:string): Promise<null | ErrorResponse> {
        try {
            const smartJournalRepository = dataSource.getRepository(JournalEntry);
            const journalEntry = await smartJournalRepository.findOneBy({
                userId: userId,
                id: id
            });
            if (journalEntry == null) {
                return new ErrorResponse(404, `Entity not found`)
            }
            await smartJournalRepository.remove(journalEntry);
            return null;
        } catch (error: any) {
            return new ErrorResponse(400, error.message);
        }
    }
}