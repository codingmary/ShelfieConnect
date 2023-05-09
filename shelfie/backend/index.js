import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connect } from './utils/db.js';
import usersRouter from './routers/usersRouter.js';



//set variables
process.NODE_ENV === 'production' ? dotenv.config() : dotenv.config({ path: './config/config.env' });

dotenv.config();

console.log(process.env.NODE_ENV);
//create app
const app = express();
//connect to DB
connect()


//apply core middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//apply routers
app.use('/users', usersRouter);

const port = process.env.PORT;
app.listen(port, console.log(`✅ Server is running at http://localhost:${port}/`));