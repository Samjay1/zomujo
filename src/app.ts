// import express, {Request, Response} from "express";
// import bodyParser from "body-parser";
// import path from "path";
// import cors from 'cors'
// import authRoutes from "./routes/auth.routes";
// import articleRoutes from "./routes/article/content.routes"
// import appointmentRoutes from './routes/appointment.routes'
// import articleCategoryRoute from './routes/article/categories.routes'
// import articleCommentsRoute from './routes/article/comments.routes'
// import articleFlagsRoute from './routes/article/flags.routes'
// import articleLikesRoute from './routes/article/likes.routes'
// import wellbeingRoutes from './routes/wellbeing.routes'

// require('dotenv').config()

// const app = express()
// app.use(cors())
// app.use(express.json(),bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.resolve(__dirname, 'src/public')))

// app.get('/', (req: Request, res: Response) => {
//     res.send('zomujo ex')
// })

// app.use('/auth', authRoutes)
// app.use('/appointment', appointmentRoutes)
// app.use('/article', [
//     articleRoutes, articleCategoryRoute, articleCommentsRoute,
//     articleFlagsRoute, articleLikesRoute
// ])
// app.use('/wellbeing', wellbeingRoutes)
// export default app