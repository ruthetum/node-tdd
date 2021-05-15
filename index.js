const express = require('express');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const app = express();
const user = require('./api/user');

app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
/*
    원래는 bodyParser를 쓰지만 Express> = 4.16.0 부터
    express.json(), express.urlencoded() 빌트인
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', user);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

module.exports = app;