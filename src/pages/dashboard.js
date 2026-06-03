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

      <div class="flex p-6 bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl mb-8">
        <form id="saveForm" class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-gray-50">

          <div class="flex flex-col col-span-1">
            <label for="fullname" class="mb-2 font-medium">Full Name</label>
            <input
              id="fullname"
              class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              placeholder="John Doe"
            >
          </div>

          <div class="flex flex-col col-span-1">
            <label for="identification" class="mb-2 font-medium">Identification</label>
            <input
              id="identification"
              name="identification"
              class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              placeholder="123456789"
            >
          </div>

          <div class="flex flex-col col-span-1">
            <label for="birthdate" class="mb-2 font-medium">Birthdate</label>
            <input
              id="birthdate"
              name="birthdate"
              class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="date"
            >
          </div>

          <div class="flex flex-col col-span-1 md:col-span-3">
            <label for="photo" class="mb-2 font-medium">Photo</label>
            <input
              id="photo"
              name="photo"
              class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              placeholder="https://..."
            >
          </div>

          <div class="flex flex-col col-span-1 md:col-span-3">
            <label for="description" class="mb-2 font-medium">Description</label>
            <textarea
              class="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="description"
              id="description"
              rows="4"
              placeholder="Write a description..."
            ></textarea>
          </div>

          <div class="flex flex-col items-end col-span-1 md:col-span-3">
            <button
              class="w-full md:w-40 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-3 rounded-xl font-bold text-white cursor-pointer transition-all duration-300 shadow-lg shadow-cyan-900"
            >
              Save 
            </button>
          </div>

        </form>
      </div>

      <div class="flex p-5 bg-slate-800/50 border border-slate-700 rounded-2xl text-gray-50">
        <div id="data" class="w-full p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        </div>
      </div>

    </div>
  </div>
</div>
`;

async function postData(data) {
  const response = await fetch("http://localhost:3000/coders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function renderData() {
  const response = await fetch("http://localhost:3000/coders");
  const data = await response.json();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const myCoders = data.filter(
    coder => coder.userId === currentUser.id
  );

  const dataContainer = document.getElementById("data");

  dataContainer.innerHTML = "";

  myCoders.forEach((element) => {
    const {
      fullname,
      photo,
      identification,
      description,
      birthdate
    } = element;

    dataContainer.innerHTML += `
      <div class="bg-purple-400/80 flex flex-col items-center justify-center text-gray-200 rounded-md shadow-md p-3">
        <h1 class="font-bold text-2xl">${fullname}</h1>
        <img class="rounded-md w-100" src="${photo}" alt="${fullname}">
        <span>${identification}</span>
        <span>${birthdate}</span>
        <p>${description}</p>
      </div>
    `;
  });
}

renderData();

document.getElementById("logoutBtn").addEventListener("click", () => {
  const confirmLogout = confirm("¿Deseas cerrar sesión?");

  if (confirmLogout) {
    localStorage.removeItem("user");
    navigateTo("/");
  }
});

const form = document.getElementById("saveForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const identification = document.getElementById("identification").value;
  const birthdate = document.getElementById("birthdate").value;
  const photo = document.getElementById("photo").value;
  const description = document.getElementById("description").value;

  if (!fullname || !identification || !birthdate || !photo || !description) {
    alert("Todos los campos son requeridos!");
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const data = {
    fullname,
    identification,
    birthdate,
    photo,
    description,
    userId: currentUser.id,
    createdBy: currentUser.name
  };

  await postData(data);

  await renderData(); 

  console.log("Guardado correctamente");
  });
};