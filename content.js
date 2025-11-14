// Strudel Enhanced Editor - Content Script
console.log('Strudel Enhanced Editor: Extension loaded');

// Inject our script directly into the page context (not isolated)
function injectScript() {
    const script = document.createElement('script');
    script.textContent = `
    (function() {
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
          }
        }
      }, 100);
      
      // Stop checking after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);
    })();
  `;
    (document.head || document.documentElement).appendChild(script);
}

// Inject immediately
injectScript();

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