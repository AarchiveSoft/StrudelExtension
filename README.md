# StrudelExtension

A small experimental browser extension to enhance the **Strudel REPL** (the browser-based live-coding environment for music at Strudel.cc) by injecting custom editor behavior and REPL helpers directly into your browser.

The extension is built around:

- **CodeMirror integration** – to hook into the editor Strudel uses  
- **Custom syntax definition** – to support Strudel-specific syntax  
- **REPL monitoring** – to react to evaluation / playback changes in the page  

> ⚠️ This project is experimental and intended for developers and Strudel power-users. Expect breaking changes.

---

## Features

- **Strudel-aware editor behavior**  
  Logic in `codemirror-extension.js` augments CodeMirror editors used by Strudel.

- **REPL monitoring hooks**  
  `repl-monitor.js` observes Strudel REPL activity (evaluations, playback changes, etc.).

- **Custom syntax definition**  
  `syntax-definition.js` provides syntax rules for Strudel patterns.

- **Content script integration**  
  `content.js` injects all behavior into matching pages (configured in `manifest.json`).

---

## Installation

### 1. Clone the repository

    git clone https://github.com/AarchiveSoft/StrudelExtension.git
    cd StrudelExtension

### 2. Load the extension in your browser

#### Chromium (Chrome, Edge, Brave, etc.)

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `StrudelExtension` folder

#### Firefox (temporary install)

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select the `manifest.json` file

---

## Usage

Once loaded:

1. Navigate to the Strudel REPL (e.g. https://strudel.cc)
2. Start or open a session
3. The extension automatically injects its editor helpers, syntax rules, and REPL monitor

This enables:

- Editor helpers, snippets, structural editing  
- Visualizations reacting to pattern changes  
- Integrations with external tools or dashboards  

---

## Project Structure

    .
    ├── codemirror-extension.js  # CodeMirror editor integration
    ├── content.js               # Main content script
    ├── manifest.json            # Browser extension metadata
    ├── repl-monitor.js          # Observes Strudel REPL activity
    └── syntax-definition.js     # Syntax rules for Strudel patterns

---

## Development

There is no build pipeline; the extension runs directly from source.

**Typical workflow:**

1. Edit any `.js` file  
2. Reload the extension in your browser's extension settings  
3. Refresh the Strudel REPL page  

### Debugging

- Use the page’s DevTools  
- Check the console for logs from all injected scripts  
- Set breakpoints in the Sources tab  

---

## Contributing

1. Fork the repo  
2. Clone your fork  
3. Create a feature branch  
4. Commit and push  
5. Open a Pull Request  

Guidelines:

- Keep PRs focused  
- Add comments for non-obvious logic  
- Preserve compatibility with current architecture  

---

## Roadmap / Ideas

- Visual overlays showing active pattern segments  
- Expanded Strudel keybindings  
- A dedicated performance UI  
- Integration with browser-based MIDI or controllers  

---

## License

No license file exists yet.  
Until one is added, all rights are reserved by the author.
