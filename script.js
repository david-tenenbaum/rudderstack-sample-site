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

function ju_callback(t, email, coupon) {
  if (email) {
    rudderanalytics.identify(email);
    rudderanalytics.track('form submission', {
      // promotion title and promotion cmid are available on the window object
      promotion_title: window.ju_promo_title,
      promotion_cmid: window.ju_show_campaign_id,
      // you can also add t + coupon data as well
      t: t,
      coupon: coupon,
    });
  }
}
