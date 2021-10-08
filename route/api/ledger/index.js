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
  tryCatchWrapper(ctrl.addTransaction),
);

router.post(
  '/expense',
  tryCatchWrapper(authenticate),
  ledgerValidationMiddleware,
  tryCatchWrapper(ctrl.addTransaction),
);

router.delete(
  '/:id',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.removeTransaction),
);

router.get(
  '/income/:date',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.getTransactionsByMonth),
);

router.get(
  '/expense/:date',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.getTransactionsByMonth),
);

module.exports = router;
