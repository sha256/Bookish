const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click (item, focusedWindow) {

                    require('electron').dialog.showOpenDialog({
                        properties: ['openFile', 'openDirectory']
                    }, function (files) {
                        var fs = require('fs');
                        if (fs.statSync(files[0]).isDirectory()){
                            require('electron').app.emit('file-selected', files[0], false);
                        } else {
                            if (files[0].endsWith(".epub"))
                                require('electron').app.emit('file-selected', files[0], true);
                            else
                                require('electron').dialog.
                                showErrorBox('Unsupported Choice', 'Select a folder or an epub file')
                        }

                    });


                }
            }
        ]

    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click () {
                    require('electron').shell.openExternal('http://electron.atom.io')
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    const name = require('electron').app.getName();
    template.unshift({
        label: 'Bookish',
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    });
    // Edit menu.
    template[2].submenu.push(
        {
            type: 'separator'
        },
        {
            label: 'Speech',
            submenu: [
                {
                    role: 'startspeaking'
                },
                {
                    role: 'stopspeaking'
                }
            ]
        }
    );
    // Window menu.
    template[4].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ]
}

module.exports = {

    init: function(){
        const {Menu} = require('electron');
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

};
