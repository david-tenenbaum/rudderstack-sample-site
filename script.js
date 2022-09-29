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

waitForElm('iframe[title="RS_TEST_82522"]').then((elm) => {
    window.addEventListener('message', (event) => {
        if (event.data) {
            console.log('t: ', t);
            console.log('coupon: ', coupon);
            console.log('User Email (from global window): ', event.data.email);
            rudderanalytics.identify(event.data.email);
        }
    });
});

