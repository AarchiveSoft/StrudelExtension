// Strudel Language Extension for CodeMirror
// This will be injected into the page to add syntax highlighting

(function () {
    'use strict';

    console.log('Strudel Enhanced: Script injected into page context');

    function initializeHighlighting() {
        // Check if the view is already available
        if (window.strudelCodeMirrorView) {
            console.log('Strudel Enhanced: Found existing CodeMirror view');
            applyHighlighting(window.strudelCodeMirrorView);
            return;
        }

        // Otherwise wait for the event
        console.log('Strudel Enhanced: Waiting for editor ready event...');
        window.addEventListener('strudelEditorReady', function (event) {
            console.log('Strudel Enhanced: Editor ready event received!');
            const cmView = event.detail.view;

            if (!cmView) {
                console.error('Strudel Enhanced: No view in event detail');
                return;
            }

            applyHighlighting(cmView);
        });
    }

    function applyHighlighting(view) {
        console.log('Strudel Enhanced: Applying syntax highlighting to CodeMirror view...');

        // Check if tokenizer is loaded
        if (!window.StrudelTokenizer) {
            console.error('Strudel Enhanced: Tokenizer not loaded!');
            return;
        }

        // Inject minimal CSS for future use (not actively fighting Strudel's highlighting)
        const strudelHighlightStyle = `
      /* Strudel Enhanced - Reserved for future custom highlighting */
      .cm-content .cm-strudel-keyword { color: #CF6A4C; font-weight: bold; }
      .cm-content .cm-strudel-function { color: #89BDFF; }
      .cm-content .cm-strudel-effect { color: #99CF50; }
      .cm-content .cm-strudel-sample { color: #FF6188; }
      .cm-content .cm-strudel-number { color: #A8FF60; }
      .cm-content .cm-strudel-string { color: #65B042; }
      .cm-content .cm-strudel-comment { color: #7F7F7F; font-style: italic; }
      .cm-content .cm-strudel-generator { color: #66D9EF; }
      .cm-content .cm-strudel-method { color: #A6E22E; }
    `;

        if (!document.getElementById('strudel-enhanced-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'strudel-enhanced-styles';
            styleEl.textContent = strudelHighlightStyle;
            document.head.appendChild(styleEl);
            console.log('Strudel Enhanced: CSS styles injected');
        }

        console.log('Strudel Enhanced: CSS styles injected (highlighting disabled for now)');
        console.log('Strudel Enhanced: Ready for autocomplete implementation');
    }

    // Start initialization
    initializeHighlighting();

})();