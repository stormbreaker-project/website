// Header behaviour — shadow on scroll + mobile dropdown toggle.
(function () {
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  // Nav dropdowns (Community, …). CSS handles hover on desktop; this adds
  // click/keyboard toggling for touch + accessibility.
  var dropdowns = document.querySelectorAll('.has-dropdown');
  function closeDropdowns(except) {
    dropdowns.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('open');
      var t = item.querySelector('.dropdown-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  dropdowns.forEach(function (item) {
    var trigger = item.querySelector('.dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var open = !item.classList.contains('open');
      closeDropdowns(item);
      item.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) closeDropdowns(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDropdowns(null);
  });
})();
