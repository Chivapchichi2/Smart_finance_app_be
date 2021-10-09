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

router.post('/signin', userValidationMiddleware, tryCatchWrapper(ctrl.signin));

router.get(
  '/logout',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.logout),
);

router.patch(
  '/',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.updateUserBalance),
);

module.exports = router;
