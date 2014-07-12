var Broadcaster = function(){
    // dummy connection for gcm push (android)
    this.register({
        send:function(message){
            gcm.sendBroadcast(message);
        },
        on:function(){}
    });
};

var gcm = require('./gcm');

Broadcaster.prototype.send = function(message){
    connections.forEach(function(conn){
        conn.send(JSON.stringify(message));
    });
};

var connections = [];

Broadcaster.prototype.register = function(connection){
    var me = this;
    connections.push(connection);
    connection.on('close', function(){
        me.unregister(connection);
    });
};

Broadcaster.prototype.unregister = function(connection){
    var index = connections.indexOf(connection);
    if (index < 0) return;
    connections.splice(index, 1);
};

module.exports = new Broadcaster();
