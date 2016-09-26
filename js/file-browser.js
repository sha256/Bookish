(function(){

    var self = {};
    var $fileBrowserTree = $("#fileBrowserTree");
    var jsTree = require('jstree');
    const {ipcRenderer} = require('electron');

    ipcRenderer.on('editor-data-ready', function(e, tree){
        showFileBrowserTree($fileBrowserTree, tree);
        ipcRenderer.emit('editor-ready');
    });

    $fileBrowserTree.on('dblclick.jstree', '.jstree-wholerow, .jstree-anchor', function(e){
        var instance = $.jstree.reference(this),
        node = instance.get_node(this);

        if (node.original.type == "file")
            $(document).trigger('show-tab', node);

    });

})();

function showFileBrowserTree($fileBrowserTree, data) {

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

}