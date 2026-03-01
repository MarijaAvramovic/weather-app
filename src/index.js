import "./styles.css";

const API_KLJUC = "68Z86M7ZXLK98UL8VC3ZEWNRJ";

const pretraziBtn = document.getElementById("pretrazi-btn");
const gradInput = document.getElementById("grad-input");
const rezultatDiv = document.getElementById("rezultat");
const greskaDiv = document.getElementById("greska");
const loadingDiv = document.getElementById("loading");
const toggleBtn = document.getElementById("toggle-jedinica");

let trenutniPodaci = null;
let jeCelzijus = false;

async function dohvatiVreme(grad) {
  try {
    loadingDiv.classList.remove("hidden");
    greskaDiv.classList.add("hidden");
    rezultatDiv.classList.add("hidden");

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${grad}?key=${API_KLJUC}`;

    const odgovor = await fetch(url);

    if (!odgovor.ok) {
      throw new Error("Grad nije pronađen");
    }
    const podaci = await odgovor.json();
 
//    console.log(podaci);
   const prognoza = sacuvajPodatke(podaci);
       trenutniPodaci = prognoza;   //toggle
//    console.log(prognoza.city, prognoza.temperature);
 
   prikaziPodatke(prognoza, jeCelzijus)

  } catch (greska) {
    console.log(greska.message) 
     
  } 
  finally {
    loadingDiv.classList.add("hidden");
  }
}


 function sacuvajPodatke(podaci) {

  return {
    city: podaci.address,
    temperature: podaci.currentConditions.temp,
    humidity: podaci.currentConditions.humidity,
    windSpeed: podaci.currentConditions.windspeed,
    description: podaci.description
  };
}
 

 
   function prikaziPodatke(podaci, celzijus) {

    const temp = celzijus 
    ?  Math.round((podaci.temperature - 32) / 1.8)
    : Math.round(podaci.temperature) ;
 
 
  document.getElementById("lokacija").textContent = `${podaci.city}`;
 
  document.getElementById("opis").textContent = podaci.description;
  document.getElementById("temperatura").textContent =  `Temperatura: ${temp}°${celzijus ? 'C' : 'F'}`;;


  document.getElementById("vlaznost").textContent = `Vlažnost: ${podaci.humidity}%`;
  document.getElementById("vetar").textContent = `Vetar: ${podaci.windSpeed} m/s`;

  rezultatDiv.classList.remove("hidden");
  toggleBtn.textContent = celzijus ? "Promeni na °F" : "Promeni na °C";
  
}

 

 pretraziBtn.addEventListener("click", () => {
  const grad = gradInput.value.trim();
  if (grad) dohvatiVreme(grad);
});

gradInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const grad = gradInput.value.trim();
    if (grad) dohvatiVreme(grad);
  }
});
toggleBtn.addEventListener("click", () => {
  if (trenutniPodaci) {
    jeCelzijus = !jeCelzijus;
    prikaziPodatke(trenutniPodaci, jeCelzijus);
  }
});