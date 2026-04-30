export function trackEvent(name, data) {
  if (typeof window === "undefined" || !window.umami?.track) return;

  window.umami.track(name, data);
}
