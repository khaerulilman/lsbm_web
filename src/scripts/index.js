import App from "./pages/app.js";
import registerServiceWorker from "./utils/sw-register.js";

const app = new App({
  content: document.getElementById("main-content"),
  drawerButton: document.getElementById("drawer-button"),
  navigationDrawer: document.getElementById("navigation-drawer"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();

  registerServiceWorker();

  if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("App launched from homescreen");
  }
});
