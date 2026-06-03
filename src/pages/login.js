import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user";

export const loginPage = (app) => {
  app.innerHTML = `
  <div class="min-h-screen flex items-center justify-center bg-[#0b1220] px-4">

    <div class="w-full max-w-md bg-[#0f172a]/80 border border-[#1f2a44] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

      <h1 class="text-3xl font-semibold text-center text-white tracking-wide">Welcome back</h1>
      <p class="text-center text-slate-400 mt-2 mb-8 text-sm">Sign in to continue</p>

      <form id="form" class="space-y-4">

        <input id="email" type="email" placeholder="Email"
          class="w-full p-3 rounded-lg bg-[#0b1220] border border-[#22304d] text-white placeholder-slate-500 focus:outline-none focus:border-slate-400">

        <input id="password" type="password" placeholder="Password"
          class="w-full p-3 rounded-lg bg-[#0b1220] border border-[#22304d] text-white placeholder-slate-500 focus:outline-none focus:border-slate-400">

        <button class="w-full bg-slate-200 hover:bg-white text-black font-medium p-3 rounded-lg transition">
          Sign in
        </button>

      </form>

      <p id="msg" class="text-center mt-4 text-sm"></p>

      <p class="text-center mt-6 text-slate-400 text-sm">
        No account?
        <span id="goRegister" class="text-slate-200 hover:text-white cursor-pointer underline underline-offset-4">
          Create one
        </span>
      </p>

    </div>

  </div>
  `;

  document.querySelector("#goRegister").onclick = () => {
    navigateTo("/register");
  };

  document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    const res = await fetch(API);
    const users = await res.json();

    const user = users.find(u => u.email === email && u.password === password);

    const msg = document.querySelector("#msg");

    if (!user) {
      msg.textContent = "Invalid credentials";
      msg.className = "text-center mt-4 text-red-400 text-sm";
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    msg.textContent = "Success";
    msg.className = "text-center mt-4 text-green-400 text-sm";

    setTimeout(() => {
      if (user.role === "admin") {
        navigateTo("/admin");
      } else {
        navigateTo("/dashboard");
      }
    }, 500);
  });
};