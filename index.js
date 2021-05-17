const express = require('express');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const app = express();

const { swaggerUi, specs } = require('./config/swagger');

const user = require('./api/user');

if (process.env.NODE_ENV !== 'test') {
    // NODE_ENV가 test가 아닐 때만 서버 로그를 출력
    // 테스트 환경에선 서버 로그 출력 X
    app.use(morgan('dev'));
}
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
/*
    원래는 bodyParser를 쓰지만 Express> = 4.16.0 부터
    express.json(), express.urlencoded() 빌트인
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/users', user);

module.exports = app;