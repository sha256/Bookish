module.exports = (function(){

    var self = {};

    self.init = function(){
        const remote = require('electron').remote;
        const Menu = remote.Menu;
        const MenuItem = remote.MenuItem;

        var treeNode = null;
        var treeInstance = null;

        var menu = new Menu();
        menu.append(new MenuItem({
            label: 'New File', click: function () {
                console.log(treeNode);
                treeInstance.create_node(treeNode, {text: 'New File', type: 'file'}, "last", function (new_node) {
                    setTimeout(function () { treeInstance.edit(new_node); },0);
                });
            }
        }));
        menu.append(new MenuItem({
            label: 'Rename', click: function () {
                treeInstance.edit(treeNode);
            }
        }));
        menu.append(new MenuItem({
            label: 'Delete', click: function () {
                if (treeInstance.is_selected(treeNode)) {
                    treeInstance.delete_node(treeInstance.get_selected());
                } else {
                    treeInstance.delete_node(treeNode);
                }
            }
        }));
        menu.append(new MenuItem({type: 'separator'}));
        menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}));

        $(document).on("contextmenu", '.jstree-wholerow, .jstree-anchor', function (e) {

            if (e.target.tagName.toLowerCase() === 'input') {
                return;
            }

            treeInstance = $.jstree.reference(this);
            treeNode = treeInstance.get_node(this);

            menu.popup(remote.getCurrentWindow());

        });
        
    };

    return self;
})();