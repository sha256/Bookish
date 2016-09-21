var {app, BrowserWindow} = require('electron');
var myMenu = require('./js/menu.js');

var win = null;

app.on('window-all-closed', function() {
  //if (process.platform == 'darwin') {
    app.quit();
  //}
});


app.on('ready', function() {

  win = new BrowserWindow({
    width: 800,
    height: 600,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  myMenu();

  win.loadURL(`file://${__dirname}/index.html`);

  //win.webContents.openDevTools();

  win.on('closed', function() {

    win = null;
  });

});
