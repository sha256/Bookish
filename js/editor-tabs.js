(function(){

    const {ipcRenderer} = require('electron');
    var $tabsShell = $('.chrome-tabs-shell');
    var fs = require('fs');
    var extensions = require('./file-extensions');
    var $ckToolbar = $('#ckToolbar');

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
                 $('.cke').hide();
                 file.original.ckInstance.$el.show();
             }
        }
        if ($ckToolbar.find('.cke').length < 2){
            $ckToolbar.find('.cke_editor_editor1').show();
        }
    });

    var $editors = $("#editors");

    $(document).on('show-tab', function(e, file){

        // already in the tabs, just show it
        if (file.original.ckInstance){

            chromeTabs.setCurrentTab($tabsShell, file.original.tab);
            file.original.ckInstance.$el.show();

        } else {

            chromeTabs.addNewTab($tabsShell, {
                //favicon: 'demo/images/eager-favicon.ico',
                title: file.original.text
            });

            Promise.all([createCKPromised(file), readFilePromisified(file.original.path)]).then(function(returned){
                var ckInstance = returned[0];
                $('.cke').hide();
                ckInstance.$el  = $('.cke_editor_' + ckInstance.name).show();
                ckInstance.setData(returned[1]);

                if(extensions[file.original.extension].sourceOnly){
                    ckInstance.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED)
                }

                file.original.ckInstance = ckInstance;
                ckInstance.resetDirty();
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

    function createCKPromised(file) {
        return new Promise(
            function (resolve, reject) {

                var instance = CKEDITOR.appendTo('editors', {
                    startupMode: extensions[file.original.extension].startupMode,
                    codemirror: {
                        mode: extensions[file.original.extension].cmMode
                    }
                });

                instance.on('instanceReady', function (e) {
                    console.log('created instance');
                    resolve(instance);
                });

            }
        );
    }

})();

