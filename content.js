// Strudel Enhanced Editor - Content Script
console.log('Strudel Enhanced Editor: Extension loaded');

// Inject REPL monitor script
function injectMonitor() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('repl-monitor.js');
    (document.head || document.documentElement).appendChild(script);
}

// Inject template bridge
function injectTemplateBridge() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('template-bridge.js');
    (document.head || document.documentElement).appendChild(script);
    console.log('Strudel Enhanced Editor: Template bridge injected');
}

// Inject immediately
injectMonitor();
injectTemplateBridge();

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
        console.log('Content script: Received template insertion request');

        // Forward to page context via postMessage
        window.postMessage({
            type: 'STRUDEL_INSERT_TEMPLATE',
            code: request.code
        }, '*');

        sendResponse({ success: true });
    }
    return true;
});