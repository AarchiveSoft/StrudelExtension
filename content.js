// Strudel Enhanced Editor - Content Script
console.log('Strudel Enhanced Editor: Extension loaded');

// Wait for CodeMirror to be available
function waitForCodeMirror() {
    // Check if CodeMirror elements exist
    const cmElement = document.querySelector('.cm-editor');

    if (cmElement) {
        console.log('Strudel Enhanced Editor: CodeMirror detected');
        initializeExtension();
    } else {
        // Retry after a short delay
        setTimeout(waitForCodeMirror, 100);
    }
}

function initializeExtension() {
    console.log('Strudel Enhanced Editor: Initializing...');

    // Inject the CodeMirror extension script
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('codemirror-extension.js');
    script.onload = function () {
        console.log('Strudel Enhanced Editor: Syntax highlighting loaded');
    };
    (document.head || document.documentElement).appendChild(script);
}

// Start checking for CodeMirror
waitForCodeMirror();