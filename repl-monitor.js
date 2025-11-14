// REPL Monitor - runs in page context to access Strudel's REPL
(function () {
    console.log('Strudel Enhanced: Monitoring for editor initialization...');

    function findCodeMirrorView() {
        try {
            // Find the editor element
            const editor = document.querySelector('.cm-editor');
            if (!editor) return null;

            // Navigate through React fiber to find the EditorView
            const parent = editor.parentElement;
            const fiberKey = Object.keys(parent).find(k => k.startsWith('__reactFiber'));
            if (!fiberKey) return null;

            const fiber = parent[fiberKey];
            const parentComponent = fiber.return;
            if (!parentComponent || !parentComponent.memoizedProps) return null;

            const editorRef = parentComponent.memoizedProps.editorRef;
            if (!editorRef || !editorRef.current) return null;

            // Get the actual CodeMirror EditorView
            const cmView = editorRef.current.editor;
            return cmView;
        } catch (e) {
            console.error('Strudel Enhanced: Error finding CodeMirror view:', e);
            return null;
        }
    }

    // Check for editor periodically
    let checkInterval = setInterval(() => {
        const cmView = findCodeMirrorView();

        if (cmView) {
            console.log('Strudel Enhanced: CodeMirror EditorView found!');
            console.log('Strudel Enhanced: Current code:', cmView.state.doc.toString().substring(0, 50) + '...');
            clearInterval(checkInterval);

            // Store reference globally for the extension to use
            window.strudelCodeMirrorView = cmView;

            // Dispatch custom event to notify extension
            window.dispatchEvent(new CustomEvent('strudelEditorReady', { detail: { view: cmView } }));
        }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.strudelCodeMirrorView) {
            console.warn('Strudel Enhanced: Could not find CodeMirror view after 10 seconds');
        }
    }, 10000);
})();