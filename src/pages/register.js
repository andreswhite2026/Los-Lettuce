import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user";

export const registerPage = (app) => {
  app.innerHTML = `
  <div class="min-h-screen flex items-center justify-center bg-[#0b1220] px-4">

    <div class="w-full max-w-md bg-[#0f172a]/80 border border-[#1f2a44] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

      <h1 class="text-3xl font-semibold text-center text-white tracking-wide">Create account</h1>
      <p class="text-center text-slate-400 mt-2 mb-8 text-sm">Start your journey</p>

      <form id="form" class="space-y-4">

        <input id="name" type="text" placeholder="Full name"
          class="w-full p-3 rounded-lg bg-[#0b1220] border border-[#22304d] text-white placeholder-slate-500 focus:outline-none focus:border-slate-400">

        <input id="email" type="email" placeholder="Email"
          class="w-full p-3 rounded-lg bg-[#0b1220] border border-[#22304d] text-white placeholder-slate-500 focus:outline-none focus:border-slate-400">

        <input id="password" type="password" placeholder="Password"
          class="w-full p-3 rounded-lg bg-[#0b1220] border border-[#22304d] text-white placeholder-slate-500 focus:outline-none focus:border-slate-400">

        <input id="confirmPassword" type="password" placeholder="Confirm password"
          class="w-full p-3 rounded-lg bg-[#0b1220] border border-[#22304d] text-white placeholder-slate-500 focus:outline-none focus:border-slate-400">

        <select id="role" 
          class="w-full p-3 rounded-lg bg-[#0b1220] border border-[#22304d] text-white focus:outline-none focus:border-slate-400">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button class="w-full bg-slate-200 hover:bg-white text-black font-medium p-3 rounded-lg transition">
          Create account
        </button>

      </form>

      <p id="msg" class="text-center mt-4 text-sm"></p>

      <p class="text-center mt-6 text-slate-400 text-sm">
        Already have an account?
        <span id="goLogin" class="text-slate-200 hover:text-white cursor-pointer underline underline-offset-4">
          Sign in
        </span>
      </p>

    </div>

  </div>
  `;

  document.querySelector("#goLogin").onclick = () => {
    navigateTo("/");
  };

  document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const role = document.querySelector("#role").value;  

    const msg = document.querySelector("#msg");

    if (!name || !email || !password || !confirmPassword) {
      msg.textContent = "All fields required";
      msg.className = "text-center mt-4 text-red-400 text-sm";
      return;
    }

    if (password !== confirmPassword) {
      msg.textContent = "Passwords do not match";
      msg.className = "text-center mt-4 text-red-400 text-sm";
      return;
    }

    const res = await fetch(API);
    const users = await res.json();

    if (users.find((u) => u.email === email)) {
      msg.textContent = "Email already exists";
      msg.className = "text-center mt-4 text-red-400 text-sm";
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role: role,
      }),
    });

    msg.textContent = "Account created";
    msg.className = "text-center mt-4 text-green-400 text-sm";

    setTimeout(() => navigateTo("/"), 600);
  });
};
