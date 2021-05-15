// 라우팅 설정
const express = require('express');
const router = express.Router();
const ctrl = require('./user.crtl');

router.get('/', ctrl.selectAllUsers);
router.get('/:id', ctrl.selectUser);
router.delete('/:id', ctrl.deleteUser);
router.post('', ctrl.createUser);
router.put('/:id', ctrl.updateUser);

module.exports = router;