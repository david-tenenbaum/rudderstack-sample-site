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
  // The t arguement will point to the justuno event id.
  // Below is the justuno event Id <> name mapping
  // Justuno Docs: justuno doc: https://support.justuno.com/en/passing-information-from-justuno-popup-to-your-site
  // You can rename these events if desired
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
    22: 'Engagement - Product Click Through',
    23: 'Engagement - SMS Click',
  };

  if (email) {
    rudderanalytics.identify(email);
  }

  if (eventNameMap[t]) {
    rudderanalytics.track(eventNameMap[t], {
      // promotion title and promotion cmid are available on the window object
      promotion_title: window.ju_promo_title,
      promotion_cmid: window.ju_show_campaign_id,
      coupon: coupon,
    });
  }
}

const iframes = document.querySelectorAll('iframe');

function handleLazyLoad() {
  for (const iframe of iframes) {
    if (iframe.classList.contains('shogun-video-embed')) {
      iframe.classList.replace('shogun-lazyloaded', 'lazyload');
      let storeSRC = iframe.dataset.src;

      iframe.addEventListener('lazybeforeunveil', () => {
        delete iframe.dataset.src;
        iframe.src = storeSRC;
        initPlayer(iframe);
      });
    }
  }
}

function initPlayer(iframe) {
  console.log(iframe);
  const player = new Vimeo.Player(iframe);
  console.log(player);
  let videoTitle;
  let videoId;
  player.ready().then(function () {
    player.getVideoTitle().then(function (title) {
      videoTitle = title;
    });
    player.getVideoId().then(function (id) {
      videoId = id;
    });
    player.on('play', function (data) {
      console.log(data);
      rudderanalytics.track('Video Play', {
        videoTitle: videoTitle,
        videoId: videoId,
        seconds: data.seconds,
        percent: data.percent,
        duration: data.duration,
      });
    });
    player.on('pause', function (data) {
      console.log(data);
      rudderanalytics.track('Video Pause', {
        videoTitle: videoTitle,
        videoId: videoId,
        seconds: data.seconds,
        percent: data.percent,
        duration: data.duration,
      });
    });
    player.on('ended', function (data) {
      console.log(data);
      rudderanalytics.track('Video Ended', {
        videoTitle: videoTitle,
        videoId: videoId,
        seconds: data.seconds,
        percent: data.percent,
        duration: data.duration,
      });
    });
    // The player is ready
  });
}

handleLazyLoad();

// "use strict";

// function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
// function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
// function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// var iframes = document.querySelectorAll('iframe');
// function handleLazyLoad() {
//   var _iterator = _createForOfIteratorHelper(iframes),
//     _step;
//   try {
//     var _loop = function _loop() {
//       var iframe = _step.value;
//       if (iframe.classList.contains('shogun-video-embed')) {
//         iframe.classList.replace('shogun-lazyloaded', 'lazyload');
//         var storeSRC = iframe.dataset.src;
//         iframe.addEventListener('lazybeforeunveil', function () {
//           delete iframe.dataset.src;
//           iframe.src = storeSRC;
//           initPlayer(iframe);
//         });
//       }
//     };
//     for (_iterator.s(); !(_step = _iterator.n()).done;) {
//       _loop();
//     }
//   } catch (err) {
//     _iterator.e(err);
//   } finally {
//     _iterator.f();
//   }
// }
// function initPlayer(iframe) {
//   console.log(iframe);
//   var player = new Vimeo.Player(iframe);
//   console.log(player);
//   var videoTitle;
//   var videoId;
//   player.ready().then(function () {
//     player.getVideoTitle().then(function (title) {
//       videoTitle = title;
//     });
//     player.getVideoId().then(function (id) {
//       videoId = id;
//     });
//     player.on('play', function (data) {
//       console.log(data);
//       rudderanalytics.track('Video Play', {
//         videoTitle: videoTitle,
//         videoId: videoId,
//         seconds: data.seconds,
//         percent: data.percent,
//         duration: data.duration
//       });
//     });
//     player.on('pause', function (data) {
//       console.log(data);
//       rudderanalytics.track('Video Pause', {
//         videoTitle: videoTitle,
//         videoId: videoId,
//         seconds: data.seconds,
//         percent: data.percent,
//         duration: data.duration
//       });
//     });
//     player.on('ended', function (data) {
//       console.log(data);
//       rudderanalytics.track('Video Ended', {
//         videoTitle: videoTitle,
//         videoId: videoId,
//         seconds: data.seconds,
//         percent: data.percent,
//         duration: data.duration
//       });
//     });
//     // The player is ready
//   });
// }

// handleLazyLoad();
