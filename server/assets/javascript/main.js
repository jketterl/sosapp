require(['SosConnection'], function(SosConnection){

    $(function(){
        var $button = $('#start');
        $button.click(function(){
            $.ajax('/rest/start', {cache: false});
        });

        var playAudio = function(){
            var $gong = $('<audio src="/assets/mp3/gong.mp3">');
            $gong[0].play();
        };

        var timeout;

        var conn = new SosConnection();
        $(conn).on('sos.start', function(){
            playAudio();
            var $sosHint = $('#soshint');
            $sosHint.fadeIn();
            if (timeout) {
                clearTimeout(timeout);
                timeout = false;
            }
            timeout = setTimeout(function(){
                $sosHint.fadeOut();
            }, 1000 * 60 * 15 );
        });

    });

});
