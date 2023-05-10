import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connect } from './utils/db.js';
import usersRouter from './routers/usersRouter.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean'


//set variables
process.NODE_ENV === 'production' ? dotenv.config() : dotenv.config({ path: './config/config.env' });

dotenv.config();

console.log(process.env.NODE_ENV);
//create app
const app = express();
//connect to DB
connect()
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', "DELETE"]
}));


//set security http headers
app.use(helmet())

app.use(cookieParser())


//limit request from same ip
const limiter = rateLimit({
    max: 100,
    WindowMS: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/', limiter);

//apply core middlewares

//body parser
app.use(express.json());

//Data Sanitization against NOSQL query injection  

app.use(ExpressMongoSanitize());

//Data Sanitization against XSS

app.use(xss());



app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//apply routers
app.use('/users', usersRouter);

const port = process.env.PORT;
app.listen(port, console.log(`✅ Server is running at http://localhost:${port}/`));