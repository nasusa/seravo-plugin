document.addEventListener('DOMContentLoaded', function() {
  // Select all links in shadow drop-down
  var links = document.querySelectorAll('#wp-admin-bar-instance-switcher li > a');

  var listener = function(e){
    // Match all strings #something in the link targets.
    // Typically #exit or #abc123 (shadow ID).
    var instance = e.target.getAttribute('href').match(/#([a-z0-9]+)/)[1];
    if (instance === 'exit') {
      // If exit selected, clear cookies.
      e.preventDefault();
      document.cookie = "wpp_shadow=; Max-Age=0; Path=/";
      document.cookie = "seravo_shadow=; Max-Age=0; Path=/";
    } else if (instance.length === 6) {
      // If shadow selected, set cookies.
      e.preventDefault();
      // 43200 seconds is 12 hours
      document.cookie = "wpp_shadow=" + instance + "; Max-Age=43200; Path=/";
      document.cookie = "seravo_shadow=" + instance + "; Max-Age=43200; Path=/";
    }

    // Clean away potential old shadow query strings and reload page
    newloc = location.href.replace(/[a-z]+_shadow=[a-z0-9]+/, '')
    location.href = newloc;
  };
  var limit = links.length;
  for (var i = 0; i < limit; i++) {
    links[i].addEventListener('click', listener);
  }
});
