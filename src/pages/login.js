import { navigateTo } from "../router/router";

const API = "http://localhost:3000/user"

export const loginPage = (app) => {
  app.innerHTML = `
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
  <div class="bg-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl">
    
    <h1 class="text-3xl font-bold text-white mb-2 text-center">
      USER LOGIN
    </h1>
  <form id="formulation">
    <div class="flex gap-2 mb-4">
      <input
        type="email"
        id="inputGmail"
        placeholder="Enter your Gmail"
        required
        class="flex-1 p-3 rounded-xl bg-slate-700 text-white outline-none flex
        "/>
    </div>
    <div class="flex gap-2 mb-4">
      <input
        type="password"
        id="inputPassword"
        placeholder="Enter your Password"
        required
        class="flex-1 p-3 rounded-xl bg-slate-700 text-white outline-none"/>
    </div>
    <div class="flex justify-center">
      <button
        id="loginBtn"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl hover:cursor-pointer"
      >
        Login
      </button>
      <div>
      
      <a href="register">Registrate</a>
      
      </div>
    </div>
    </div>
  </form>

    <div
      id="mensaje"
      class="mb-4 text-center font-semibold"
    ></div>
  

  </div>
</div>
`;

  document
    .querySelector("#formulation")
    .addEventListener("submit", () => {
      navigateTo("/dashboard");
    });
};



//      <button id="loginBtn">
//       Entrar
//      </button>