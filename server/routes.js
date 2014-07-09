var gcm = require('./gcm');

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    app.get('/rest/start', function(req, res){
        console.info('somebody pressed the SOS button! alert! alert!');
        gcm.sendBroadcast({sos:'started'});
        res.json({success:true});
    });

    app.get('/rest/register', function(req, res){
        var response = {success:true};
        if (req.query.platform == 'android') {
            gcm.register(req.query.regid);
        } else {
            console.error('could not process registration for unknown platform: ' + req.query.platform);
            response.success = false;
        }
        res.status(response.success ? 200 : 503).json(response);
    });
};
