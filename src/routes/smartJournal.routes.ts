import {Router, Request , Response} from "express";
import {SmartJournalController} from "../controllers/smartJournal.controller";

const router: Router = Router()
const controller: SmartJournalController = new SmartJournalController();

router.post('/savePrompt',async (req:Request, res: Response) =>
{
    const response = await controller.upsertPromptAsync(req.body);
    res.status(response.statusCode).json(response);
});
router.get('/getPrompt/:id',async (req:Request, res: Response) =>
{
    const response = await controller.getPromptAsync(req.params.id);
    res.status(response.statusCode).json(response);
});
router.delete('/deletePrompt/:id', async (req:Request, res: Response) =>
{
    const response = await controller.deletePromptAsync(req.params.id);
    res.status(204).json(response);
});
router.post('/saveEntry',async (req:Request, res: Response) =>
{
    const response = await controller.upsertAsync(req.body);
    res.status(response.statusCode).json(response);
});
router.get('/getEntries/:userId', async (req:Request, res: Response) =>
{
    const response = await controller.getEntriesAsync(req.params.userId);
    res.status(response.statusCode).json(response);
});
router.get('/getEntries/:userId/getEntry/:id', async (req:Request, res: Response) =>
{
    const {userId, id} = req.params;
    const response = await controller.getEntryAsync(userId, id);
    res.status(response.statusCode).json(response);
});
router.delete('/delete/:userId/deleteEntry/:id', async (req:Request, res: Response) =>
{
    const {userId, id} = req.params;
    const response = await controller.deleteEntryAsync(userId, id);
    res.status(204).json(response);
});

export default router;
