// Strudel Template Browser
'use strict';

// Simple template data
var templates = {
    sequencers: [
        {
            name: '16-Step Sequencer',
            description: 'Classic 16-step drum pattern',
            code: `s(\`
[-  -  -  -] [-  -  -  -]
[-  -  -  -] [-  -  -  -]
[-  -  -  -] [-  -  -  -]
[-  -  -  -] [-  -  -  -]
\`)`
        },
        {
            name: '8-Step Pattern',
            description: 'Simple 8-step pattern',
            code: 's("[-  -  -  -  -  -  -  -]")'
        }
    ],
    drums: [
        {
            name: 'Basic Drum Stack',
            description: 'Layered drum patterns',
            code: `$drums: stack(
  s(""),
  s(""),
  s("")
)`
        },
        {
            name: 'TR-808 Pattern',
            description: 'Classic 808 drums',
            code: 's("").bank("RolandTR808")'
        },
        {
            name: 'Euclidean Rhythm',
            description: 'Euclidean drum pattern',
            code: `stack(
  s("bd").euclid(3, 8),
  s("sd").euclid(5, 8),
  s("hh").euclid(7, 8)
)`
        }
    ],
    melodic: [
        {
            name: 'Basic Melody',
            description: 'Simple melody with scale',
            code: 'n("").scale("c4:minor").note().s("piano")'
        },
        {
            name: 'Chord Progression',
            description: 'Chord progression',
            code: 'chord("<>").voicing().slow(4).s("piano")'
        },
        {
            name: 'Arpeggio',
            description: 'Arpeggiated pattern',
            code: 'note("<>").arp("").s("piano")'
        }
    ],
    effects: [
        {
            name: 'Reverb & Delay',
            description: 'Atmospheric effects',
            code: '.room(0.8).delay(0.5).gain(0.7)'
        },
        {
            name: 'Filter Sweep',
            description: 'LPF modulation',
            code: '.lpf(sine.range(200, 2000).slow(4)).lpq(10)'
        },
        {
            name: 'Distortion Chain',
            description: 'Distortion and crush',
            code: '.shape(0.5).crush(4).gain(0.6)'
        }
    ],
    utilities: [
        {
            name: 'Set BPM',
            description: 'Set tempo in BPM',
            code: 'setbpm(120)'
        },
        {
            name: 'Set CPS',
            description: 'Set tempo in cycles/sec',
            code: 'setcps(0.75)'
        },
        {
            name: 'Load Samples',
            description: 'Load external samples',
            code: 'samples("github:username/repo")'
        },
        {
            name: 'Stack Template',
            description: 'Empty stack structure',
            code: `stack(
  
  
  
)`
        }
    ]
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    renderTemplates();
    setupSearch();
    setupSettings();
});

function renderTemplates() {
    for (var category in templates) {
        var items = templates[category];
        var container = document.querySelector('[data-category="' + category + '"]');

        if (!container) continue;

        for (var i = 0; i < items.length; i++) {
            addTemplateToContainer(container, items[i]);
        }
    }
}

function addTemplateToContainer(container, template) {
    var div = document.createElement('div');
    div.className = 'template-item';

    var nameDiv = document.createElement('div');
    nameDiv.className = 'template-name';
    nameDiv.textContent = template.name;

    var descDiv = document.createElement('div');
    descDiv.className = 'template-desc';
    descDiv.textContent = template.description;

    div.appendChild(nameDiv);
    div.appendChild(descDiv);

    div.onclick = function () {
        insertTemplate(template.code);
    };

    container.appendChild(div);
}

function setupSearch() {
    var searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function (e) {
        var query = e.target.value.toLowerCase();
        var items = document.querySelectorAll('.template-item');

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var name = item.querySelector('.template-name').textContent.toLowerCase();
            var desc = item.querySelector('.template-desc').textContent.toLowerCase();

            if (name.indexOf(query) !== -1 || desc.indexOf(query) !== -1) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });
}

function setupSettings() {
    var btn = document.getElementById('settings');
    btn.onclick = function () {
        alert('To add custom templates, edit popup.js in your extension folder!');
    };
}

function insertTemplate(code) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'insertTemplate',
            code: code
        }, function (response) {
            if (response && response.success) {
                window.close();
            }
        });
    });
}