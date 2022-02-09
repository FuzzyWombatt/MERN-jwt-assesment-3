const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const bugsRouter = require('./routes/bugsRouter');

const app = express();

connectDB();

app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api/users',usersRouter);
app.use('/api/auth',authRouter);
app.use('/api/bugs',bugsRouter);


app.listen(PORT, () => console.log(`server started on port${PORT}`));

module.exports = app;