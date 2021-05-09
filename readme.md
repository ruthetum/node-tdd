# NODE REST API - TDD
- Node(Express) REST API
- TDD


# Test Driven Development (테스트 주도 개발, TDD)
### TDD란?
- TDD = TDF(Test First Development) + 리팩토링
- TDD랑 단위테스트는 다르다.
- 프로덕션 코드보다 테스트 코드를 먼저 작성. 이후 리팩토링.
- TDD는 테스트 기반으로 개발하지만 테스트 기술이 아님. TDD는 분석 기술이며, 설계 기술이다.

### TDD를 하는 이유
- 디버깅 시간을 감소
- 동작하는 문서 역할

### TDD 사이클
- Test fails > Test passes > Refactor > Test fails > ...
- 실패하는 테스트를 구현
- 테스트가 성공하도록 프로덕션 코드를 구현
- 프로덕션 코드와 테스트 코드를 리팩토링
    - 리팩토링 시에는 프로덕션 코드만 리팩토링하는 게 아니라 테스트 코드도 리팩토링


# Library
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
- 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 전송
- https://github.com/visionmedia/supertest

#### Install
- --save-dev 옵션으로 devDependencies에 추가


# API
## 사용자 목록 조회 API 테스트 (GET /users)
### 요구사항
- 성공
    - [x] Ⅰ. 유저 객체를 담은 배열로 응답 
    - [x] Ⅱ. 최대 limit 갯수만큼 응답

- 실패
    - [x] Ⅰ. limit이 숫자형이 아니면 400을 응답
    - [ ] Ⅱ. offset이 숫자형이 아니면 400을 응답

## 사용자 조회 API 테스트 (GET /users/:id)
### 요구사항
- 성공
    - [x] Ⅰ. id가 1인 유저 객체를 반환

- 실패
    - [x] Ⅰ. id가 숫자가 아닐 경우 400을 응답
    - [x] Ⅱ. id로 유저를 찾을 수 없을 경우 404를 응답

## 사용자 삭제 API 테스트 (DELETE /users/:id)
### 요구사항
- 성공
    - [x] Ⅰ. 204를 응답

- 실패
    - [x] Ⅰ. id가 숫자가 아닐 경우 400을 응답
    - [x] Ⅱ. id로 유저를 찾을 수 없을 경우 404를 응답

## 사용자 추가 API 테스트 (POST /users)
### 요구사항
- 성공
    - [X] Ⅰ. 201을 응답
    - [x] Ⅱ. 생성된 유저 객체를 반환
    - [x] Ⅲ. 입력한 name을 반환

- 실패
    - [x] Ⅰ. name 누락 시 400을 응답
    - [x] Ⅱ. name 중복 시 409를 응답

## 사용자 수정 API 테스트 (PUT /users/:id)
### 요구사항
- 성공
    - [X] Ⅰ. 변경된 정보를 반환

- 실패
    - [x] Ⅰ. 정수가 아닌 id일 경우 400을 응답
    - [x] Ⅱ. name이 없을 경우 400을 응답
    - [x] Ⅲ. 없는 유저일 경우 404를 응답
    - [x] Ⅳ. 이름이 중복일 경우 409를 응답