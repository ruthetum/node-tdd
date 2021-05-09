const request = require('supertest');
const assert = require('should');
const app = require('./index');

describe('GET /users는', () => {
    describe('성공 시', () => {
        // 성공 Ⅰ. 유저 객체를 담은 배열로 응답
        it('유저 객체를 담은 배열로 응답 ', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    // array 검증
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        })

        // 성공 Ⅱ. 최대 limit 갯수만큼 응답
        it('최대 limit 갯수만큼 응답 ', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        })
    })

    describe('실패 시', () => {
        // 실패 Ⅰ. limit이 숫자형이 아니면 400을 응답
        it('limit이 숫자형이 아니면 400을 응답 ', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400) // 검증해야 할 상태 코드 확인 (SuperTest 지원)
                .end(done);
        })
    })
});