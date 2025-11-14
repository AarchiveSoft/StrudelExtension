// Strudel Autocomplete System
// Shows suggestions as you type

(function () {
    'use strict';

    console.log('Strudel Autocomplete: Initializing...');

    let currentView = null;
    let autocompletePopup = null;
    let currentSuggestions = [];
    let selectedIndex = 0;

    // Wait for autocomplete data to load
    function init() {
        if (!window.StrudelAutocomplete) {
            console.error('Strudel Autocomplete: Data not loaded!');
            setTimeout(init, 100);
            return;
        }

        if (!window.strudelCodeMirrorView) {
            console.log('Strudel Autocomplete: Waiting for CodeMirror view...');
            setTimeout(init, 100);
            return;
        }

        currentView = window.strudelCodeMirrorView;
        console.log('Strudel Autocomplete: Ready!');

        createPopup();
        attachListeners();
    }

    // Create the autocomplete popup element
    function createPopup() {
        autocompletePopup = document.createElement('div');
        autocompletePopup.id = 'strudel-autocomplete';
        autocompletePopup.style.cssText = `
      position: absolute;
      background: #2a2a2e;
      border: 1px solid #555;
      border-radius: 4px;
      padding: 4px 0;
      max-height: 300px;
      overflow-y: auto;
      z-index: 10000;
      display: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      font-family: monospace;
      font-size: 13px;
      min-width: 200px;
    `;
        document.body.appendChild(autocompletePopup);
        console.log('Strudel Autocomplete: Popup created');
    }

    // Attach event listeners to the editor
    function attachListeners() {
        const contentDiv = currentView.dom.querySelector('.cm-content');
        if (!contentDiv) {
            console.error('Strudel Autocomplete: Could not find .cm-content');
            return;
        }

        // Listen for keyup events
        contentDiv.addEventListener('keyup', handleKeyUp);
        contentDiv.addEventListener('keydown', handleKeyDown);

        // Hide popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!autocompletePopup.contains(e.target) && e.target !== contentDiv) {
                hidePopup();
            }
        });

        console.log('Strudel Autocomplete: Event listeners attached');
    }

    function handleKeyUp(e) {
        // Ignore navigation keys
        if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Tab'].includes(e.key)) {
            return;
        }

        const cursorPos = currentView.state.selection.main.head;
        const line = currentView.state.doc.lineAt(cursorPos);
        const lineText = line.text;
        const posInLine = cursorPos - line.from;

        // Find the word being typed (including after dots for methods)
        const beforeCursor = lineText.substring(0, posInLine);
        const match = beforeCursor.match(/[.\w]+$/);

        if (!match) {
            hidePopup();
            return;
        }

        const fullMatch = match[0];
        // Get just the part after the last dot (for method suggestions)
        const parts = fullMatch.split('.');
        const typedWord = parts[parts.length - 1];

        // Show suggestions if we have at least 1 character, or if just typed a dot
        if (typedWord.length < 1 && !fullMatch.endsWith('.')) {
            hidePopup();
            return;
        }

        showSuggestions(typedWord, cursorPos, fullMatch.endsWith('.'));
    }

    function handleKeyDown(e) {
        if (!autocompletePopup.style.display || autocompletePopup.style.display === 'none') {
            return;
        }

        // Handle navigation in popup
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, currentSuggestions.length - 1);
            updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            updateSelection();
        } else if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            e.stopPropagation();
            insertSuggestion(currentSuggestions[selectedIndex]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            hidePopup();
        }
    }

    function showSuggestions(typedWord, cursorPos, afterDot = false) {
        // Collect all suggestions
        let allSuggestions = [];

        if (afterDot) {
            // After a dot, prioritize methods and effects
            allSuggestions = [
                ...window.StrudelAutocomplete.patternMethods,
                ...window.StrudelAutocomplete.effects,
                ...window.StrudelAutocomplete.harmonyFunctions,
            ];
        } else {
            // Otherwise show everything
            allSuggestions = [
                ...window.StrudelAutocomplete.patternFunctions,
                ...window.StrudelAutocomplete.keywords,
                ...window.StrudelAutocomplete.sampleShortcuts,
                ...window.StrudelAutocomplete.effects,
                ...window.StrudelAutocomplete.patternMethods,
                ...window.StrudelAutocomplete.harmonyFunctions,
                ...window.StrudelAutocomplete.generators,
                ...window.StrudelAutocomplete.sampleBanks,
            ];
        }

        // Filter based on typed word
        const filtered = allSuggestions.filter(item =>
            item.label.toLowerCase().startsWith(typedWord.toLowerCase())
        );

        if (filtered.length === 0) {
            hidePopup();
            return;
        }

        currentSuggestions = filtered.slice(0, 15); // Limit to 15 suggestions
        selectedIndex = 0;

        renderPopup();
        positionPopup(cursorPos);
    }

    function renderPopup() {
        autocompletePopup.innerHTML = '';

        currentSuggestions.forEach((item, index) => {
            const div = document.createElement('div');
            div.style.cssText = `
        padding: 6px 12px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ddd;
      `;

            if (index === selectedIndex) {
                div.style.backgroundColor = '#094771';
            }

            const label = document.createElement('span');
            label.textContent = item.label;
            label.style.fontWeight = 'bold';

            const detail = document.createElement('span');
            detail.textContent = item.detail;
            detail.style.cssText = 'color: #888; font-size: 11px; margin-left: 12px;';

            div.appendChild(label);
            div.appendChild(detail);

            div.addEventListener('mouseenter', () => {
                selectedIndex = index;
                updateSelection();
            });

            div.addEventListener('click', () => {
                insertSuggestion(item);
            });

            // Show info on hover
            div.title = item.info;

            autocompletePopup.appendChild(div);
        });

        autocompletePopup.style.display = 'block';
    }

    function updateSelection() {
        const items = autocompletePopup.children;
        for (let i = 0; i < items.length; i++) {
            if (i === selectedIndex) {
                items[i].style.backgroundColor = '#094771';
            } else {
                items[i].style.backgroundColor = 'transparent';
            }
        }
    }

    function positionPopup(cursorPos) {
        // Get cursor position on screen
        const coords = currentView.coordsAtPos(cursorPos);
        if (!coords) return;

        autocompletePopup.style.left = coords.left + 'px';
        autocompletePopup.style.top = (coords.bottom + 2) + 'px';
    }

    function insertSuggestion(item) {
        const cursorPos = currentView.state.selection.main.head;
        const line = currentView.state.doc.lineAt(cursorPos);
        const lineText = line.text;
        const posInLine = cursorPos - line.from;

        // Find the word being replaced
        const beforeCursor = lineText.substring(0, posInLine);
        const fullMatch = beforeCursor.match(/[.\w]+$/);

        if (!fullMatch) return;

        // Get just the part after the last dot
        const parts = fullMatch[0].split('.');
        const lastPart = parts[parts.length - 1];

        // Only replace the last part (after the dot)
        const startPos = cursorPos - lastPart.length;

        // Insert the completion
        currentView.dispatch({
            changes: {
                from: startPos,
                to: cursorPos,
                insert: item.label
            },
            selection: { anchor: startPos + item.label.length }
        });

        hidePopup();
    }

    function hidePopup() {
        autocompletePopup.style.display = 'none';
        currentSuggestions = [];
        selectedIndex = 0;
    }

    // Start initialization
    init();

})();