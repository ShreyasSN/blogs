(function(){
  var STORAGE_KEY = 'hux-dark-theme';
  var body = document.body;
  var themeIconLink = document.querySelector('.theme-icon a');
  var themeIconElement = document.querySelector('.theme-icon i');

  function applyTheme(dark) {
    if (dark) {
      body.classList.add('dark-theme');
      if (themeIconElement) {
        themeIconElement.classList.remove('fa-moon-o');
        themeIconElement.classList.add('fa-sun-o');
        // accessibility
        if (themeIconLink) themeIconLink.setAttribute('aria-pressed', 'true');
      }
    } else {
      body.classList.remove('dark-theme');
      if (themeIconElement) {
        themeIconElement.classList.remove('fa-sun-o');
        themeIconElement.classList.add('fa-moon-o');
        // accessibility
        if (themeIconLink) themeIconLink.setAttribute('aria-pressed', 'false');
      }
    }
  }

  function save(dark) {
    try { localStorage.setItem(STORAGE_KEY, dark ? '1' : '0'); } catch (e) { }
  }

  function load() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return null; }
  }

  function init() {
    // apply saved preference if available
    var saved = load();
    if (saved !== null) {
      applyTheme(saved);
    } else {
      // Respect prefers-color-scheme if no saved preference
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark);
    }

    if (themeIconLink) {
      themeIconLink.addEventListener('click', function (e) {
        e.preventDefault();
        var isDark = body.classList.contains('dark-theme');
        applyTheme(!isDark);
        save(!isDark);
      }, false);

      // support keyboard activation (Enter / Space)
      themeIconLink.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          var isDark = body.classList.contains('dark-theme');
          applyTheme(!isDark);
          save(!isDark);
        }
      }, false);
    }
  }

  // Initialize on DOMContentLoaded or immediately if already ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
