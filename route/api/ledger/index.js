const express = require('express');
const router = express.Router();

const { ledgerJoiSchema } = require('../../../models/ledger');
const {
  validation,
  tryCatchWrapper,
  authenticate,
} = require('../../../middleware');
const ctrl = require('../../../controllers/ledger');

const ledgerValidationMiddleware = validation(ledgerJoiSchema);

router.post(
  '/income',
  tryCatchWrapper(authenticate),
  ledgerValidationMiddleware,
  tryCatchWrapper(ctrl.add),
);

router.post(
  '/expense',
  tryCatchWrapper(authenticate),
  ledgerValidationMiddleware,
  tryCatchWrapper(ctrl.add),
);

router.delete(
  '/income',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.remove),
);

router.delete(
  '/expense',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.remove),
);

router.get(
  '/income',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.getAll),
);

router.get(
  '/expense',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.getAll),
);

module.exports = router;
