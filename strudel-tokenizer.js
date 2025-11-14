// Strudel Syntax Parser for CodeMirror 6
// This creates a simple tokenizer that recognizes Strudel syntax

(function () {
    'use strict';

    // Define Strudel syntax patterns
    const StrudelTokens = {
        // Keywords
        keywords: new Set([
            'stack', 'all', 'let', 'const', 'register', 'setcps', 'setbpm',
            'samples', 'setDefaultVoicings'
        ]),

        // Core pattern functions
        patternFunctions: new Set([
            's', 'n', 'note', 'sound', 'chord', 'scale', 'mode'
        ]),

        // Sample shortcuts
        sampleShortcuts: new Set([
            'bd', 'sd', 'cp', 'hh', 'oh', 'cr', 'ride', 'lt', 'mt', 'hat',
            'rim', 'rd', 'sf'
        ]),

        // Effects (common ones)
        effects: new Set([
            'gain', 'room', 'delay', 'pan', 'lpf', 'hpf', 'lpq', 'hpq',
            'shape', 'crush', 'phaser', 'vowel', 'fm', 'am', 'bank',
            'vib', 'vibmod', 'tremolo', 'speed', 'attack', 'release',
            'decay', 'sustain', 'cut', 'orbit', 'leslie', 'distort'
        ]),

        // Pattern methods
        patternMethods: new Set([
            'slow', 'fast', 'hurry', 'rev', 'iter', 'ply', 'every',
            'sometimes', 'rarely', 'often', 'struct', 'mask', 'euclid',
            'when', 'off', 'jux', 'degrade', 'chop', 'slice', 'range',
            'segment', 'chunk', 'add', 'sub', 'mul', 'div', 'set',
            'pick', 'pickRestart', 'pickOut', 'early', 'late', 'offset'
        ]),

        // Generators
        generators: new Set([
            'sine', 'saw', 'square', 'tri', 'rand', 'irand', 'perlin',
            'time'
        ]),

        // Voicing functions
        voicingFunctions: new Set([
            'voicing', 'anchor', 'dict', 'inversion'
        ])
    };

    // Simple tokenizer function
    function tokenizeStrudel(text) {
        const tokens = [];
        let pos = 0;

        while (pos < text.length) {
            const char = text[pos];

            // Skip whitespace
            if (/\s/.test(char)) {
                pos++;
                continue;
            }

            // Comments
            if (char === '/' && text[pos + 1] === '/') {
                const start = pos;
                while (pos < text.length && text[pos] !== '\n') pos++;
                tokens.push({ type: 'comment', start, end: pos, text: text.slice(start, pos) });
                continue;
            }

            // Strings
            if (char === '"' || char === "'" || char === '`') {
                const quote = char;
                const start = pos;
                pos++;
                while (pos < text.length && text[pos] !== quote) {
                    if (text[pos] === '\\') pos++; // Skip escaped chars
                    pos++;
                }
                pos++; // Include closing quote
                tokens.push({ type: 'string', start, end: pos, text: text.slice(start, pos) });
                continue;
            }

            // Numbers
            if (/\d/.test(char) || (char === '.' && /\d/.test(text[pos + 1]))) {
                const start = pos;
                while (pos < text.length && /[\d.]/.test(text[pos])) pos++;
                tokens.push({ type: 'number', start, end: pos, text: text.slice(start, pos) });
                continue;
            }

            // Identifiers (words)
            if (/[a-zA-Z_$]/.test(char)) {
                const start = pos;
                while (pos < text.length && /[a-zA-Z0-9_$]/.test(text[pos])) pos++;
                const word = text.slice(start, pos);

                let type = 'identifier';
                if (StrudelTokens.keywords.has(word)) type = 'keyword';
                else if (StrudelTokens.patternFunctions.has(word)) type = 'function';
                else if (StrudelTokens.sampleShortcuts.has(word)) type = 'sample';
                else if (StrudelTokens.effects.has(word)) type = 'effect';
                else if (StrudelTokens.patternMethods.has(word)) type = 'method';
                else if (StrudelTokens.generators.has(word)) type = 'generator';
                else if (StrudelTokens.voicingFunctions.has(word)) type = 'method';

                tokens.push({ type, start, end: pos, text: word });
                continue;
            }

            // Operators and punctuation
            if (/[<>\[\]\(\)\{\}*\/!~@,.|&:;=+\-]/.test(char)) {
                tokens.push({ type: 'operator', start: pos, end: pos + 1, text: char });
                pos++;
                continue;
            }

            // Unknown character
            pos++;
        }

        return tokens;
    }

    // Export tokenizer
    window.StrudelTokenizer = {
        tokenize: tokenizeStrudel,
        tokens: StrudelTokens
    };

    console.log('Strudel Enhanced: Tokenizer loaded');

})();