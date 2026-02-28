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
    console.log(podaci)

  } catch (greska) {
    console.log(greska.message) 
     
  } 
}
dohvatiVreme();