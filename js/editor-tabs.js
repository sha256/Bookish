(function(){

    var ext = {
       css: {
          cmMode: 'text/css',
          sourceOnly: true
       },
       js: {
          cmMode: 'text/javascript',
          sourceOnly: true
       },
       txt: {
          cmMode: 'text/javascript',
          sourceOnly: true
       },
       html: {
          cmMode: 'text/html',
          sourceOnly: false
       },
       xhtml: {
          cmMode: 'text/html',
          sourceOnly: true
       }
    };

    const {ipcRenderer} = require('electron');
    var $tabsShell = $('.chrome-tabs-shell');
    var fs = require('fs');

    chromeTabs.init({
        $shell: $tabsShell,
        minWidth: 45,
        maxWidth: 242.5
    });


    $tabsShell.bind('chromeTabRender', function () {
        var $currentTab = $tabsShell.find('.chrome-tab-current');
        if ($currentTab.length) {
             var file = $currentTab[0]['data-file'];
             if (file){
                 $editors.find('.cke').hide();
                 file.original.ckInstance.$el.show();
             }
        }
    });

    var $editors = $("#editors");

    $(document).on('show-tab', function(e, file){

        if (file.original.ckInstance){
            chromeTabs.setCurrentTab($tabsShell, file.original.tab);
            file.original.ckInstance.$el.show();

        } else {

            chromeTabs.addNewTab($tabsShell, {
                //favicon: 'demo/images/eager-favicon.ico',
                title: file.original.text
            });

            $editors.find('.cke').hide(); // hide all editors

            Promise.all([createCKPromised(), readFilePromisified(file.original.path)]).then(function(returned){
                var ckInstance = returned[0];
                ckInstance.$el  = $editors.find('.cke_editor_' + ckInstance.name).show();
                //ckInstance.setMode("wysiwyg"); // HACK, doesn't move to source unless it's called
                //ckInstance.setMode("source");
                ckInstance.setData(returned[1]);
                //nextInstance.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                file.original.ckInstance = ckInstance;
            });

            file.original.tab = $tabsShell.find('.chrome-tab-current');
            file.original.tab.prop('data-file', file);

        }

    });

    $(document).on('close-tab', function(e, $tab){
        var file = $tab['data-file'];
        file.original.ckInstance.destroy();
        file.original.ckInstance = null;
        file.original.tab = null;
        chromeTabs.closeTab($tabsShell, $($tab));

    });

    function readFilePromisified(filename) {
        return new Promise(
            function (resolve, reject) {
                fs.readFile(filename, {encoding: 'utf8'},
                    (error, data) => {
                        if (error) {
                            reject(error);
                        } else {
                            console.log('read data');
                            resolve(data);
                        }
                    });
            });
    }

    function createCKPromised() {
        return new Promise(
            function (resolve, reject) {

                var instance = CKEDITOR.appendTo('editors', {
                    startupMode: 'source',
                    codemirror: {
                        mode: 'text/javascript'
                    }
                });

                instance.on('instanceReady', function () {
                    console.log('created instance');
                    resolve(instance);
                });

            }
        );
    }

})();

