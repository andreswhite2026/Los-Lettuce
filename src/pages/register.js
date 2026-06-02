import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user";

export const registerPage = (app) => {
  app.innerHTML = `
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
    <div class="bg-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl">

      <h1 class="text-3xl font-bold text-white mb-4 text-center">
        REGISTER
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
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
          >
            Register
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

    try {
      // Verificar si el correo ya existe
      const checkRes = await fetch(`${API}?email=${email}`);
      const existingUser = await checkRes.json();

      if (existingUser.length > 0) {
        document.querySelector("#mensaje").textContent =
          "Este correo ya está registrado";
        return;
      }

      const newUser = {
        email,
        password
      };

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) {
        throw new Error("Error al registrar");
      }

      document.querySelector("#mensaje").textContent =
        "Usuario registrado correctamente";

      setTimeout(() => {
        navigateTo("/");
      }, 1000);

    } catch (error) {
      document.querySelector("#mensaje").textContent =
        "Error al registrar usuario";

      console.error(error);
    }
  });
};