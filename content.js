// Strudel Enhanced Editor - Content Script
console.log('Strudel Enhanced Editor: Extension loaded');

// Inject REPL monitor script
function injectMonitor() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('repl-monitor.js');
    (document.head || document.documentElement).appendChild(script);
}

// Inject immediately
injectMonitor();

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

    // Load tokenizer first
    const tokenizerScript = document.createElement('script');
    tokenizerScript.src = chrome.runtime.getURL('strudel-tokenizer.js');
    tokenizerScript.onload = function () {
        // Then load autocomplete data
        const autocompleteDataScript = document.createElement('script');
        autocompleteDataScript.src = chrome.runtime.getURL('autocomplete-data.js');
        autocompleteDataScript.onload = function () {
            // Then load the main CodeMirror extension
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('codemirror-extension.js');
            script.onload = function () {
                // Finally load autocomplete
                const autocompleteScript = document.createElement('script');
                autocompleteScript.src = chrome.runtime.getURL('autocomplete.js');
                autocompleteScript.onload = function () {
                    console.log('Strudel Enhanced Editor: All features loaded');
                };
                (document.head || document.documentElement).appendChild(autocompleteScript);
            };
            (document.head || document.documentElement).appendChild(script);
        };
        (document.head || document.documentElement).appendChild(autocompleteDataScript);
    };
    (document.head || document.documentElement).appendChild(tokenizerScript);
}

// Start checking for CodeMirror
waitForCodeMirror();

// Listen for template insertion messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'insertTemplate') {
        insertTemplateIntoEditor(request.code);
        sendResponse({ success: true });
    }
    return true;
});

function insertTemplateIntoEditor(code) {
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
}