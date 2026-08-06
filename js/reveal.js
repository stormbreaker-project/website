// Reveal elements on scroll + stamp the current year in the footer.
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i % 6 * 60) + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
