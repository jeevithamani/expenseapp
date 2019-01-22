process.env.NODE_ENV = 'test'

var request = require('supertest');
var app = require('./../server/app');
var assert = require('assert');
var Expense = require('./../server/models/expensetracker');
var expect = require('expect');
var {mongoose} = require('./../server/db/mongoose');
var newexpense;

before(function(done) {
    mongoose.connection.collections.expenses.drop(function() {
        done();
    });
});
after(function() {
    mongoose.connection.close();
    process.exit(0);
});

describe('Get expenses', function() {
    it("get expenses test", function(done) {
        request(app)
            .get('/getexpenses')
            .expect('Content-Type', /html/)
            .expect(200, done)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Expense.findOne({ description: "TestExpense" }).then((result) => {
                    assert(result === null);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('Add expenses', function() {
    it('add expenses test', function(done) {
        newexpense = new Expense({
            description: "TestExpense",
            amount: "100",
            date: new Date("2014/11/20 04:11"),
            type: "foods",
        });
        request(app)
            .post('/addexpense')
            .send(newexpense)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Expense.findOne({ description: "TestExpense"}).then((result) => {
                    expect(result.description).toBe(newexpense.description);
                    done();
                }).catch((e) => done(e));
            });
    });
});
describe ('Delete Expense', function() {
    it('deletes an expense', function(done) {
        newexpense = new Expense({
            description: "TestExpense3",
            amount: "100",
            date: new Date("2014/11/20 04:11"),
            type: "travel",
        });
        newexpense.save().then(function() {
            done(); 
        });
        request(app)
            .delete('/deleteexpense/' + newexpense._id.toString())
            .expect(200, done)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Expense.findOne({ description: "TestExpense"}).then((result) => {
                    assert(result === null);
                    done();
                }).catch((e) => done(e));
            });
    });
});
