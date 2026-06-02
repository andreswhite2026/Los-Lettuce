import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user";

export const loginPage = (app) => {

  app.innerHTML = `
  <div class="min-h-screen bg-slate-950 flex items-center justify-center">

    <div class="bg-slate-900 p-8 rounded-xl w-[400px] text-white">

      <h1 class="text-3xl mb-6 text-center">LOGIN</h1>

      <form id="form">

        <input id="email" type="email" placeholder="Email"
          class="w-full p-3 mb-3 text-black rounded">

        <input id="password" type="password" placeholder="Password"
          class="w-full p-3 mb-3 text-black rounded">

        <button class="w-full bg-yellow-500 p-3 rounded">
          Login
        </button>

      </form>

      <p id="msg" class="text-center mt-3"></p>

    </div>

  </div>
  `;

  document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const res = await fetch(API);
    const users = await res.json();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      document.querySelector("#msg").textContent = "Error login";
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    navigateTo("/dashboard");
  });
};