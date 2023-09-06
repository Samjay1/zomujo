"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeeting = exports.createMeetingEvent = void 0;
const path_1 = __importDefault(require("path"));
const googleapis_1 = require("googleapis");
const local_auth_1 = require("@google-cloud/local-auth");
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CREDENTIALS_PATH = path_1.default.join(__dirname, '..', '..', '..', 'credentials.json');
const createMeetingEvent = async (auth, eventData) => {
    const calendar = googleapis_1.google.calendar({ version: 'v3', auth });
    const eventStartTime = new Date(eventData.start);
    const eventEndTime = new Date(eventData.end);
    const event = {
        summary: eventData.summary,
        description: eventData.description,
        start: {
            dateTime: eventStartTime.toISOString(),
            timeZone: 'UTC',
        },
        end: {
            dateTime: eventEndTime.toISOString(),
            timeZone: 'UTC',
        },
        conferenceData: {
            createRequest: {
                requestId: Math.random().toString(),
            },
        },
        attendees: eventData.attendees || [],
        transparency: 'transparent',
    };
    try {
        const res = await calendar.events.insert({
            calendarId: 'primary',
            conferenceDataVersion: 1,
            sendNotifications: true,
            requestBody: {
                ...event
            }
        });
        if (res.data.conferenceData && res.data.conferenceData.entryPoints) {
            console.log('Google Meet link:', res.data.conferenceData.entryPoints[0].uri);
        }
    }
    catch (error) {
        console.error('Error creating meeting:', error.message);
    }
};
exports.createMeetingEvent = createMeetingEvent;
const createMeeting = async (req, res) => {
    const { summary, description, start, end, attendees } = req.body;
    try {
        const eventData = {
            summary,
            description,
            start,
            end,
            attendees: attendees.map((email) => ({ email })),
        };
        const client = await (0, local_auth_1.authenticate)({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        await (0, exports.createMeetingEvent)(client, eventData);
        return res.status(200).json({
            status: 200,
            message: 'Meeting created successfully.',
        });
    }
    catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            status: 500,
            error: 'An error occurred while creating the meeting.',
        });
    }
};
exports.createMeeting = createMeeting;
//# sourceMappingURL=meeting.controller.js.map