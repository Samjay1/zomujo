"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const smartJournal_controller_1 = require("../controllers/smartJournal.controller");
const router = (0, express_1.Router)();
const controller = new smartJournal_controller_1.SmartJournalController();
router.post('/savePrompt', async (req, res) => {
    const response = await controller.upsertPromptAsync(req.body);
    res.status(response.statusCode).json(response);
});
router.get('/getPrompt/:id', async (req, res) => {
    const response = await controller.getPromptAsync(req.params.id);
    res.status(response.statusCode).json(response);
});
router.delete('/deletePrompt/:id', async (req, res) => {
    const response = await controller.deletePromptAsync(req.params.id);
    res.status(204).json(response);
});
router.post('/saveEntry', async (req, res) => {
    const response = await controller.upsertAsync(req.body);
    res.status(response.statusCode).json(response);
});
router.get('/getEntries/:userId', async (req, res) => {
    const response = await controller.getEntriesAsync(req.params.userId);
    res.status(response.statusCode).json(response);
});
router.get('/getEntries/:userId/getEntry/:id', async (req, res) => {
    const { userId, id } = req.params;
    const response = await controller.getEntryAsync(userId, id);
    res.status(response.statusCode).json(response);
});
router.delete('/delete/:userId/deleteEntry/:id', async (req, res) => {
    const { userId, id } = req.params;
    const response = await controller.deleteEntryAsync(userId, id);
    res.status(204).json(response);
});
exports.default = router;
//# sourceMappingURL=smartJournal.routes.js.map