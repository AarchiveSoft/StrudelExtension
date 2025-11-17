// Template Bridge - Runs in page context to access CodeMirror view
(function () {
    'use strict';

    console.log('Strudel Enhanced: Template bridge loaded');

    // Listen for template insertion requests from content script
    window.addEventListener('message', function (event) {
        // Only accept messages from same origin
        if (event.source !== window) return;

        if (event.data.type === 'STRUDEL_INSERT_TEMPLATE') {
            console.log('Template bridge: Received template insertion request');
            insertTemplate(event.data.code);
        }
    });

    function insertTemplate(code) {
        // Get the CodeMirror view
        if (!window.strudelCodeMirrorView) {
            console.error('Strudel Enhanced: CodeMirror view not available');
            return;
        }

        const view = window.strudelCodeMirrorView;
        const cursorPos = view.state.selection.main.head;

        // Insert the template at cursor position
        view.dispatch({
            changes: {
                from: cursorPos,
                insert: code
            },
            selection: { anchor: cursorPos + code.length }
        });

        console.log('Template bridge: Template inserted successfully');
    }
})();