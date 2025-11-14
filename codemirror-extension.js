// Strudel Language Extension for CodeMirror
// This will be injected into the page to add syntax highlighting

(function () {
    'use strict';

    // Find the CodeMirror editor instance from the DOM
    const editorElement = document.querySelector('.cm-editor');

    if (!editorElement) {
        console.warn('Strudel Enhanced: Editor element not found');
        return;
    }

    // Try to access the CodeMirror view from the element
    // CodeMirror 6 stores the view in the element
    const cmView = editorElement.cmView?.view || editorElement.CodeMirror;

    if (!cmView) {
        console.warn('Strudel Enhanced: CodeMirror view not accessible');
        console.log('Available properties on editor element:', Object.keys(editorElement));
        return;
    }

    console.log('Strudel Enhanced: Found CodeMirror instance');
    console.log('Strudel Enhanced: Injecting syntax highlighting...');

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

    console.log('Strudel Enhanced: Syntax highlighting styles injected');

})();