// Strudel Syntax Definitions
// Generated from documentation

const StrudelSyntax = {
    // Mini-notation operators
    operators: {
        '<>': 'Sequential - plays patterns in sequence',
        '[]': 'Simultaneous - plays patterns together',
        '*': 'Repeat - multiplies pattern',
        '/': 'Slow - divides pattern speed',
        '!': 'Random select from pattern',
        '~': 'Rest/silence',
        '-': 'Rest/silence (alternative)',
        '@': 'Elongate - extends duration',
        ',': 'Stack - layers patterns',
        '|': 'Alternate',
        '&': 'Combine'
    },

    // Core keywords and functions
    keywords: [
        'stack', 'all', 'let', 'const', 'register', 'setcps', 'setbpm',
        'samples', 'setDefaultVoicings'
    ],

    // Pattern creation
    patternFunctions: [
        's', 'n', 'note', 'sound', 'chord', 'scale', 'mode'
    ],

    // Sample shortcuts
    sampleShortcuts: [
        'bd', 'sd', 'cp', 'hh', 'oh', 'cr', 'ride', 'lt', 'mt', 'hat',
        'rim', 'rd', 'sf', 'mt'
    ],

    // Effects
    effects: [
        'gain', 'room', 'delay', 'pan', 'lpf', 'hpf', 'lpq', 'hpq',
        'shape', 'crush', 'phaser', 'vowel', 'fm', 'am',
        'vib', 'vibmod', 'tremolo', 'coarse', 'cut', 'orbit',
        'speed', 'unit', 'loop', 'begin', 'end', 'attack', 'release',
        'hold', 'decay', 'sustain', 'size', 'leslie', 'phasr',
        'phasdp', 'djf', 'triode', 'krush', 'kcutoff', 'octer',
        'octersub', 'octsubsub', 'ring', 'ringf', 'ringdf',
        'distort', 'spectral', 'xsdelay', 'tsdelay', 'real',
        'imag', 'enhance', 'partials', 'comb', 'smear', 'striate',
        'cloud', 'squiz', 'freq', 'midinote', 'velocity'
    ],

    // Pattern manipulation
    patternMethods: [
        'slow', 'fast', 'hurry', 'rev', 'iter', 'ply', 'every',
        'sometimes', 'rarely', 'often', 'almostAlways', 'never',
        'struct', 'mask', 'euclid', 'euclidRot', 'when', 'off',
        'jux', 'juxBy', 'degrade', 'degradeBy', 'unDegradeBy',
        'chop', 'striate', 'slice', 'splice', 'loopAt', 'fit',
        'press', 'pressBy', 'range', 'rangex', 'segment', 'chunk',
        'zoom', 'compress', 'compressTo', 'fastGap', 'density',
        'densityGap', 'repeatCycles', 'firstOf', 'superimpose',
        'layer', 'add', 'sub', 'mul', 'div', 'set', 'keep',
        'keepif', 'pickup', 'pickRestart', 'pick', 'pickOut'
    ],

    // Time/tempo functions
    timeFunctions: [
        'early', 'late', 'lateBy', 'offset', 'rotL', 'rotR'
    ],

    // Voicing/harmony
    harmonyFunctions: [
        'voicing', 'anchor', 'dict', 'offset', 'inversion'
    ],

    // Generators
    generators: [
        'sine', 'saw', 'square', 'tri', 'rand', 'irand', 'perlin',
        'time', 'timebus', 'rtime'
    ],

    // Pattern queries
    patternQueries: [
        'bank', 'clip', 'cut', 'legato', 'room', 'gain', 'speed',
        'velocity', 'penv', 'patt'
    ],

    // Synth types
    synthTypes: [
        'synth', 'fm', 'superfm', 'string', 'am', 'sine', 'saw',
        'square', 'triangle', 'sawtooth', 'gtr', 'piano', 'supersquare',
        'supersaw'
    ]
};

// Export for use in extension
if (typeof module !== 'undefined') {
    module.exports = StrudelSyntax;
}