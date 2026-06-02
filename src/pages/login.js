import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user";

export const loginPage = (app) => {
  app.innerHTML = `
  <div class="min-h-screen overflow-hidden flex items-center justify-center relative">

    <div class="absolute inset-0 bg-[linear-gradient(135deg,#24003f_0%,#5d133f_35%,#35206d_70%,#9fb1e8_100%)]"></div>

    <div class="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-600  blur-[180px]"></div>

    <div class="absolute top-[10%] right-[-120px] w-[450px] h-[450px] rounded-full bg-fuchsia-500 blur-[180px]"></div>

    <div class="absolute bottom-[-180px] right-[10%] w-[550px] h-[550px] rounded-full bg-amber-950 blur-[220px]"></div>

    <div class="relative w-full max-w-sm rounded-[35px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl px-10 py-8">

      <div class="flex justify-center mb-8">
        <div class="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-14 h-14 text-white/60" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-2.673 0-8 1.34-8 4v1h16v-1c0-2.66-5.327-4-8-4z"/>
          </svg>
        </div>
      </div>

      <h1 class="text-center text-white text-2xl font-semibold mb-8">
        USER LOGIN
      </h1>

      <form id="formulation">

        <input
          type="email"
          id="inputGmail"
          placeholder="Email ID"
          required
          class="w-full bg-transparent border-b border-white/30 pb-3 mb-7 text-white placeholder:text-white/50 focus:outline-none"
        />

        <input
          type="password"
          id="inputPassword"
          placeholder="Password"
          required
          class="w-full bg-transparent border-b border-white/30 pb-3 mb-5 text-white placeholder:text-white/50 focus:outline-none"
        />

        <div class="flex justify-between items-center text-xs text-white/60 mb-8">
          <label class="flex items-center gap-2">
          <span>😁👉</span>
            <input type="checkbox" class="accent-white">
            Remember me
          </label>

          <a href="#" class="hover:text-white transition">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          class="w-full h-11 rounded-lg bg-gradient-to-r from-[#4a0036] via-[#6935a8] to-blue-500 text-white font-medium tracking-widest shadow-lg hover:opacity-90 transition"
        >
          LOGIN
        </button>

        <a
          href="/register"
          class="block text-center text-white/80 hover:text-white mt-5"
        >
          Registrate
        </a>

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

