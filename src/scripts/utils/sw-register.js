const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in this browser");
    return null;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
      console.log("Unregistered existing service worker");
    }

    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("Service worker registered:", registration);

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

    return registration;
  } catch (err) {
    console.error("Service worker registration failed:", err);
    return null;
  }
};

export default registerServiceWorker;
