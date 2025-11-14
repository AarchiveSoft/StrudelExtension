// REPL Monitor - runs in page context to access Strudel's REPL
(function () {
    console.log('Strudel Enhanced: Monitoring for REPL initialization...');

    // Check for REPL periodically
    let checkInterval = setInterval(() => {
        if (window.repl && window.repl.draw) {
            console.log('Strudel Enhanced: REPL found!');
            console.log('REPL properties:', Object.keys(window.repl));
            clearInterval(checkInterval);

            // Try to access CodeMirror view
            if (window.repl.editor) {
                console.log('Strudel Enhanced: Found editor!');
                console.log('Editor type:', window.repl.editor.constructor.name);
                console.log('Editor properties:', Object.keys(window.repl.editor));
            }

            // Store reference for later use
            window.strudelEditor = window.repl.editor;
        }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkInterval), 10000);
})();