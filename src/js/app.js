// Ontmoet de Oudegracht: de film, de punten en de vensters
import { openInfo, sluitFoto, toonPunt } from './info.js';
import { maakKaart } from './kaart.js';
import { puntOpTijd } from './route.js';

const PUNTEN_URL = 'data/punten.json';
const KAART_URL = 'data/kaart.json';
const SPRONG = 10; // seconden terug of vooruit
const WACHTTIJD = 90; // seconden zonder aanraking tot de wachtstand

const film = document.querySelector('#film');
const melding = document.querySelector('#melding');
const speelKnop = document.querySelector('#speel-knop');
const tijdlijn = document.querySelector('#tijdlijn');
const tijdTekst = document.querySelector('#tijd');
const tijdlijnPunten = document.querySelector('#tijdlijn-punten');
const startscherm = document.querySelector('#startscherm');
const colofon = document.querySelector('#colofon');
const wachtstand = document.querySelector('#wachtstand');

let punten = [];
let kaart;
let huidigPunt;
let vorigeTijd = -1;
let laatsteActie = Date.now();

// --- Film ---

function vaarNaar(tijd) {
    film.currentTime = Math.min(Math.max(tijd, 0), film.duration || 0);
    kaart.laatVaren();
}

function speel() {
    film.play().catch(() => {}); // lukt het niet, dan blijft de knop op Afspelen staan
}

function wisselSpelen() {
    if (film.paused) {
        speel();
    } else {
        film.pause();
    }
}

function toonSpeelKnop() {
    speelKnop.classList.toggle('speelt', !film.paused);
    speelKnop.querySelector('.knop-tekst').textContent = film.paused ? 'Afspelen' : 'Pauze';
}

function tijdInWoorden(tijd) {
    return `${Math.floor(tijd / 60)} minuten en ${Math.floor(tijd % 60)} seconden`;
}

function tijdInCijfers(tijd) {
    return `${Math.floor(tijd / 60)}:${String(Math.floor(tijd % 60)).padStart(2, '0')}`;
}

function toonFout(tekst) {
    melding.textContent = tekst;
    melding.hidden = false;
}

// --- Elk beeld bijwerken ---

function werkBij() {
    const tijd = film.currentTime;

    if (tijd !== vorigeTijd) {
        vorigeTijd = tijd;
        kaart.zetBoot(tijd);
        tijdlijn.value = tijd;
        tijdlijn.parentElement.style.setProperty('--deel', `${(tijd / tijdlijn.max) * 100}%`);
        tijdTekst.textContent = tijdInCijfers(tijd);

        const punt = puntOpTijd(punten, tijd);
        if (punt !== huidigPunt) {
            huidigPunt = punt;
            kaart.zetActief(punt);
            toonPunt(punt);
        }
        tijdlijn.ariaValueText = tijdInWoorden(tijd) + (punt ? `, bij ${punt.titel}` : '');
    }
    requestAnimationFrame(werkBij);
}

function zetPuntenOpTijdlijn() {
    tijdlijn.max = film.duration;
    tijdlijnPunten.replaceChildren(...punten.map((punt) => {
        const streepje = document.createElement('span');
        streepje.style.left = `${(punt.tijd / film.duration) * 100}%`;
        return streepje;
    }));
}

// --- Knoppen ---

function koppelKnoppen() {
    document.querySelector('#terug-knop').addEventListener('click', () => vaarNaar(film.currentTime - SPRONG));
    document.querySelector('#vooruit-knop').addEventListener('click', () => vaarNaar(film.currentTime + SPRONG));
    speelKnop.addEventListener('click', wisselSpelen);
    film.addEventListener('click', wisselSpelen);
    tijdlijn.addEventListener('input', () => {
        film.currentTime = tijdlijn.value;
    });

    document.querySelector('#colofon-knop').addEventListener('click', () => colofon.showModal());
}

// --- Gegevens en schermen ---

async function haalJson(url, foutTekst) {
    try {
        const antwoord = await fetch(url);
        if (!antwoord.ok) {
            throw new Error(`status ${antwoord.status}`);
        }
        return await antwoord.json();
    } catch (fout) {
        console.error(fout);
        toonFout(foutTekst);
        return [];
    }
}

// Op de achtergrond speelt de film steeds opnieuw, behalve als de bezoeker weinig beweging wil
function speelOpAchtergrond() {
    film.loop = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        film.pause();
    } else {
        speel();
    }
}

function toonStartscherm() {
    startscherm.showModal();
    speelOpAchtergrond();
}

function begin() {
    // Het startscherm sluit ook als de wachtstand begint
    if (wachtstand.open) {
        return;
    }
    film.loop = false;
    vaarNaar(0);
    speel();
}

// --- Wachtstand ---

function startWachtstand() {
    wachtstand.showModal();
    startscherm.close();
    colofon.close();
    sluitFoto();
    vaarNaar(0);
    speelOpAchtergrond();
}

// Wie rustig naar de film kijkt, raakt het scherm niet aan. Daarom telt de tijd alleen
// als de film stilstaat of als er nog een venster openstaat.
function controleerWachttijd() {
    const kijkt = !film.paused && !document.querySelector('dialog[open]');

    if (kijkt) {
        laatsteActie = Date.now();
    } else if (!wachtstand.open && Date.now() - laatsteActie > WACHTTIJD * 1000) {
        startWachtstand();
    }
}

function onthoudActie() {
    laatsteActie = Date.now();
}

// --- Alles starten ---

async function start() {
    film.addEventListener('play', toonSpeelKnop);
    film.addEventListener('pause', toonSpeelKnop);
    film.addEventListener('error', () => toonFout('De film kan niet worden geladen.'));
    if (film.error) {
        toonFout('De film kan niet worden geladen.');
    }
    startscherm.addEventListener('close', begin);
    wachtstand.addEventListener('close', toonStartscherm);

    punten = await haalJson(PUNTEN_URL, 'De informatie bij de punten kan niet worden geladen.');
    punten.sort((a, b) => a.tijd - b.tijd);
    const vormen = await haalJson(KAART_URL, 'De kaart kan niet worden geladen.');

    kaart = maakKaart(document.querySelector('#kaart'), vormen, punten, (punt) => {
        vaarNaar(punt.tijd);
        openInfo(true);
    });
    koppelKnoppen();

    if (film.readyState >= HTMLMediaElement.HAVE_METADATA) {
        zetPuntenOpTijdlijn();
    } else {
        film.addEventListener('loadedmetadata', zetPuntenOpTijdlijn);
    }
    werkBij();
    toonStartscherm();

    document.addEventListener('pointerdown', onthoudActie);
    document.addEventListener('keydown', onthoudActie);
    setInterval(controleerWachttijd, 1000);
}

start();
