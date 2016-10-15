var {BrowserWindow} = require('electron');
var Zip = require('adm-zip');
var dirTree = require('./../vendor/dirtree.js');
var appDataFolder = require('electron').app.getPath('appData') + '/Bookish';
var path = require('path');
var Datastore = require('nedb');
var sha1 = require('sha1');
var db = new Datastore({ filename: appDataFolder + '/bookish.db', autoload: true });


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

function prepareFileOrFolderPromised(file, isDir){

    return new Promise(function(resolve, reject){

        var hash = sha1(file);
        var folder = file;

        db.findOne({hash: hash}, function (err, doc) {
            console.log(doc);
            if (doc == null){
                if (!isDir) {
                    var zip = new Zip(file);
                    folder = appDataFolder + "/extracted/" + hash;
                    console.log('extracted to ', folder);
                    zip.extractAllTo(folder, true)
                }
                var newDoc = {
                    hash: hash,
                    file: file,
                    folder: folder,
                    dir: isDir,
                    title: path.posix.basename(file),
                    time: new Date().getTime()
                };

                db.insert(newDoc, function(err, newDoc){});

                resolve({ dir: folder, tree: dirTree(folder), doc: newDoc});

            } else {
                db.update({hash: hash}, {$set: {time: new Date().getTime()}}, {});
                resolve({ dir: doc.folder, tree: dirTree(doc.folder), doc: doc});
            }


        });




    });

}

module.exports = {openEditorWindowPromised, prepareFileOrFolderPromised};