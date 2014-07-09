var GCM = function(){};

var config = require('./config/gcm.json'),
    https = require('https');

var registrations = [];

GCM.prototype.register = function(regid){
    if (registrations.indexOf(regid) >= 0) return;
    registrations.push(regid);
};

GCM.prototype.sendBroadcast = function(message){
    var req = https.request({
        host:'android.googleapis.com',
        path:'/gcm/send',
        method:'POST',
        headers:{
            "Authorization":"key=" + config.apiKey,
            "Content-Type":"application/json"
        }
    }, function(res){
        console.log('gcm response code: ' + res.statusCode);
        var data = '';
        res.on('data', function(chunk){ data += chunk; });
        res.on('end', function(){ console.info(data) });
    });

    req.on('error', function(err){
        console.error('gcm error: ' + err.stack);
    });

    req.write(JSON.stringify({
        registration_ids:registrations,
        data:message
    }));

    req.end();
};

module.exports = new GCM();
