import {Request, Response} from "express";
import {dataSource} from "../data-source";
import {Note} from "../models/note";
import {Appointment} from "../models/appointment";

export const createSessionNote = async (req: Request, res: Response) => {
    const {sessionId} = req.params // Extract the sessionId from URL parameter
    const {noteText} = req.body // Assuming the note text is sent in the request body

    try {
        // Find the appointment by sessionId
        const appointmentRepository = dataSource.getRepository(Appointment)
        const appointment = await appointmentRepository.findOne({
            where: {
                id: sessionId
            }
        })

        if (!appointment) {
            return res.status(404).json({message: "Appointment not found"})
        }

        // Create a new note
        const noteRepository = dataSource.getRepository(Note)
        const newNote = noteRepository.create({
            noteText: noteText as string,
            appointment: appointment
        })
        const savedNote = await noteRepository.save(newNote)

        return res.status(201).json(savedNote)

    } catch (error) {
        console.error("Error creating session note:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const getSessionNotes = async (req: Request, res: Response) => {
    const {sessionId} = req.params

    try {
        const appointmentRepository = dataSource.getRepository(Appointment)
        const appointment = await appointmentRepository
            .createQueryBuilder('appointment')
            .where({id: sessionId})
            .leftJoinAndSelect('appointment.notes', 'notes')
            .getMany()

        if (!appointment) {
            return res.status(404).json({message: "Appointment not found"})
        }

        return res.status(200).json(appointment)
    } catch (error) {
        console.error("Error getting session notes: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    const {noteId} = req.params

    try {
        const noteRepository = dataSource.getRepository(Note)
        const note = await noteRepository.findOne({
            where: {
                id: noteId
            }
        })

        if (!note) {
            return res.status(404).json({message: "Note not found"})
        }

        await noteRepository.remove(note)
        return res.status(204).send()
    } catch (error) {
        console.error("Error deleting note:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}