var {BrowserWindow} = require('electron');
var Zip = require('adm-zip');
var dirTree = require('./../vendor/dirtree.js');
var appDataFolder = require('electron').app.getPath('appData');


function openEditorWindowPromised(){

    return new Promise(function(resolve, reject){

        var win = new BrowserWindow({
            width: 1000,
            height: 700,
            'min-width': 500,
            'min-height': 200,
            'accept-first-mouse': true,
            'title-bar-style': 'hidden'
        });

        win.loadURL(`file://${__dirname}/../index.html`);

        win.webContents.on('did-finish-load', function () {
            resolve(win);
        });

        //win.webContents.openDevTools();

        win.on('closed', function () {
            win = null;
        });
    });
}

function prepareFileOrFolderPromised(file, isEpub){

    return new Promise(function(resolve, reject){

        var folder = file;

        if (isEpub){
            var zip = new Zip(file);
            folder = appDataFolder + "/newpub";
            console.log(folder);
            zip.extractAllTo(folder, true)

        } else {

        }

        resolve({
           dir: folder,
           tree: dirTree(folder)
        });

    });

}

module.exports = {openEditorWindowPromised, prepareFileOrFolderPromised};