var gcm = require('node-gcm');
var push_access_key = 'AIzaSyB27hjyV67uxw7rzlrrm2h5nYxGznIA91Y';
var client_reg_ids = ['APA91bFOGYRqObMigcDxVP96EUxuRTGblOiBlHNYQlNdR9fiLJf0sN6wd7zW-6N30ZI4FJTVQz_A1UQObuuW6Xzt4cWTWHOhg1JOSt_P7LRvzyggziS--HRm8_FhaNtTXSZcrWjhKMmQTd7rtF4W1lLO1F3gL5Y8Zw'];
// create a message with default values
var message = new gcm.Message();

// or with object values
var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        title: '헬로',
        msg: 'message2'
    }
});

var sender = new gcm.Sender(push_access_key);
var registrationIds = [];

// OPTIONAL
// add new key-value in data object
// message.addDataWithKeyValue('key1','message1');
// message.addDataWithKeyValue('key2','message2');

// // or add a data object
// message.addDataWithObject({
//     key1: 'message1',
//     key2: 'message2'
// });

// // or with backwards compability of previous versions
// message.addData('key1','message1');
// message.addData('key2','message2');


// message.collapseKey = 'demo';
// message.delayWhileIdle = true;
// message.timeToLive = 3;
// message.dryRun = true;
// END OPTIONAL

// At least one required
registrationIds = client_reg_ids;

/**
 * Params: message-literal, registrationIds-array, No. of retries, callback-function
 **/
// sender.send(message, registrationIds, 4, function (err, result) {
//     console.log(result);
//     console.log(err);
// });
sender.sendNoRetry(message, registrationIds, function (err, result) {
    console.log(result);
    console.log(err);
});
