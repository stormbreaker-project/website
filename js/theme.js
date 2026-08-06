// Theme toggle. The initial theme is applied pre-paint by the inline
// snippet in <head>; this only handles the click + persistence.
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('sb-theme', next); } catch (e) {}
  });
})();
