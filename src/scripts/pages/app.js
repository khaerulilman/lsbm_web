// pages/app.js
import routes from "../routes/routes";
import { getActiveRoute, parseActivePathname } from "../routes/url-parser";

class App {
  constructor({ content }) {
    this.content = content;
  }

  async renderPage() {
    const activeRoute = getActiveRoute();
    const routeConfig = routes[activeRoute];

    if (!routeConfig) {
      this.content.innerHTML = `<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 text-center">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <div class="text-9xl font-bold text-indigo-600">404</div>
        <h1 class="text-3xl font-bold text-gray-800">Oops! Page Not Found</h1>
        <p class="text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="pt-4">
          <a href="/" class="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  `;
      return;
    }

    if (routeConfig.check && !routeConfig.check()) {
      return;
    }

    try {
      const page = routeConfig.page;
      const urlParams = parseActivePathname();

      if (document.startViewTransition) {
        document.startViewTransition(async () => {
          this.content.innerHTML = await page.render(urlParams);
          await page.afterRender(urlParams);
        });
      } else {
        this.content.innerHTML = await page.render(urlParams);
        await page.afterRender(urlParams);
      }
    } catch (error) {
      console.error("Error rendering page:", error);
      this.content.innerHTML = "<p>Error loading page</p>";
    }
  }
}

export default App;
