$(function(){
    var $button = $('#start');
    $button.click(function(){
        $.ajax('/rest/start', {cache: false});
    });

    var playAudio = function(){
        var $gong = $('<audio src="/assets/mp3/gong.mp3">');
        $gong[0].play();
    };

    var connect = function(){
        console.info('connect()');
        try {
            var socket = new WebSocket("ws://" + top.location.host + "/socket");
            socket.onopen = function(){
                console.info('websocket open');
            };
            socket.onerror = function(err){
                console.info(err);
            };
            socket.onclose = function(){
                setTimeout(connect, 10000);
            };
            socket.onmessage = function(message){
                if (message.type != "message") return;
                var data = JSON.parse(message.data);
                if (data.sos && data.sos == "started") {
                    playAudio();
                    var $sosHint = $('#soshint');
                    $sosHint.fadeIn();
                    setTimeout(function(){
                        $sosHint.fadeOut();
                    }, 1000 * 60 * 15 );
                }
            };
        } catch (e) {
            setTimeout(connect, 10000);
        }
    };

    connect();
});
