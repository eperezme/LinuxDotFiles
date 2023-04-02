
class ActivityLogger {
  constructor() {
    // No-op.
  }

  isGALoaded_() {
    return (typeof ga != 'undefined');
  }

  logPage() {
    if (_TCAP_CONFIG.devDebug) {
      console.log('ActivityLogger.logPage()');
    }

    if (!this.isGALoaded_()) {
      return;
    }

    // Log the pageview.
    let pageUrl = `/${_TCAP_CONFIG.versionText}/` + window.location.pathname + window.location.search;
    pageUrl = pageUrl.replace(/\/+/g, '/');

    ga('send', 'pageview', pageUrl);
  }

  logEvent(event, context) {
    if (_TCAP_CONFIG.devDebug) {
      console.log('ActivityLogger.logEvent()', event);
    }

    if (!this.isGALoaded_()) {
      return;
    }

    context = context || {};
    ga('send', {
      hitType: 'event',
      eventCategory: 'usage',
      eventAction: event,
      eventLabel: JSON.stringify(context),
    });
  }
}
