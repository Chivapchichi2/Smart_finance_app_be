const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', require('./route/api/auth'));
app.use('/api/ledgers', require('./route/api/ledger'));

app.use((_, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
});

app.use((err, _, res, __) => {
  const status = err.status || 500;
  res
    .status(status)
    .json({ status: 'fail', code: status, message: err.message });
});

module.exports = app;
