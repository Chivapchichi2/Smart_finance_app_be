const { Schema } = require('mongoose');


const reportSchema = new Schema({
  2021: {
    type: Map,
    of: String,
  },
  2020: {
    type: Map,
    of: String,
  },
  2019: {
    type: Map,
    of: String,
  },
});

module.exports = reportSchema;


// 2020: [
//     {
//       2021: {
//         type: Array,
//         default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       },
//       2020: {
//         type: Array,
//         default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       },
//       2019: {
//         type: Array,
//         default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       },
//     },
//   ],