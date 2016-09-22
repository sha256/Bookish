var {app, BrowserWindow} = require('electron');
var myMenu = require('./js/menu.js');

var win = null;

app.on('window-all-closed', function () {
    //if (process.platform == 'darwin') {
    app.quit();
    //}
});


app.on('ready', function () {

    win = new BrowserWindow({
        width: 1000,
        height: 700,
        'min-width': 500,
        'min-height': 200,
        'accept-first-mouse': true,
        'title-bar-style': 'hidden'
    });

    myMenu.init();
    myMenu.setWindow(win);

    win.loadURL(`file://${__dirname}/index.html`);

    //win.webContents.openDevTools();

    win.on('closed', function () {

        win = null;
    });

});
