import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from 'cors'
import {dataSource} from "./data-source";
import authRoutes from "./routes/auth.routes";
import therapistRoutes from './routes/therapist.routes'
import noteRoutes from './routes/note.routes'
import articleRoutes from "./routes/article/content.routes"
import appointmentRoutes from './routes/appointment.routes'
import articleCategoryRoute from './routes/article/categories.routes'
import articleCommentsRoute from './routes/article/comments.routes'
import articleFlagsRoute from './routes/article/flags.routes'
import articleLikesRoute from './routes/article/likes.routes'
import wellbeingRoutes from './routes/wellbeing.routes'
import smartJournalRoutes from './routes/smartJournal.routes'

import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./swaggerRouter/routes";

require('dotenv').config()

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source initialized.")
    }).catch((error) => {
    console.error("Error during Data Source initialization:\n", error)
})
const app = express()

if(process.env.NODE_ENV == 'production') {
    const corsOptions = {
        origin: 'https://zomujo-ex-tawny.vercel.app', // Replace with your production domain
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Enable sending cookies with cross-origin requests (if applicable)
    };

    app.use(cors(corsOptions));
} else {
    app.use(cors());
}

app.use(express.json(),bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'src/public')))

const swaggerDoc = require('./swaggerRouter/swagger.json');

app.use("/api-docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(swaggerDoc)
    );
});

// app.use('/api-docs', express.static('./swagger.json'));
app.get('/', (req: Request, res: Response) => {
    res.send('zomujo ex')
})

app.use('/auth', authRoutes)
app.use('/therapist', therapistRoutes)
app.use('/appointment/note', noteRoutes)

app.use('/appointment', appointmentRoutes)
app.use('/article', [
    articleRoutes, articleCategoryRoute, articleCommentsRoute,
    articleFlagsRoute, articleLikesRoute
])
app.use('/wellbeing', wellbeingRoutes)
app.use('/smartJournal', smartJournalRoutes)

RegisterRoutes(app);

const PORT = process.env.PORT
 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
 })
