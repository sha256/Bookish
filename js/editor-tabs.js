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
             console.log(file);
             if (file){
                 $editors.find('.cke').hide();
                 file.original.ckInstance.$el.show();
             }
        }
    });

    var nextInstance = createCKInstance();

    var $editors = $("#editors");

    $(document).on('show-tab', function(e, file){

        if (file.original.ckInstance){

            chromeTabs.setCurrentTab($tabsShell, file.original.tab)

        } else {

            file.original.ckInstance = nextInstance;
            nextInstance.$el  = $editors.find('.cke_editor_' + nextInstance.name);

            chromeTabs.addNewTab($tabsShell, {
                //favicon: 'demo/images/eager-favicon.ico',
                title: file.original.text
            });

            file.original.tab = $tabsShell.find('.chrome-tab-current');
            file.original.tab.prop('data-file', file);


            //// node.original -> dirTree.item
            fs.readFile(file.original.path, 'utf8', function (err, data) {
                if (err) throw err;
                //nextInstance.config.codemirror.mode = 'text/html';
                nextInstance.setMode("wysiwyg"); // HACK, doesn't move to source unless it's called
                nextInstance.setMode("source");
                nextInstance.setData(data);
                setTimeout(function(){
                    nextInstance.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                }, 1000);


            });

            setTimeout(function(){
                nextInstance = createCKInstance();
            }, 1100);

        }

        $editors.find('.cke').hide();
        file.original.ckInstance.$el.show();

    });

    function createCKInstance(){

        var instance =  CKEDITOR.appendTo('editors', {
            codemirror: {
                mode: 'text/javascript'
            }
        });

        return instance;
    }


})();