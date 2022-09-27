let keys = document.querySelectorAll('[data-type="key"]');

trackKeyClick();

function trackKeyClick() {
    for (let key of keys) {
        let note = key.getAttribute('data-key');
        key.addEventListener('click', function() {
            rudderanalytics.track('Key Click', {
                key: {
                    note: note,
                    sharp: note[1] === 's',
                }
            });
        })
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('#ju_iframe_849165').then((elm) => {
    console.log('Element is ready');
    console.log(elm);
    window.addEventListener('message', (event) => {
        console.log('From website: ', event.data);
    });
});

