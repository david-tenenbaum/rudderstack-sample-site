let keys = document.querySelectorAll('[data-type="key"]');

trackKeyClick();

function trackKeyClick() {
    for (let key of keys) {
        let note = key.getAttribute('data-key');
        key.addEventListener('click', function() {
            rudderanalytics.track('Key Click', {
                key: note
            });
        })
    }
}