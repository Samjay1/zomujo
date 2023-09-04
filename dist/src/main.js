"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const therapist_routes_1 = __importDefault(require("./routes/therapist.routes"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const content_routes_1 = __importDefault(require("./routes/article/content.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const categories_routes_1 = __importDefault(require("./routes/article/categories.routes"));
const comments_routes_1 = __importDefault(require("./routes/article/comments.routes"));
const flags_routes_1 = __importDefault(require("./routes/article/flags.routes"));
const likes_routes_1 = __importDefault(require("./routes/article/likes.routes"));
const wellbeing_routes_1 = __importDefault(require("./routes/wellbeing.routes"));
const smartJournal_routes_1 = __importDefault(require("./routes/smartJournal.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("./swaggerRouter/routes");
require('dotenv').config();
data_source_1.dataSource
    .initialize()
    .then(() => {
    console.log("Data Source initialized.");
}).catch((error) => {
    console.error("Error during Data Source initialization:\n", error);
});
const app = (0, express_1.default)();
if (process.env.NODE_ENV == 'production') {
    const corsOptions = {
        origin: 'https://zomujo-ex-tawny.vercel.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Enable sending cookies with cross-origin requests (if applicable)
    };
    app.use((0, cors_1.default)(corsOptions));
}
else {
    app.use((0, cors_1.default)());
}
app.use(express_1.default.json(), body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'src/public')));
const swaggerDoc = require('./swaggerRouter/swagger.json');
app.use("/api-docs", swagger_ui_express_1.default.serve, async (_req, res) => {
    return res.send(swagger_ui_express_1.default.generateHTML(swaggerDoc));
});
// app.use('/api-docs', express.static('./swagger.json'));
app.get('/', (req, res) => {
    res.send('zomujo ex');
});
app.use('/auth', auth_routes_1.default);
app.use('/therapist', therapist_routes_1.default);
app.use('/appointment/note', note_routes_1.default);
app.use('/appointment', appointment_routes_1.default);
app.use('/article', [
    content_routes_1.default, categories_routes_1.default, comments_routes_1.default,
    flags_routes_1.default, likes_routes_1.default
]);
app.use('/wellbeing', wellbeing_routes_1.default);
app.use('/smartJournal', smartJournal_routes_1.default);
(0, routes_1.RegisterRoutes)(app);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=main.js.map