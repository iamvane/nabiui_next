export {}
declare global {
  interface Window { 
    analytics: any;
    __insp: any;
    __inspld: any;
  }
}

window.analytics = window.analytics || {};
window.__insp = window.__insp || {};
window.__inspld = window.__inspld || {};
