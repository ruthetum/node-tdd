// 기본 모듈
const http = require('http');

http.createServer();

// 사용자 정의 모듈
const math = require('./math.js');

const result = math.sum(1, 2);