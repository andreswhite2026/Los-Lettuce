import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user";

export const registerPage = (app) => {
  app.innerHTML = `
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
    <div class="bg-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl">

      <h1 class="text-3xl font-bold text-white mb-4 text-center">
        LOGIN
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

        <div class="flex justify-center">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
          >
            Login
          </button>
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

    const userData = {
      email,
      password
    };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!res.ok) throw new Error("Error al guardar usuario");

      const data = await res.json();

      document.querySelector("#mensaje").textContent =
        "Usuario guardado correctamente";

      setTimeout(() => {
        navigateTo("/dashboard");
      }, 1000);

    } catch (error) {
      document.querySelector("#mensaje").textContent =
        "Error al registrar usuario";
    }
  });
};