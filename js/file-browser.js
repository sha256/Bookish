(function(){

    var self = {};
    var jsTree = require('jstree');
    var $fileBrowserTree = $("#fileBrowserTree");

    const {ipcRenderer} = require('electron');

    ipcRenderer.on('file-opened', function(e, file){

        var dirTree = require('./dirtree.js');
        var tree = dirTree(file[0]);

        buildTree(tree);


    });

    function buildTree(data){
        $fileBrowserTree.jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "themes": {},
                'data': data
            },
            "types": {
                "#": {
                    "max_children": 1,
                    "valid_children": ["root"]
                },
                "root": {
                    "icon": "40px.png",
                    "valid_children": ["default"]
                },
                "default": {
                    "valid_children": ["default", "file"],
                    icon: 'icon icon-folder'
                },
                "file": {
                    "icon": "icon icon-doc-text-inv",
                    "valid_children": []
                }
            },
            "plugins": [
                "contextmenu", "dnd", "search",
                "state", "types", "wholerow", 'sort'
            ]
        });


        $fileBrowserTree.on('dblclick.jstree', '.jstree-anchor', function(e){
            var instance = $.jstree.reference(this),
            node = instance.get_node(this);

            openFileTab(node);

        });

        function openFileTab(node){
            var fs = require('fs');

            fs.readFile(node.original.path, 'utf8', function(err, data) {
                if (err) throw err;
                CKEDITOR.instances.editor.setData(data);
            });
        }


    }


    module.exports = self;
})();