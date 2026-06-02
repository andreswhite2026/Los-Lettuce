import { navigateTo } from "../router/router";

export const dashboardPage = (app) => {
  app.innerHTML = `
<body>
  <div id="app">
    <div class="flex p-5 bg-slate-900">
      <form id="saveForm" class="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 text-gray-50">
        <div class="flex flex-col col-span-1">
          <label for="fullname">Full Name</label>
          <input id="fullname" class="border border-slate-200 w-full rounded-md py-1 px-2" type="text"
            placeholder="Jhon Doe">
        </div>
        <div class="flex flex-col col-span-1">
          <label for="identification">Identification</label>
          <input id="identification" name="identification" class="border border-slate-200 w-full rounded-md py-1 px-2"
            type="text" placeholder="Jhon Doe">
        </div>
        <div class="flex flex-col col-span-1">
          <label for="birthdate">Birthdate</label>
          <input id="birthdate" name="birthdate" class="border border-slate-200 w-full rounded-md py-1 px-2" type="date"
            placeholder="Jhon Doe">
        </div>
        <div class="flex flex-col col-span-1 md:col-span-3">
          <label for="photo">Photo</label>
          <input id="photo" name="photo" class="border border-slate-200 rounded-md py-1 px-2" type="text">
        </div>
        <div class="flex flex-col col-span-1 md:col-span-3">
          <label for="description">Description</label>
          <textarea class="border border-slate-200 rounded-md py-1 px-2" name="description" id="description"></textarea>
        </div>
        <div class="flex flex-col items-end col-span-1 md:col-span-3">
          <button
            class="w-full md:w-32 bg-emerald-700 hover:bg-emerald-400 hover:text-slate-900 py-2 rounded-md cursor-pointer shadow-sm shadow-zinc-500">Save</button>
        </div>
      </form>
    </div>
    <div class="flex p-5 bg-slate-800 h-full text-gray-50">
      <div id="data" class="w-full p-3 text-center grid grid-cols-4 gap-8">
        
      </div>
    </div>
  </div>
</body> 
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

  const dataContainer = document.getElementById("data");

  dataContainer.innerHTML = "";

  data.forEach((element) => {
    const { fullname, photo, identification, description, birthdate } = element;

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

  const data = {
    fullname,
    identification,
    birthdate,
    photo,
    description
  };

  await postData(data);

  await renderData(); // ← refresca las tarjetas

  console.log("Guardado correctamente");
  });
};