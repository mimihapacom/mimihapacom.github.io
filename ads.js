(function() {
  var smartlink  = 'https://www.profitablecpmratenetwork.com/w1c3wnsqfa?key=525638d321bbdc8e5810becd2bb14e72';
  var MAX_DAILY  = 3;   // max fires per day
  var DELAY_MS   = 150; // ms before page navigates

  // domains to SKIP (won't fire ad before these links)
  var skipDomains = ['google.com','facebook.com','twitter.com',
                     'whatsapp.com','t.me','youtube.com'];

  function getCount() {
    try {
      var d = JSON.parse(localStorage.getItem('sl_data') || '{}');
      var today = new Date().toDateString();
      if (d.date !== today) return 0;
      return d.count || 0;
    } catch(e) { return 0; }
  }

  function setCount(n) {
    try {
      localStorage.setItem('sl_data', JSON.stringify({
        date: new Date().toDateString(),
        count: n
      }));
    } catch(e) {}
  }

  function shouldSkip(href) {
    if (!href || href === '#') return true;
    if (href.startsWith('javascript')) return true;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return true;
    for (var i = 0; i < skipDomains.length; i++) {
      if (href.includes(skipDomains[i])) return true;
    }
    return false;
  }

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (shouldSkip(href)) return;

    e.preventDefault();

    var count = getCount();
    if (count < MAX_DAILY) {
      setCount(count + 1);
      window.open(smartlink, '_blank');
    }

    setTimeout(function() {
      window.location.href = href;
    }, DELAY_MS);
  });
})();
