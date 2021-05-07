const utils = require('./utils');
// assert
// const assert = require('assert');

// should
const assert = require('should');

describe('utils.js 모듈의 capitalize() 함수는', () => {
    it("문자열의 첫 번째를 대문자로 변환한다.",  () => {
        const result = utils.capitalize("hello");
        // assert
        //assert.strictEqual(result, "Hello");

        // should
        result.should.be.equal('Hello');
    })
})