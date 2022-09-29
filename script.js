let keys = document.querySelectorAll('[data-type="key"]');

trackKeyClick();

function trackKeyClick() {
  for (let key of keys) {
    let note = key.getAttribute('data-key');
    key.addEventListener('click', function () {
      rudderanalytics.track('Key Click', {
        key: {
          note: note,
          sharp: note[1] === 's',
        },
      });
    });
  }
}

// function waitForElm(selector) {
//     return new Promise(resolve => {
//         if (document.querySelector(selector)) {
//             return resolve(document.querySelector(selector));
//         }

//         const observer = new MutationObserver(mutations => {
//             if (document.querySelector(selector)) {
//                 resolve(document.querySelector(selector));
//                 observer.disconnect();
//             }
//         });

//         observer.observe(document.body, {
//             childList: true,
//             subtree: true
//         });
//     });
// }

// waitForElm('iframe[id^="ju_iframe_"]').then((elm) => {
//     window.addEventListener('message', (event) => {
//         if (event.data.email) {
//             rudderanalytics.identify(event.data.email);
//             rudderanalytics.track('form submission', {
//                 promotion_name: elm.name,
//                 prompromotion_title: elm.title,
//             });
//         }
//     });
// });

// function ju_callback(t,email,coupon){
//     console.log('test: ', t,email,coupon);
// }

window.juapp =
  window.juapp ||
  function () {
    (window.juapp.q = window.juapp.q || []).push(arguments);
  };

juapp(
  'trackFunc',
  '[impression|engagement|conversion]',
  function (email, eventname, promotitle, cmid, options, form) {
    console.log(email);
    console.log(eventname);
    console.log(promotitle);
    console.log(cmid);
    console.log(options);
    console.log(form);

    if (email) {
      rudderanalytics.identify(email);
      rudderanalytics.track('form submission', {
        promotitle: promotitle,
        cmid: cmid,
      });
    }
  }
);
