import path from "path";
import { Request, Response } from "express";
import { google, calendar_v3 } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CREDENTIALS_PATH = path.join(__dirname, '..', '..', '..', 'credentials.json');

export const createMeetingEvent = async (auth: any, eventData: any) => {
  const calendar: calendar_v3.Calendar = google.calendar({ version: 'v3', auth });

  const eventStartTime = new Date(eventData.start);
  const eventEndTime = new Date(eventData.end);

  const event: calendar_v3.Schema$Event = {
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
    })

    if (res.data.conferenceData && res.data.conferenceData.entryPoints) {
      console.log('Google Meet link:', res.data.conferenceData.entryPoints[0].uri);
    }
  } catch (error: any) {
    console.error('Error creating meeting:', error.message);
  }
}

export const createMeeting = async (req: Request, res: Response) => {
    const { summary, description, start, end, attendees } = req.body;
  
    try {
      const eventData = {
        summary,
        description,
        start,
        end,
        attendees: attendees.map((email: string) => ({ email })),
      };
  
      const client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
      });
      await createMeetingEvent(client, eventData);
  
      return res.status(200).json({
        status: 200,
        message: 'Meeting created successfully.',
      });
    } catch (error: any) {
      console.error('Error:', error.message);
      return res.status(500).json({
        status: 500,
        error: 'An error occurred while creating the meeting.',
      });
    }
}