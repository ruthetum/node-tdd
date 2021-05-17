// 라우팅 설정
const express = require('express');
const router = express.Router();
const ctrl = require('./user.crtl');

/**
 * @swagger
 *  /users:
 *    get:
 *      tags:
 *      - user
 *      description: 모든 유저 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: limit
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 *       400:
 *        description: 정상적이지 않은 파라미터
 */
router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;