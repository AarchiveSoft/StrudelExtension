// Strudel Autocomplete Data
// Comprehensive suggestions for functions, methods, samples, and more

const StrudelAutocomplete = {
    // Core pattern functions
    patternFunctions: [
        { label: 's', detail: 'sound/sample', info: 'Play a sound or sample. Example: s("bd")' },
        { label: 'n', detail: 'note number', info: 'Play MIDI note number. Example: n("0 2 4 7")' },
        { label: 'note', detail: 'note name', info: 'Play note by name. Example: note("c4 e4 g4")' },
        { label: 'sound', detail: 'sound pattern', info: 'Alternative to s(). Play sounds.' },
        { label: 'chord', detail: 'chord pattern', info: 'Play chords. Example: chord("<Cm7 Fm7>")' },
        { label: 'scale', detail: 'scale pattern', info: 'Set scale. Example: scale("c4:minor")' },
        { label: 'mode', detail: 'mode pattern', info: 'Set mode for notes' },
    ],

    // Sample shortcuts (drum sounds)
    sampleShortcuts: [
        { label: 'bd', detail: 'bass drum', info: 'Bass drum sample' },
        { label: 'sd', detail: 'snare drum', info: 'Snare drum sample' },
        { label: 'cp', detail: 'clap', info: 'Clap sample' },
        { label: 'hh', detail: 'hi-hat closed', info: 'Closed hi-hat sample' },
        { label: 'oh', detail: 'hi-hat open', info: 'Open hi-hat sample' },
        { label: 'cr', detail: 'crash', info: 'Crash cymbal sample' },
        { label: 'ride', detail: 'ride cymbal', info: 'Ride cymbal sample' },
        { label: 'lt', detail: 'low tom', info: 'Low tom sample' },
        { label: 'mt', detail: 'mid tom', info: 'Mid tom sample' },
        { label: 'ht', detail: 'high tom', info: 'High tom sample' },
        { label: 'rim', detail: 'rimshot', info: 'Rimshot sample' },
        { label: 'rd', detail: 'ride', info: 'Ride cymbal' },
    ],

    // Effects
    effects: [
        { label: 'gain', detail: 'volume (0-1)', info: 'Set volume level. Example: .gain(0.8)' },
        { label: 'room', detail: 'reverb (0-1)', info: 'Add reverb/room effect. Example: .room(0.5)' },
        { label: 'delay', detail: 'delay (0-1)', info: 'Add delay effect. Example: .delay(0.25)' },
        { label: 'pan', detail: 'stereo (-1 to 1)', info: 'Pan left/right. Example: .pan(0.5)' },
        { label: 'lpf', detail: 'low-pass filter', info: 'Low-pass filter frequency. Example: .lpf(1000)' },
        { label: 'hpf', detail: 'high-pass filter', info: 'High-pass filter frequency. Example: .hpf(200)' },
        { label: 'lpq', detail: 'lpf resonance', info: 'Low-pass filter resonance' },
        { label: 'hpq', detail: 'hpf resonance', info: 'High-pass filter resonance' },
        { label: 'shape', detail: 'distortion (0-1)', info: 'Add distortion. Example: .shape(0.5)' },
        { label: 'crush', detail: 'bitcrush (1-16)', info: 'Bitcrusher effect. Example: .crush(4)' },
        { label: 'phaser', detail: 'phaser', info: 'Add phaser effect. Example: .phaser(4)' },
        { label: 'vowel', detail: 'vowel filter', info: 'Vowel formant filter' },
        { label: 'fm', detail: 'FM synthesis', info: 'Frequency modulation' },
        { label: 'am', detail: 'AM synthesis', info: 'Amplitude modulation' },
        { label: 'vib', detail: 'vibrato', info: 'Add vibrato. Example: .vib(5)' },
        { label: 'vibmod', detail: 'vibrato depth', info: 'Vibrato modulation depth' },
        { label: 'tremolo', detail: 'tremolo', info: 'Add tremolo effect' },
        { label: 'speed', detail: 'playback speed', info: 'Change sample speed. Example: .speed(0.5)' },
        { label: 'attack', detail: 'attack time', info: 'Envelope attack. Example: .attack(0.01)' },
        { label: 'release', detail: 'release time', info: 'Envelope release. Example: .release(0.2)' },
        { label: 'decay', detail: 'decay time', info: 'Envelope decay' },
        { label: 'sustain', detail: 'sustain level', info: 'Envelope sustain' },
        { label: 'bank', detail: 'sample bank', info: 'Select sample bank. Example: .bank("tr909")' },
        { label: 'cut', detail: 'cut group', info: 'Cut group for sample stopping' },
        { label: 'orbit', detail: 'audio orbit', info: 'Route to audio orbit' },
    ],

    // Pattern manipulation methods
    patternMethods: [
        { label: 'slow', detail: 'slow down', info: 'Slow pattern by factor. Example: .slow(2)' },
        { label: 'fast', detail: 'speed up', info: 'Speed up pattern by factor. Example: .fast(2)' },
        { label: 'hurry', detail: 'hurry pattern', info: 'Speed up without changing duration' },
        { label: 'rev', detail: 'reverse', info: 'Reverse pattern. Example: .rev()' },
        { label: 'iter', detail: 'iterate', info: 'Iterate through pattern subdivisions' },
        { label: 'ply', detail: 'repeat events', info: 'Repeat each event. Example: .ply(2)' },
        { label: 'every', detail: 'every nth', info: 'Apply function every n cycles. Example: .every(4, fast(2))' },
        { label: 'sometimes', detail: 'sometimes apply', info: 'Apply randomly 50% of the time' },
        { label: 'rarely', detail: 'rarely apply', info: 'Apply randomly 25% of the time' },
        { label: 'often', detail: 'often apply', info: 'Apply randomly 75% of the time' },
        { label: 'almostAlways', detail: 'almost always', info: 'Apply 90% of the time' },
        { label: 'struct', detail: 'structure', info: 'Apply rhythmic structure. Example: .struct("x ~ x ~")' },
        { label: 'mask', detail: 'mask pattern', info: 'Mask pattern with binary. Example: .mask("1 0 1 0")' },
        { label: 'euclid', detail: 'euclidean', info: 'Euclidean rhythm. Example: .euclid(3, 8)' },
        { label: 'when', detail: 'conditional', info: 'Apply when condition is true' },
        { label: 'off', detail: 'offset copy', info: 'Offset and layer. Example: .off(0.125, x=>x.gain(0.5))' },
        { label: 'jux', detail: 'juxtapose', info: 'Pan copies left/right' },
        { label: 'degrade', detail: 'random drop', info: 'Randomly drop events' },
        { label: 'chop', detail: 'chop sample', info: 'Chop sample into pieces' },
        { label: 'slice', detail: 'slice sample', info: 'Slice sample by index' },
        { label: 'range', detail: 'scale range', info: 'Scale values to range. Example: .range(0.5, 1)' },
        { label: 'segment', detail: 'segment', info: 'Segment pattern. Example: .segment(4)' },
        { label: 'chunk', detail: 'chunk pattern', info: 'Apply function to chunks' },
        { label: 'add', detail: 'add values', info: 'Add to pattern values' },
        { label: 'sub', detail: 'subtract', info: 'Subtract from pattern values' },
        { label: 'mul', detail: 'multiply', info: 'Multiply pattern values' },
        { label: 'div', detail: 'divide', info: 'Divide pattern values' },
        { label: 'set', detail: 'set values', info: 'Set pattern values' },
        { label: 'pick', detail: 'pick from list', info: 'Pick from list of patterns' },
        { label: 'pickRestart', detail: 'pick (restart)', info: 'Pick and restart. Example: .pickRestart({...})' },
        { label: 'pickOut', detail: 'pick and resolve', info: 'Pick and resolve from object' },
        { label: 'early', detail: 'shift early', info: 'Shift pattern earlier in time' },
        { label: 'late', detail: 'shift late', info: 'Shift pattern later in time' },
        { label: 'offset', detail: 'time offset', info: 'Offset pattern in time' },
    ],

    // Voicing/harmony
    harmonyFunctions: [
        { label: 'voicing', detail: 'voice chords', info: 'Apply chord voicing' },
        { label: 'anchor', detail: 'anchor note', info: 'Set anchor note. Example: .anchor("c3")' },
        { label: 'dict', detail: 'chord dictionary', info: 'Set chord dictionary. Example: .dict("ireal")' },
        { label: 'inversion', detail: 'chord inversion', info: 'Set chord inversion' },
    ],

    // Generators/modulators
    generators: [
        { label: 'sine', detail: 'sine wave', info: 'Sine wave modulator. Example: sine.range(0, 1)' },
        { label: 'saw', detail: 'saw wave', info: 'Sawtooth wave modulator' },
        { label: 'square', detail: 'square wave', info: 'Square wave modulator' },
        { label: 'tri', detail: 'triangle wave', info: 'Triangle wave modulator' },
        { label: 'rand', detail: 'random', info: 'Random values. Example: rand.range(0, 1)' },
        { label: 'irand', detail: 'random int', info: 'Random integers' },
        { label: 'perlin', detail: 'perlin noise', info: 'Smooth random. Example: perlin.range(0.5, 1)' },
        { label: 'time', detail: 'time value', info: 'Current time value' },
    ],

    // Keywords
    keywords: [
        { label: 'stack', detail: 'stack patterns', info: 'Layer multiple patterns. Example: stack(pat1, pat2)' },
        { label: 'all', detail: 'apply to all', info: 'Apply function to all patterns' },
        { label: 'setcps', detail: 'set tempo', info: 'Set cycles per second. Example: setcps(0.75)' },
        { label: 'setbpm', detail: 'set BPM', info: 'Set beats per minute. Example: setbpm(120)' },
        { label: 'samples', detail: 'load samples', info: 'Load external samples. Example: samples("github:user/repo")' },
        { label: 'setDefaultVoicings', detail: 'default voicings', info: 'Set default chord voicings' },
        { label: 'register', detail: 'register function', info: 'Register custom function' },
    ],

    // Common sample banks
    sampleBanks: [
        { label: 'RhodeChords', detail: 'sample bank', info: 'Rhodes electric piano chords' },
        { label: 'RolandTR808', detail: 'sample bank', info: 'Classic TR-808 drum machine' },
        { label: 'RolandTR909', detail: 'sample bank', info: 'Classic TR-909 drum machine' },
        { label: 'tr808', detail: 'sample bank', info: 'TR-808 drums' },
        { label: 'tr909', detail: 'sample bank', info: 'TR-909 drums' },
        { label: 'Linn9000', detail: 'sample bank', info: 'LinnDrum samples' },
        { label: 'RolandMT32', detail: 'sample bank', info: 'MT-32 samples' },
    ],
};

// Export for use
if (typeof module !== 'undefined') {
    module.exports = StrudelAutocomplete;
}
if (typeof window !== 'undefined') {
    window.StrudelAutocomplete = StrudelAutocomplete;
}