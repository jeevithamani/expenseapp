var mongoose = require('mongoose');

var Expense = mongoose.model('Expense',{
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date, 
      default: Date.now
    },
    amount: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  });
  
  module.exports = Expense;