import "./style.css";
import { router } from "./router/router.js";

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("popstate", router);

window.addEventListener("popstate", (event) => {
  console.log("El usuario ha cambiado de página en el historial");

  if (event.state) {
    console.log("Estado restaurado:", event.state);
  }
});