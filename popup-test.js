// Minimal test
alert('Popup JS loaded!');

document.addEventListener('DOMContentLoaded', function () {
    alert('DOM loaded!');

    // Add a test template manually
    var container = document.querySelector('[data-category="sequencers"]');
    if (container) {
        var div = document.createElement('div');
        div.className = 'template-item';
        div.innerHTML = '<div class="template-name">TEST TEMPLATE</div><div class="template-desc">If you see this, JS is working!</div>';
        container.appendChild(div);
    }
});