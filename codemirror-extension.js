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

        // First, inject CSS styles for syntax highlighting
        const strudelHighlightStyle = `
      /* Strudel Syntax Highlighting */
      .cm-strudel-keyword { color: #CF6A4C !important; font-weight: bold; }
      .cm-strudel-function { color: #89BDFF !important; }
      .cm-strudel-effect { color: #99CF50 !important; }
      .cm-strudel-operator { color: #E8BF6A !important; font-weight: bold; }
      .cm-strudel-sample { color: #FF6188 !important; }
      .cm-strudel-number { color: #A8FF60 !important; }
      .cm-strudel-string { color: #65B042 !important; }
      .cm-strudel-comment { color: #7F7F7F !important; font-style: italic; }
      .cm-strudel-mininotation { color: #AE81FF !important; }
      .cm-strudel-generator { color: #66D9EF !important; }
      .cm-strudel-method { color: #A6E22E !important; }
    `;

        const styleEl = document.createElement('style');
        styleEl.id = 'strudel-enhanced-styles';
        styleEl.textContent = strudelHighlightStyle;
        document.head.appendChild(styleEl);

        console.log('Strudel Enhanced: CSS styles injected');
        console.log('Strudel Enhanced: Current document:', view.state.doc.toString().substring(0, 50));

        // For now, we've added the CSS classes
        // Next step will be to add CodeMirror extensions to actually apply these classes

        console.log('Strudel Enhanced: Syntax highlighting setup complete!');
    }

    // Start initialization
    initializeHighlighting();

})();