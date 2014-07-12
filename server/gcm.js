var GCM = function(){};

var config = require('./config/gcm.json'),
    https = require('https'),
    db = require('./db');

GCM.prototype.register = function(regid){
    db(function(err, conn){
        if (err) return console.error(err);
        conn.query('select id from registration where platform="android" and registration=?', [regid], function(err, rows){
            if (err) return console.error(err);
            if (rows.length > 0) return;
            conn.query('insert into registration (platform, registration) values (?, ?)', ['android', regid], function(err){
                if (err) return console.error(err);
            });
        });
    });
};

GCM.prototype.sendBroadcast = function(message){
    db(function(err, conn){
        if (err) return console.error(err);

        conn.query('select registration from registration where platform = ?', ['android'], function(err, rows){
            if (err) return console.error(err);
            var registrations = [];
            rows.forEach(function(row){ registrations.push(row.registration) });

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
                data:JSON.parse(message)
            }));

            req.end();
        });
    });
};

module.exports = new GCM();
