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
        Account.find({'id' : new RegExp(search || '', 'i')}, (err, accounts) => {
            if (err) {
                reject(err);
                return console.error(err);
            }
            resolve(accounts);
        }).skip(skip).limit(limit);
    });
}


var acc = new Account({ id: '12223', total_services: 2, total_bill: 434 });

// acc.save((err, acc)=>{
//     if(err) return console.error(err);
//     console.log('Saved');
// });



module.exports = { 'db': db, 'getAccounts': getAccounts };