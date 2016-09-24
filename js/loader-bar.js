(function(){

    var loader = document.getElementById("loader");

    var bar = document.getElementById("loader-bar");

    var width = 5;

    function run(max, runner, done){
        bar.style.width = width + "%";
        width += 5;
        if (width >= max) {
            clearInterval(runner);
            if (done != undefined)
                done();
        }
    }

    module.exports = {
        init: function(){
            var runner = setInterval(function(){
                run(60, runner);
            }, 10);
        },

        finish: function(){
            width = 60;
            var runner = setInterval(function(){
               run(100, runner, function(){
                   loader.style.display = 'none';
               });
            }, 100);
        }
    }


})();