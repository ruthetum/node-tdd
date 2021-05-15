// 테스트
const request = require('supertest');
const assert = require('should');
const app = require('../../index');

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

describe('GET /users/:id는', () => {
    describe('성공 시', () => {
        // 성공 Ⅰ. id가 1인 유저 객체를 반환
        it('id가 1인 유저 객체를 반환 ', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        })
    })

    describe('실패 시', () => {
        // 실패 Ⅰ. id가 숫자가 아닐 경우 400을 응답
        it('id가 숫자가 아닐 경우 400을 응답 ', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        })

        // 실패 Ⅱ. id로 유저를 찾을 수 없을 경우 404를 응답
        it('id로 유저를 찾을 수 없을 경우 404를 응답 ', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        })
    })
});

describe('DELETE /users/:id는', () => {
    describe('성공 시', () => {
        // 성공 Ⅰ. 204를 응답
        it('204를 응답 ', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })
    describe('실패 시', () => {
        // 실패 Ⅰ. id가 숫자가 아닐 경우 400을 응답
        it('id가 숫자가 아닐 경우 400을 응답 ', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
        // 실패 Ⅱ. id로 유저를 찾을 수 없을 경우 404를 응답
        it('id로 유저를 찾을 수 없을 경우 404를 응답 ', (done) => {
            request(app)
                .delete('/users/999')
                .expect(404)
                .end(done);
        })
    })
});

describe('POST /users', () => {
    describe('성공 시', () => {
        let name = 'dddd';
        let body;

        // 성공 Ⅰ. 201을 응답
        before(done => {
            request(app)
                .post('/users')
                .send({name: name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        })
        /*
            post 3개 테스트하면 데이터 중복해서 쌓이는 경우가 발생
            spring에서 @afterEach로 clear하는 경우가 있는데
            이번에는 before로 미리 값을 넣어주면서 상태 코드(201)를 확인하고
            반환받은 body와 함께 이후 테스트 진행
        */

        // 성공 Ⅱ. 생성된 유저 객체를 반환
        it('생성된 유저 객체를 반환 ', () => {
            body.should.have.property('id');
        })
        // 성공 Ⅲ. 입력한 name을 반환
        it('입력한 name을 반환 ', () => {
            body.should.have.property('name', name);
        })
    })
    describe('실패 시', () => {
        // 실패 Ⅰ. name 누락 시 400을 응답
        it('name 누락 시 400을 응답 ', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        })
        // 실패 Ⅱ. name 중복 시 409를 응답
        it('name 중복 시 409를 응답 ', (done) => {
            request(app)
                .post('/users')
                .send({name: 'dddd'})
                .expect(409)
                .end(done);
        })
    })
})

describe('PUT /users/:id', () => {
    describe('성공 시', () => {
        const name = 'cdcd';
        // 성공 Ⅰ. 변경된 정보를 반환
        it('변경된 정보를 반환 ', (done) => {
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        })
    })
    describe('실패 시', () => {
        // 실패 Ⅰ. 정수가 아닌 id일 경우 400을 응답
        it('정수가 아닌 id일 경우 400을 응답 ', (done) => {
            request(app)
                .put('/users/three')
                .expect(400)
                .end(done);
        })
        // 실패 Ⅱ. name이 없을 경우 400을 응답
        it('name이 없을 경우 400을 응답 ', (done) => {
            request(app)
                .put('/users/3')
                .send({})
                .expect(400)
                .end(done);
        })
        // 실패 Ⅲ. 없는 유저일 경우 404를 응답
        it('없는 유저일 경우 404를 응답 ', (done) => {
            request(app)
                .put('/users/999')
                .send({name: "caca"})
                .expect(404)
                .end(done);
        })
        // 실패 Ⅳ. 이름이 중복일 경우 409를 응답
        it('이름이 중복일 경우 409를 응답 ', (done) => {
            request(app)
                .put('/users/3')
                .send({name: 'bbbb'})
                .expect(409)
                .end(done);
        })
    })
})