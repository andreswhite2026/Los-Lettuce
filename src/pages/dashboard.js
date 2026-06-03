import { navigateTo } from "../router/router";

export const dashboardPage = (app) => {
  app.innerHTML = `
<div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
  <div id="app">
    <div class="max-w-6xl mx-auto">

      <div class="relative mb-8">

        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-2">
            Coder Dashboard
          </h1>
          <p class="text-slate-400">
            Manage coders quickly and easily
          </p>
        </div>

        <button
          id="logoutBtn"
          class="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold transition"
        >
          Log Out
        </button>

      </div>

      <!-- FORM -->
      <div class="flex p-6 bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl mb-8">
        <form id="saveForm" class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-gray-50">

          <div class="flex flex-col col-span-1">
            <label for="fullname" class="mb-2 font-medium">Full Name</label>
            <input id="fullname" class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white" type="text">
          </div>

          <div class="flex flex-col col-span-1">
            <label for="identification" class="mb-2 font-medium">Identification</label>
            <input id="identification" class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white" type="text">
          </div>

          <div class="flex flex-col col-span-1">
            <label for="birthdate" class="mb-2 font-medium">Birthdate</label>
            <input id="birthdate" class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white" type="date">
          </div>

          <div class="flex flex-col col-span-1 md:col-span-3">
            <label for="photo" class="mb-2 font-medium">Photo</label>
            <input id="photo" class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white" type="text">
          </div>

          <div class="flex flex-col col-span-1 md:col-span-3">
            <label for="description" class="mb-2 font-medium">Description</label>
            <textarea id="description" class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white"></textarea>
          </div>

          <div class="col-span-1 md:col-span-3 flex justify-end">
            <button class="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-bold">
              Save
            </button>
          </div>

        </form>
      </div>

      <!-- SUPERHIPERMEGABUSCADOR -->
      <div class="mb-6">
        <input
          type="text"
          id="searchInput"
          placeholder="Search coders..."
          class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <!-- DATA -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl text-gray-50">
        <div id="data" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"></div>
      </div>

    </div>
  </div>
</div>
`;

  const API = "http://localhost:3000/coders";
  let allCoders = [];

  async function postData(data) {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  async function renderData() {
    const response = await fetch(API);
    const data = await response.json();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    allCoders = data;

    const myCoders = data.filter(
      coder => coder.userId === currentUser.id
    );

    const container = document.getElementById("data");

    container.innerHTML = "";

    myCoders.forEach((element) => {
      container.innerHTML += `
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col items-center">

          <h2 class="text-xl font-bold mb-2 text-center w-full">
            ${element.fullname}
          </h2>

          <div class="w-full h-40 bg-slate-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            <img
              src="${element.photo}"
              alt="${element.fullname}"
              class="max-h-full max-w-full object-contain"
            >
          </div>

          <p class="text-sm text-slate-300 w-full text-left">
            ID: ${element.identification}
          </p>

          <p class="text-sm text-slate-300 w-full text-left">
            Birth: ${element.birthdate}
          </p>

          <p class="text-sm mt-2 w-full text-center">
            ${element.description}
          </p>

        </div>
      `;
    });
  }

  renderData();

  document.getElementById("searchInput").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const filtered = allCoders.filter(coder =>
      coder.userId === currentUser.id &&
      (
        coder.fullname.toLowerCase().includes(value) ||
        coder.identification.toLowerCase().includes(value)
      )
    );

    const container = document.getElementById("data");

    container.innerHTML = "";

    filtered.forEach((element) => {
      container.innerHTML += `
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col items-center">

          <h2 class="text-xl font-bold mb-2 text-center w-full">
            ${element.fullname}
          </h2>

          <div class="w-full h-40 bg-slate-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            <img
              src="${element.photo}"
              alt="${element.fullname}"
              class="max-h-full max-w-full object-contain"
            >
          </div>

          <p class="text-sm text-slate-300 w-full text-left">
            ID: ${element.identification}
          </p>

          <p class="text-sm text-slate-300 w-full text-left">
            Birth: ${element.birthdate}
          </p>

          <p class="text-sm mt-2 w-full text-left">
            ${element.description}
          </p>

        </div>
      `;
    });
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    const confirmLogout = confirm("¿Deseas cerrar sesión?");

    if (confirmLogout) {
      localStorage.removeItem("user");
      navigateTo("/");
    }
  });

  document.getElementById("saveForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const data = {
      fullname: document.getElementById("fullname").value,
      identification: document.getElementById("identification").value,
      birthdate: document.getElementById("birthdate").value,
      photo: document.getElementById("photo").value,
      description: document.getElementById("description").value,
      userId: currentUser.id,
      createdBy: currentUser.name
    };

    await postData(data);
    await renderData();

    console.log("Guardado correctamente");
  });
};