var hoo = {

    core: {
        src: ['node_modules/codemirror/lib/codemirror.js'],
        dest: 'codemirror.min.js'
    },
    modeBBCode: {
        src: [ 'node_modules/codemirror/mode/bbcode/bbcode.js'],
        dest: 'codemirror.mode.bbcode.min.js'
    },
    modeBBCodeMixed: {
        src: [
            'node_modules/codemirror/mode/xml/xml.js',
            'node_modules/codemirror/mode/javascript/javascript.js',
            'node_modules/codemirror/mode/css/css.js',
            'node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
            'node_modules/codemirror/mode/bbcode/bbcodemixed.js',
            'node_modules/codemirror/mode/bbcodemixed/bbcodemixed.js'
            ],
        dest: 'codemirror.mode.bbcodemixed.min.js'
    },
    modeHtml: {
        src: [
            'node_modules/codemirror/mode/xml/xml.js',
            'node_modules/codemirror/mode/javascript/javascript.js',
            'node_modules/codemirror/mode/css/css.js',
            'node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
            'node_modules/codemirror/mode/htmlembedded/htmlembedded.js'
            ],
        dest: 'codemirror.mode.htmlmixed.min.js'
    },
    modePHP: {
        src: [
            'node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
            'node_modules/codemirror/mode/xml/xml.js',
            'node_modules/codemirror/mode/javascript/javascript.js',
            'node_modules/codemirror/mode/css/css.js',
            'node_modules/codemirror/mode/clike/clike.js',
            'node_modules/codemirror/mode/php/php.js'
            ],
        dest: 'codemirror.mode.php.min.js'
    },
    modeJs: {
        src: ['node_modules/codemirror/mode/javascript/javascript.js'],
        dest: 'codemirror.mode.javascript.min.js'
    },
    addons: {
        src: [
            'node_modules/codemirror/addon/comment/continuecomment.js',
            'node_modules/codemirror/addon/edit/closebrackets.js',
            'node_modules/codemirror/addon/edit/closetag.js',
            'node_modules/codemirror/addon/edit/matchbrackets.js',
            'node_modules/codemirror/addon/edit/matchtags.js',
            'node_modules/codemirror/addon/edit/trailingspace.js',
            'node_modules/codemirror/addon/fold/foldcode.js',
            'node_modules/codemirror/addon/fold/foldgutter.js',
            'node_modules/codemirror/addon/fold/brace-fold.js',
            'node_modules/codemirror/addon/fold/comment-fold.js',
            'node_modules/codemirror/addon/fold/indent-fold.js',
            'node_modules/codemirror/addon/fold/xml-fold.js',
            'node_modules/codemirror/addon/format/autoFormatAll.js',
            'node_modules/codemirror/addon/format/formatting.js',
            'node_modules/codemirror/addon/selection/active-line.js',
            'node_modules/codemirror/addon/search/match-highlighter.js',
            'node_modules/codemirror/addon/mode/multiplex.js'
            ],
        dest: 'codemirror.addons.min.js'
    },
    addonSearch: {
        src: [
            'node_modules/codemirror/addon/dialog/dialog.js',
            'node_modules/codemirror/addon/search/search.js',
            'node_modules/codemirror/addon/search/searchcursor.js'
            ],
        dest: 'codemirror.addons.search.min.js'
    },
    beautify: {
        src: [
            'node_modules/js-beautify/lib/beautify.js',
            'node_modules/js-beautify/lib/beautify-css.js',
            'node_modules/js-beautify/lib/beautify-html.js',
            ],
        dest: 'beautify.min.js'
    }
};

module.exports = hoo;