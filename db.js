//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Account = require('./app/models/account');

//Set up default mongoose connection
var mongoDB = 'mongodb://heroku_m2npzwhg:fatbq6ok9h404m6rsg2rgnri9j@ds143734.mlab.com:43734/heroku_m2npzwhg';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('DB connected')
});


function getAccounts(skip, limit, search) {
    return new Promise((resolve, reject) => {
        Account.find({ 'id': new RegExp(search, 'i') }, (err, accounts) => {
            if (err) {
                reject(err);
                return console.error(err);
            }
            resolve(accounts.map(el => { return { id: el.id, total_bill: el.total_bill, total_services: el.total_services }; }));
        }).skip(skip).limit(limit);
    });
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function generateRandomAccountId() {
    var numbers = new Array(11);
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = randomIntInc(1, 9)
    }
    return numbers.join('');
}

function setup() {
    Account.remove({});
    for (var i = 0; i < 100; i++) {
        var acc = new Account({ id: generateRandomAccountId(), total_services: randomIntInc(1, 5), total_bill: randomIntInc(0, 20000) + Math.random() });
        acc.save((err, acc) => {
            if (err) return console.error(err);
        });
    }
    console.log('Created accounts')
}






module.exports = { 'db': db, 'getAccounts': getAccounts, 'setup': setup };