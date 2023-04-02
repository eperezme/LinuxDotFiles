
function updateOSVis() {
  const isOsx = window.navigator.platform.includes('Mac');
  const isOther = !isOsx;
  Array
      .from(document.querySelectorAll('.vis-osx'))
      .forEach(el => el.classList.toggle('hidden', !isOsx));
  Array
      .from(document.querySelectorAll('.vis-os-other'))
      .forEach(el => el.classList.toggle('hidden', !isOther));
}
