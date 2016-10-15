var {app, BrowserWindow} = require('electron');
var myMenu = require('./js/menu');
var windowInit = require('./js/init-window');

var startWindow;


/**
 * On main app ready. Just show the small window with recently
 * opened files are folders.
 */
app.on('ready', function () {

    myMenu.init();

    startWindow = new BrowserWindow({
        width: 650,
        height: 450
    }).on('closed', function(){
        startWindow = null;
    });

    startWindow.loadURL(`file://${__dirname}/start.html`);

});


/***
 * A folder or epub file is selected using Open menu.
 * create a new editor window.
 */
app.on('file-selected', function(file, isDir, e){

    // check if it's an epub, if it is check if it was opened previously
    // and load the extracted folder instead

    Promise.all([
        windowInit.openEditorWindowPromised(),
        windowInit.prepareFileOrFolderPromised(file, isDir)
    ]).then(function(result){

        var window = result[0];
        var fileInfo = result[1];

        // received in file-browser.js
        window.webContents.send('editor-data-ready', fileInfo.tree);

        if (startWindow != null) {
            startWindow.close();
        }

    });

});


app.on('window-all-closed', function () {
    //if (process.platform == 'darwin') {
    app.quit();
    //}
});
