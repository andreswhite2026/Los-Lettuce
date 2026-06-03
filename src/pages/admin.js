import { navigateTo } from "../router/router";

const API = "http://localhost:3000/coders";

let allCoders = [];
let editingId = null;

export const adminPage = (app) => {
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white">

      <!-- HEADER -->
      <header class="max-w-6xl mx-auto flex justify-between items-center mb-6">

        <div>
          <h1 class="text-3xl font-bold">Admin Panel</h1>
          <p class="text-slate-400 text-sm">Manage all coders</p>
        </div>

        <button id="logoutBtn"
          class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition">
          Logout
        </button>

      </header>

      <!-- ADD BUTTON -->
      <div class="max-w-6xl mx-auto mb-6">
        <button id="openFormBtn"
          class="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded">
          + Add Coders
        </button>
      </div>

      <!-- SEARCH -->
      <section class="max-w-6xl mx-auto mb-6">
        <input
          type="text"
          id="searchInput"
          placeholder="Search coders..."
          class="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </section>

      <!-- CARDS -->
      <main class="max-w-6xl mx-auto">
        <div id="adminData" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </main>

      <!-- MODAL FORM -->
      <div id="formModal" class="hidden fixed inset-0 bg-black/60 flex items-center justify-center">

        <form id="coderForm" class="bg-slate-800 p-6 rounded-xl w-full max-w-lg grid gap-3">

          <input id="fullname" placeholder="Fullname" class="p-2 rounded bg-slate-900">
          <input id="identification" placeholder="Identification" class="p-2 rounded bg-slate-900">
          <input id="birthdate" type="date" class="p-2 rounded bg-slate-900">

          <input id="photo" placeholder="Photo URL" class="p-2 rounded bg-slate-900">
          <textarea id="description" placeholder="Description" class="p-2 rounded bg-slate-900"></textarea>

          <button id="submitBtn" class="bg-cyan-600 hover:bg-cyan-500 p-2 rounded">
            Create 
          </button>

          <button type="button" id="closeFormBtn" class="bg-red-500 p-2 rounded">
            Cancel
          </button>

        </form>

      </div>

    </div>
  `;


  document.getElementById("logoutBtn").addEventListener("click", () => {
    const confirmLogout = confirm("¿Deseas cerrar sesión?");

    if (confirmLogout) {
      console.log("cerrando sesión");
      localStorage.removeItem("user");
      navigateTo("/");
    }
  });


  const modal = document.getElementById("formModal");

  document.getElementById("openFormBtn").onclick = () => {
    editingId = null;
    document.getElementById("coderForm").reset();
    document.getElementById("submitBtn").textContent = "Create ";
    modal.classList.remove("hidden");
  };

  document.getElementById("closeFormBtn").onclick = () => {
    modal.classList.add("hidden");
  };

  document.getElementById("coderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      fullname: document.getElementById("fullname").value,
      identification: document.getElementById("identification").value,
      birthdate: document.getElementById("birthdate").value,
      photo: document.getElementById("photo").value,
      description: document.getElementById("description").value
    };

    if (editingId) {

      let original = allCoders.find(c => c.id === editingId);

      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...original,         
          ...data               
        })
      });

      console.log("Actualizado correctamente");

      editingId = null;
      document.getElementById("submitBtn").textContent = "Create ";

    } else {

      const currentUser = JSON.parse(localStorage.getItem("user"));

      data.createdBy = currentUser.name;

      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      console.log("Creado correctamente");
    }

    e.target.reset();
    modal.classList.add("hidden");
    loadAllCoders();
  });

  loadAllCoders();
  setupDelete();
  setupEdit();

  document.getElementById("searchInput").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allCoders.filter(coder =>
    coder.fullname.toLowerCase().includes(value) ||
    coder.identification.toLowerCase().includes(value) ||
    coder.createdBy.toLowerCase().includes(value)
  );

  renderCoders(filtered);
});
};


async function loadAllCoders() {
  const response = await fetch(API);
  const data = await response.json();

  allCoders = data;
  renderCoders(allCoders);
}


function renderCoders(coders) {
  const container = document.getElementById("adminData");

  container.innerHTML = "";

  coders.forEach(coder => {
    const {
      id,
      fullname,
      photo,
      identification,
      birthdate,
      description,
      createdBy
    } = coder;

    container.innerHTML += `
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col items-center">

        <h2 class="text-xl font-bold mb-2 text-center w-full">
          ${fullname}
        </h2>

        <div class="w-full h-40 bg-slate-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          <img src="${photo}" class="max-h-full max-w-full object-contain">
        </div>

        <p class="text-sm text-slate-300 w-full text-left">ID: ${identification}</p>
        <p class="text-sm text-slate-300 w-full text-left">Birth: ${birthdate}</p>

        <p class="text-sm text-slate-400 mt-2 w-full text-left">
          Created by: <span class="text-cyan-400">${createdBy}</span>
        </p>

        <p class="text-sm mt-2 w-full text-left">
          ${description}
        </p>

        <div class="flex gap-2 mt-4 justify-center w-full">

          <button class="editBtn bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
            data-id="${id}">
            Edit
          </button>

          <button class="deleteBtn bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            data-id="${id}">
            Delete
          </button>

        </div>

      </div>
    `;
  });
}


function setupDelete() {
  const container = document.getElementById("adminData");

  container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deleteBtn")) {

      const id = e.target.dataset.id;

      const confirmDelete = confirm("¿Seguro que deseas eliminar esta tarjeta?");

      if (!confirmDelete) return;

      await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      console.log(`Coder ${id} eliminado`);

      loadAllCoders();
    }
  });
}


function setupEdit() {
  const container = document.getElementById("adminData");
  const modal = document.getElementById("formModal");

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("editBtn")) {

      const id = e.target.dataset.id;

      const coder = allCoders.find(c => c.id === id);
      if (!coder) return;

      editingId = id;

      document.getElementById("fullname").value = coder.fullname;
      document.getElementById("identification").value = coder.identification;
      document.getElementById("birthdate").value = coder.birthdate;
      document.getElementById("photo").value = coder.photo;
      document.getElementById("description").value = coder.description;

      document.getElementById("submitBtn").textContent = "Update 🔄";

      modal.classList.remove("hidden");
    }
  });
}