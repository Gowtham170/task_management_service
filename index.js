import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import todoRoutes from './routes/todo.js';
import authRoutes from './routes/auth.js';
import checkAuth from './util/checkAuth.js';

/* middlewares configuration */
const app = express();
dotenv.config();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

/* routes */
app.get(('/hello'), (req, res) => res.send('hello'))
app.use('/', authRoutes);
app.use('/', checkAuth, todoRoutes);

/* error handler */
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).json({message});
})

/* server and db configuration  */
const PORT = process.env.PORT || 5000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,  
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on the http://localhost:${PORT}`));
}).catch((err) => console.log(`${err} did not connect`));

