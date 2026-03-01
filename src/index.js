import "./styles.css";

const API_KLJUC = "68Z86M7ZXLK98UL8VC3ZEWNRJ";

const pretraziBtn = document.getElementById("pretrazi-btn");
const gradInput = document.getElementById("grad-input");

let trenutniPodaci = null;

async function dohvatiVreme(grad) {
  try {
 
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${grad}?key=${API_KLJUC}`;

    const odgovor = await fetch(url);

    if (!odgovor.ok) {
      throw new Error("Grad nije pronađen");
    }
    const podaci = await odgovor.json();
   console.log(podaci);
   const prognoza = sacuvajPodatke(podaci);

   console.log(prognoza.city, prognoza.temperature);
 
   

  } catch (greska) {
    console.log(greska.message) 
     
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
 

 function prikaziPodatke(podaci) {
   

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