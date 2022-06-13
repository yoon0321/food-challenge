const express = require('express');
const indexRouter = require('./routes');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    morgan('     :method :url :status :res[content-length] - :response-time ms')
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);
app.listen(port, () => console.log(
    '서버 작동중'
));
