module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    app.get('/rest/start', function(req, res){
        console.info('somebody pressed the SOS button! alert! alert!');
        res.json({success:true});
    });
};
