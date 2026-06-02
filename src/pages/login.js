import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user";

export const loginPage = (app) => {
  app.innerHTML = `
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
    <div class="bg-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl">

      <h1 class="text-3xl font-bold text-white mb-4 text-center">
        USER LOGIN
      </h1>

      <form id="formulation">

        <input
          type="email"
          id="inputGmail"
          placeholder="Enter your Gmail"
          required
          class="w-full p-3 mb-4 rounded-xl bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          id="inputPassword"
          placeholder="Enter your Password"
          required
          class="w-full p-3 mb-4 rounded-xl bg-slate-700 text-white outline-none"
        />

        <div class="flex justify-center gap-4">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
          >
            Login
          </button>

          <a href="/register">
            Registrate
          </a>
        </div>

      </form>

      <div id="mensaje" class="mt-4 text-center text-white"></div>

    </div>
  </div>
  `;

  const form = document.querySelector("#formulation");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#inputGmail").value;
    const password = document.querySelector("#inputPassword").value;

    try {
      const res = await fetch(API);
      const users = await res.json();

      const userFound = users.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      if (userFound) {
        document.querySelector("#mensaje").textContent =
          "Inicio de sesión correcto";

        setTimeout(() => {
          navigateTo("/dashboard");
        }, 1000);
      } else {
        document.querySelector("#mensaje").textContent =
          "Correo o contraseña incorrectos";
      }
    } catch (error) {
      document.querySelector("#mensaje").textContent =
        "Error al iniciar sesión";
      console.error(error);
    }
  });
};