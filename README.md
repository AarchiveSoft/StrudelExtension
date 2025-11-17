# StrudelExtension

StrudelExtension is a small **experimental browser extension** that enhances the [Strudel REPL](https://strudel.cc) (the browser-based live-coding environment for music) by injecting custom editor behavior and REPL helpers directly into your browser.

The extension focuses on:

- **CodeMirror integration** – hooks into the editor used by Strudel
- **Custom syntax definition** – supports Strudel-specific syntax and patterns
- **REPL monitoring** – reacts to evaluation and playback changes on the page

> ⚠️ **Status:** Experimental. This project is intended for developers and Strudel power-users. Expect breaking changes and internal APIs that may change without notice.

---

## Table of Contents

- [StrudelExtension](#strudelextension)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Features](#features)
  - [Installation](#installation)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Load the extension in your browser](#2-load-the-extension-in-your-browser)
      - [Chromium-based browsers (Chrome, Edge, Brave, etc.)](#chromium-based-browsers-chrome-edge-brave-etc)
      - [Firefox (temporary install)](#firefox-temporary-install)
    - [Updating the extension](#updating-the-extension)
  - [Usage](#usage)
    - [Basic workflow](#basic-workflow)
    - [What the extension does on the page](#what-the-extension-does-on-the-page)
  - [Project Structure](#project-structure)
  - [Development Notes](#development-notes)
    - [Typical development loop](#typical-development-loop)
    - [Debugging tips](#debugging-tips)
  - [Contributing](#contributing)
  - [Roadmap / Ideas](#roadmap--ideas)
  - [License](#license)

---

## Project Description

StrudelExtension augments the Strudel REPL running in your browser. Once installed and loaded, it attaches to Strudel's CodeMirror editor instances, injects a Strudel-aware syntax definition, and observes the REPL to react to evaluations and playback changes.

The goal is to make Strudel-based live coding more ergonomic and expressive, especially for power-users who:

- Want more **editor assistance** for Strudel patterns (snippets, smart selections, structural editing).
- Are interested in **visual or behavioral hooks** that respond when the REPL evaluates or when playback changes.
- Want a foundation for building **custom tools and integrations** around Strudel within the browser environment.

At this stage, the extension is primarily a **developer sandbox** rather than a polished end-user product.

---

## Features

### Strudel-aware editor behavior

Logic in `codemirror-extension.js` augments CodeMirror editors used by Strudel, for example:

- Adding Strudel-specific editor helpers.
- Providing structural operations tailored to patterns.
- Acting as a foundation for further editor extensions.

### REPL monitoring hooks

`repl-monitor.js` observes Strudel REPL activity directly in the page:

- Watches for **evaluations** and **playback changes**.
- Can be used to trigger custom behavior in response to live coding actions.
- Provides a hook layer to bridge between the REPL and other scripts.

### Custom syntax definition

`syntax-definition.js` provides a syntax definition tailored to Strudel patterns:

- Recognizes Strudel-centric constructs.
- Enables more accurate syntax analysis and highlighting (depending on integration).
- Designed to be extended or refined as Strudel evolves.

Related helpers, such as `strudel-tokenizer.js` and `template-bridge.js`, support the tokenizer and bridging logic for syntax and templates.

### Content script integration

`content.js` is the main content script that:

- Injects the CodeMirror extension, REPL monitor, and syntax definition into matching Strudel pages (configured via `manifest.json`).
- Coordinates how the different extension modules attach to the Strudel REPL.

### Popup and autocomplete helpers

Additional files such as `popup.html`, `popup.js`, `popup.css`, `popup-test.js`, `autocomplete.js`, and `autocomplete-data.js` are used to:

- Offer a popup UI (for experimentation and internal tooling).
- Provide or prototype autocomplete data and behavior.

These parts are still evolving and should be considered experimental.

---

## Installation

### 1. Clone the repository

Clone the repository locally:

    git clone https://github.com/AarchiveSoft/StrudelExtension.git
    cd StrudelExtension

### 2. Load the extension in your browser

#### Chromium-based browsers (Chrome, Edge, Brave, etc.)

1. Open `chrome://extensions` in your browser.
2. Enable **Developer mode** (usually a toggle in the top right).
3. Click **Load unpacked**.
4. Select the cloned `StrudelExtension` folder.

The extension should now appear in your list of extensions.

#### Firefox (temporary install)

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on…**.
3. Select the `manifest.json` file from the `StrudelExtension` directory.

Firefox will load the extension for the current session (it will be removed when you restart the browser).

### Updating the extension

To update the extension after pulling new changes:

1. Run `git pull` inside your `StrudelExtension` directory to get the latest code.
2. In your browser's extension settings:
   - **Chromium:** Click the **Reload** button on the extension card.
   - **Firefox:** Remove the temporary add-on and repeat the temporary install steps with the updated code.
3. Reload any open Strudel REPL tabs.

---

## Usage

### Basic workflow

Once the extension is installed and enabled:

1. Navigate to the Strudel REPL, for example: `https://strudel.cc`.
2. Start or open a Strudel session as usual.
3. The extension automatically injects:
   - Editor helpers via `codemirror-extension.js`.
   - Syntax rules via `syntax-definition.js` and related tokenizer helpers.
   - REPL monitoring via `repl-monitor.js`.

There is no separate UI you need to open to activate the core behavior; it is page-driven.

### What the extension does on the page

With the extension active, the Strudel REPL can benefit from:

- **Editor helpers and snippets** for Strudel patterns.
- **Structural editing** aimed at manipulating pattern-oriented code.
- **Monitoring hooks** that respond to:
  - Evaluations in the REPL.
  - Changes in playback state.

Depending on how you extend or configure the scripts, this can be used to:

- Drive visualizations that react to pattern changes.
- Integrate Strudel with external tools (dashboards, visualizers, controllers).
- Prototype advanced live-coding workflows inside a normal browser session.

Because this is an experimental project, concrete user-facing features may shift, and your mileage may vary between updates.

---

## Project Structure

A simplified view of the repository:

    .
    ├── autocomplete-data.js       # Data source(s) for autocomplete experiments
    ├── autocomplete.js            # Autocomplete-related logic
    ├── codemirror-extension.js    # CodeMirror editor integration for Strudel
    ├── content.js                 # Main content script injected into Strudel pages
    ├── manifest.json              # Browser extension manifest and configuration
    ├── popup.css                  # Styling for the extension popup
    ├── popup.html                 # Popup HTML (experimental UI)
    ├── popup.js                   # Popup behavior logic
    ├── popup-test.js              # Popup-related test / sandbox script
    ├── repl-monitor.js            # Observes Strudel REPL activity and playback
    ├── resources/                 # Static resources (icons, images, etc.)
    ├── strudel-tokenizer.js       # Tokenization helpers for Strudel syntax
    ├── syntax-definition.js       # Syntax rules and definitions for Strudel patterns
    ├── template-bridge.js         # Bridges templates / syntax helpers into the REPL
    └── README.md                  # Project documentation (this file)

Not all scripts are wired into a production-ready feature set. Some files support experimental or internal workflows and may evolve or be removed.

---

## Development Notes

There is **no build pipeline** at this time. The extension runs directly from source:

- No bundler is required.
- No package manager configuration is currently in use (no `package.json` in the repo at the time of writing).
- Scripts are referenced directly from `manifest.json` and related HTML files.

### Typical development loop

1. Clone the repo and load the extension as described in [Installation](#installation).
2. Open the Strudel REPL in a browser tab.
3. Edit any JavaScript file in the project:
   - For editor behavior, change `codemirror-extension.js`.
   - For REPL hooks, change `repl-monitor.js`.
   - For syntax tweaks, change `syntax-definition.js` or related helpers.
4. Reload the extension:
   - On Chromium: use the **Reload** button in `chrome://extensions`.
   - On Firefox: remove and re-add the temporary add-on.
5. Refresh the Strudel REPL tab and re-test your changes.

Because there is no bundling step, your edits are picked up as soon as the extension is reloaded.

### Debugging tips

Use your browser's DevTools to inspect what the extension is doing:

- Open DevTools on the Strudel REPL page (for example, `https://strudel.cc`).
- Use the **Console** tab to:
  - Inspect logs from `content.js`, `codemirror-extension.js`, `repl-monitor.js`, and other scripts.
- Use the **Sources** tab to:
  - Set breakpoints in the extension's content scripts.
  - Step through how the extension attaches to CodeMirror and the REPL.
- For the popup:
  - Open the popup and then use your browser's extension tools (such as inspecting the popup element) to debug `popup.html`, `popup.js`, and `popup.css`.

If you introduce new scripts, ensure they are properly referenced in `manifest.json` and any relevant HTML files.

---

## Contributing

Contributions, experiments, and discussion are welcome, especially from Strudel power-users interested in editor tooling.

### How to contribute

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

       git clone https://github.com/<your-username>/StrudelExtension.git
       cd StrudelExtension

3. **Create a feature branch** for your changes:

       git checkout -b my-feature-branch

4. Make your changes (code, docs, etc.).
5. **Commit and push** your branch:

       git commit -am "Add my feature"
       git push origin my-feature-branch

6. Open a **Pull Request** against the upstream `main` branch.

### Contribution guidelines

- Keep pull requests **focused** on a single feature or fix.
- Add **comments** for non-obvious logic or experimental behavior.
- Preserve compatibility with the current architecture unless the PR explicitly proposes architectural changes.
- If your contribution significantly alters user-visible behavior, please update this README accordingly.

---

## Roadmap / Ideas

This is not a strict roadmap but a collection of ideas and directions that may be explored:

- **Visual overlays** that highlight or annotate active pattern segments in the editor.
- **Expanded Strudel keybindings** to streamline live performance workflows.
- A **dedicated performance UI**, potentially using the popup or separate in-page panels.
- **Integration with MIDI or controllers** running in the browser (e.g. via Web MIDI or similar APIs).
- More robust **autocomplete and snippet systems** built on `autocomplete.js` and `autocomplete-data.js`.
- Better **configuration options**, such as toggling features on/off or selecting different behavior profiles.

If you have ideas, feel free to open an issue or draft PR to discuss them.

---

## License

At the time of writing, **no license file** exists in this repository.

Until an explicit license is added:

- All rights are reserved by the author.
- You may review and experiment with the code locally.
- Before using this project in a commercial or redistributed context, please contact the repository owner or open an issue to clarify licensing.

Once a license is added, this section should be updated to match the chosen license and include any relevant notices or attribution requirements.
