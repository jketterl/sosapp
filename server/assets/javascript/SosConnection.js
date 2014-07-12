define(function(){
    SosConnection = function(){
        var me = this;
        var connect = function(){
            try {
                var socket = new WebSocket("ws://sosapp.justjakob.de/socket");
                socket.onopen = function(){
                };
                socket.onerror = function(err){
                    console.error(err);
                };
                socket.onclose = function(){
                    setTimeout(connect, 10000);
                };
                socket.onmessage = function(message){
                    if (message.type != "message") return;
                    var data = JSON.parse(message.data);
                    if (data.sos && data.sos == "started") {
                        $(me).trigger('sos.start');
                    }
                };
            } catch (e) {
                setTimeout(connect, 10000);
            }
        };

        connect();
    };

    return SosConnection;
});
