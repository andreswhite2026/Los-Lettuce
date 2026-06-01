import { loginPage } from "../pages/login";
import { dashboardPage } from "../pages/dashboard";
import { adminPage } from "../pages/admin";
import { registerPage } from "../pages/register";

const routes = {
  "/": loginPage,
  "/dashboard": dashboardPage,
  "/admin": adminPage,
  "/register": registerPage,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = async () => {
  const app = document.querySelector("#app");

  const path = window.location.pathname;

  const page = routes[path];

  if (!page) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  await page(app);
};