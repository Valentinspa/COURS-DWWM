
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function acceptCookies() {
  setCookie('cookie_consent', 'accepted', 365);
  document.getElementById('cookie-banner').style.display = 'none';
}

function declineCookies() {
  setCookie('cookie_consent', 'declined', 365);
  document.getElementById('cookie-banner').style.display = 'none';
}

// Afficher le bandeau si aucun choix n’a été fait
if (!getCookie('cookie_consent')) {
  document.getElementById('cookie-banner').style.display = 'block';
}