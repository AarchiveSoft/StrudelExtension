// Strudel Language Extension for CodeMirror
// This will be injected into the page to add syntax highlighting

(function () {
    'use strict';

    console.log('Strudel Enhanced: Script injected into page context');

    function findCodeMirrorInstance(attempt = 0) {
        const maxAttempts = 20;

        // Find the editor element
        const editorElement = document.querySelector('.cm-editor');

        if (!editorElement) {
            if (attempt < maxAttempts) {
                setTimeout(() => findCodeMirrorInstance(attempt + 1), 200);
            }
            return;
        }

        // Try different ways to access CodeMirror
        let cmInstance = null;

        // Method 1: Check element properties
        for (let key in editorElement) {
            if (key.startsWith('__')) {
                console.log('Strudel Enhanced: Found key', key);
            }
        }

        // Method 2: Check if it's in a React fiber
        const reactKey = Object.keys(editorElement).find(key =>
            key.startsWith('__react') || key.startsWith('_react')
        );

        if (reactKey) {
            console.log('Strudel Enhanced: Found React key:', reactKey);
        }

        // Method 3: Try to access through window
        if (window.strudelRepl || window.repl) {
            console.log('Strudel Enhanced: Found Strudel REPL object');
            const repl = window.strudelRepl || window.repl;
            console.log('REPL keys:', Object.keys(repl));
        }

        // For now, just apply CSS-based highlighting
        applyBasicHighlighting();
    }

    function applyBasicHighlighting() {
        console.log('Strudel Enhanced: Applying basic CSS highlighting');

        // Token styles for syntax highlighting
        const strudelHighlightStyle = `
      .cm-strudel-keyword { color: #CF6A4C; font-weight: bold; }
      .cm-strudel-function { color: #89BDFF; }
      .cm-strudel-effect { color: #99CF50; }
      .cm-strudel-operator { color: #E8BF6A; font-weight: bold; }
      .cm-strudel-sample { color: #FF6188; }
      .cm-strudel-number { color: #A8FF60; }
      .cm-strudel-string { color: #65B042; }
      .cm-strudel-comment { color: #7F7F7F; font-style: italic; }
      .cm-strudel-mininotation { color: #AE81FF; }
      .cm-strudel-generator { color: #66D9EF; }
    `;

        // Inject styles
        const styleEl = document.createElement('style');
        styleEl.textContent = strudelHighlightStyle;
        document.head.appendChild(styleEl);
    }

    // Start looking for CodeMirror
    findCodeMirrorInstance();

})();