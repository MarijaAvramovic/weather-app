import "./styles.css";

const API_KLJUC = "68Z86M7ZXLK98UL8VC3ZEWNRJ";

let trenutniPodaci = null;

async function dohvatiVreme() {
  try {
 
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=${API_KLJUC}`;

    const odgovor = await fetch(url);

    if (!odgovor.ok) {
      throw new Error("Grad nije pronađen");
    }
    const podaci = await odgovor.json();
   console.log(podaci);
   const prognoza = sacuvajPodatke(podaci);

   console.log(prognoza.city);
   prikaziPodatke(podaci);
   

  } catch (greska) {
    console.log(greska.message) 
     
  } 
}
 dohvatiVreme() 

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