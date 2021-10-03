const express = require('express');
const router = express.Router();

const { userJoiSchema } = require('../../../models/user');
const {
  validation,
  tryCatchWrapper,
  authenticate,
} = require('../../../middleware');
const ctrl = require('../../../controllers/auth');

const userValidationMiddleware = validation(userJoiSchema);

router.post('/signup', userValidationMiddleware, tryCatchWrapper(ctrl.signup));

router.post('/signin', ctrl.signin);

router.get('/logout', ctrl.logout);

module.exports = router;
