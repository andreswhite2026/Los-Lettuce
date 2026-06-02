import { navigateTo } from "../router/router";

const API_EVENTS = "http://localhost:3000/events";

export const dashboardPage = async (app) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigateTo("/");
    return;
  }

  const res = await fetch(API_EVENTS);
  const events = await res.json();

  app.innerHTML = `
  <div class="min-h-screen bg-slate-900 text-white">

    <div class="p-4 flex justify-between bg-slate-800">

      <h1>Dashboard</h1>

      <div>
        ${user.role === "admin"
          ? `<button id="adminBtn" class="bg-yellow-500 px-3">Admin</button>`
          : ""
        }

        <button id="logout" class="bg-red-500 px-3">Logout</button>
      </div>

    </div>

    <div class="p-6">

      <h2 class="text-xl mb-4">Events</h2>

      ${events.map(e => `
        <div class="bg-slate-800 p-3 mb-2 rounded">
          <p>${e.name}</p>
          <p>${e.date}</p>
          <p>${e.venue}</p>
        </div>
      `).join("")}

    </div>

  </div>
  `;

  document.querySelector("#logout").onclick = () => {
    localStorage.removeItem("user");
    navigateTo("/");
  };

  const btn = document.querySelector("#adminBtn");
  if (btn) btn.onclick = () => navigateTo("/admin");
};