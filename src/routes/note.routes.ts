import {Router} from "express"
import * as controller from '../controllers/note.controller'

const router = Router()

router.get('/:sessionId',
    controller.getSessionNotes)

router.post('/:sessionId',
    controller.createSessionNote)

router.delete('/:noteId',
    controller.deleteNote)

export default router