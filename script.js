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
  const eventNameMap = {
    1: 'Facebook',
    2: 'Google Plus',
    3: 'Twitter TWeet',
    5: 'LinkedIn Share',
    6: 'Twitter Follow',
    7: 'Pinterest Follow',
    8: 'Instagram Follow',
    9: 'Youtube Subscribe',
    10: 'Incentivized Form (any form integration submission)',
    11: 'VK Follow',
    12: 'Reddit Subscribe',
    13: 'Google Follow',
    14: 'LinkedIn Follow',
    15: 'Intro Continue Click',
    16: 'Unlocked Click',
    17: 'Engagement - Unlocked View',
    18: 'Engagement - Plugin',
    19: 'Engagement - Push Notification Subscribe',
    20: 'Engagement - Facebook Messenger Opt In',
    21: 'Engagement - Item Added to Cart',
    22: ' Engagement - Product Click Through',
    23: 'Engagement - SMS Click',
  };

  if (email) {
    rudderanalytics.identify(email);
    rudderanalytics.track(eventNameMap[t], {
      // promotion title and promotion cmid are available on the window object
      promotion_title: window.ju_promo_title,
      promotion_cmid: window.ju_show_campaign_id,
      coupon: coupon,
    });
  }
}
