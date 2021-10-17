const express = require('express');
const router = express.Router();

const {
  userJoiSchema,
  patchBalanceJoiSchema,
} = require('../../../models/user');
const {
  validation,
  tryCatchWrapper,
  authenticate,
} = require('../../../middleware');
const ctrl = require('../../../controllers/auth');

const userValidationMiddleware = validation(userJoiSchema);
const balanceValidationMiddleware = validation(patchBalanceJoiSchema);

router.post('/signup', userValidationMiddleware, tryCatchWrapper(ctrl.signup));

router.post('/signin', userValidationMiddleware, tryCatchWrapper(ctrl.signin));

router.get(
  '/current',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.current),
);

router.get(
  '/logout',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.logout),
);

router.patch(
  '/balance',
  balanceValidationMiddleware,
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.updateUserBalance),
);

router.post('/google', tryCatchWrapper(ctrl.googleAuth));

module.exports = router;
