
function localizePage() {
  const msgPrefix = '__MSG__';

  function getMessageFromTemplate(template, defaultVal= "") {
    return template.replace(/__MSG_(\w+)__/g, (match, v1) => {
      return v1 ? chrome.i18n.getMessage(v1) : defaultVal;
    });
  }

  function updatePageTitle() {
    if (document.title.startsWith(msgPrefix)) {
      // NOTE(gmike): Weird and hopefully noticeable default val.
      document.title = getMessageFromTemplate(document.title, "Table Capture!");
    }
  }

  updatePageTitle();
  Array
      .from(document.querySelectorAll('._tc18n'))
      .forEach(el => {
        el.innerText = getMessageFromTemplate(el.innerText);
      });
}

document.addEventListener('DOMContentLoaded', localizePage);
