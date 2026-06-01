import { navigateTo } from "../router/router";

export const dashboardPage = (app) => {
  app.innerHTML = `
    <!-- HEADER -->
    <header class="sticky top-0 bg-black flex justify-between items-center p-4 z-50">

      <h1 class="text-3xl font-bold leading-none text-white">
        Arctic
        <span class="block text-[wheat] italic -mt-2">
          Monkeys
        </span>
      </h1>  
           <!-- BUTTON ADMIN -->
      <div class="p-6">
        <button id="adminBtn" class="hover:cursor-pointer rounded-2xl hover:bg-slate-500 bg-slate-400 text-black px-4 py-2">
          Admin
        </button>
      </div>
    </header>

    <main>

      <!-- HERO -->
      <section
        class="h-150 bg-center bg-cover flex items-center justify-center"
        style="background-image:url('https://i0.wp.com/knobstudio.com.mx/wp-content/uploads/2018/04/artic-monkeys.jpg');"
      >
        <div class="text-center text-white px-4">

          <h2 class="text-4xl font-bold">
            I'm too busy being yours to fall for somebody new
          </h2>

          <p class="mt-2">Do I Wanna Know?</p>

          <button class="hover:cursor-pointer mt-4 px-5 py-2 bg-[#c49b63] text-black hover:bg-[#a67c52] transition">
            Buy ticket
          </button>

        </div>
      </section>
      <!-- SCHEDULE -->
      <section class="bg-neutral-900 p-10 text-white">

        <h2 class="text-center text-3xl font-bold mb-6">Schedule</h2>

        <table class="bg-neutral-900 w-full border border-gray-400">
          <thead>
            <tr class="bg-[#c49b63] text-black">
              <th class="border p-3">Event dates</th>
              <th class="p-3">Event venues</th>
              <th class="p-3">Members</th>
            </tr>
          </thead>

          <tbody class="border-gray-800">
            <tr>
              <td class="border p-3">March 17</td>
              <td class="border p-3">The Grapes (Sheffield)</td>
              <td class="border p-3">Alex Turner</td>
            </tr>

            <tr>
              <td class="border p-3">April 23</td>
              <td class="border p-3">Mexico</td>
              <td class="border p-3">Matt Helders</td>
            </tr>

            <tr>
              <td class="border p-3">August 3</td>
              <td class="border p-3">Colombia</td>
              <td class="border p-3">Jamie Cook</td>
            </tr>
          </tbody>

        </table>

      </section>

      <!-- ABOUT -->
      <section class="bg-gray-700 p-10 text-white">

        <h2 class="text-3xl font-bold mb-4">
          About the Arctic Monkeys
        </h2>

        <p>
          Arctic Monkeys formed in 2002 in Sheffield, England, out of a school friendship between Alex Turner and Jamie Cook, who began playing music together. Matt Helders and Andy Nicholson joined shortly thereafter, they were high school classmates and the band solidified its lineup through intense rehearsals and by sharing demos online.
        </p>

      </section>

      <!-- GALLERY -->
      <section class="bg-black p-10 text-white">

        <h2 class="text-3xl font-bold mb-6">Gallery</h2>

        <div class="grid grid-cols-3 gap-3">

          <img class="w-full rounded" src="https://caracoltv.brightspotcdn.com/dims4/default/c8cb385/2147483647/strip/true/crop/914x513+0+0/resize/568x319!/quality/75/?url=https%3A%2F%2Fcaracol-brightspot.s3.us-west-2.amazonaws.com%2Fac%2F16%2F40f163d64aa6a733638b553a5ee6%2Fartic-monkeys.png">

          <img class="w-full rounded" src="https://www.rockandpop.cl/wp-content/uploads/2023/01/arctic-monkeys-discografia-1.jpg">

          <img class="w-full rounded" src="https://estaticos-cdn.prensaiberica.es/clip/22669e65-6d18-408b-bdbf-51f32e59f0de_16-9-aspect-ratio_default_0.jpg">

        </div>

      </section>

    </main>

    <!-- FOOTER -->
    <footer class="bg-black text-center p-5 text-white">
      © 2026 The best rock in the world
    </footer>
  `;

  // SOLO ESTO (sin errores)
  document.querySelector("#adminBtn").addEventListener("click", () => {
    navigateTo("/admin");
  });
};