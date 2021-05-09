# NODE REST API - TDD

## Library
### mocha
- 모카(mocha)는 테스트 코드를 돌려주는 테스트 러너 
- 테스트 수트: 테스트 환경으로 모카에서는 describe()으로 구현
- 테스트 케이스: 실제 테스트를 말하며 모카에서는 it()으로 구현
- https://mochajs.org/

### should
- 노드 assert 말고 third party 라이브러리 사용을 추천
- 슈드(should)는 검증(assertion) 라이브러리
- 가독성 높은 테스트 코드를 만들 수 있음
- https://github.com/tj/should.js/
- https://shouldjs.github.io/

### SuperTest
- 단위 테스트 : 함수의 기능 테스트
- 통합 테스트 : API의 기능 테스트
- SuperTest는 Express 통합 테스트용 라이브러리
- 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결괄를 전송
- https://github.com/visionmedia/supertest

#### Install
- --save-dev 옵션으로 devDependencies에 추가