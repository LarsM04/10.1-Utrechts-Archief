// Het informatiekaartje bij een punt, met de afbeeldingen uit het archief

const kaartje = document.querySelector('#info-kaartje');
const infoKnop = document.querySelector('#info-knop');
const sluitKnop = document.querySelector('#info-sluiten');
const fotoVenster = document.querySelector('#foto-venster');

// De foto staat op twee plekken: klein in het kaartje en groot in het fotovenster
const fotos = document.querySelectorAll('[data-foto]');
const bijschriften = document.querySelectorAll('[data-bijschrift]');
const tellers = document.querySelectorAll('[data-teller]');
const kiezers = document.querySelectorAll('[data-kiezer]');

let punt;
let fotoNummer = 0;

function toonFoto(nummer) {
    const aantal = punt.afbeeldingen.length;

    // Na de laatste foto komt de eerste weer
    fotoNummer = (nummer + aantal) % aantal;
    const afbeelding = punt.afbeeldingen[fotoNummer];

    fotos.forEach((foto) => {
        foto.src = afbeelding.bestand;
        foto.alt = afbeelding.alt;
    });
    bijschriften.forEach((bijschrift) => {
        bijschrift.textContent = `${afbeelding.bijschrift} Bron: ${afbeelding.bron}`;
    });
    tellers.forEach((teller) => {
        teller.textContent = `${fotoNummer + 1} van ${aantal}`;
    });
    kiezers.forEach((kiezer) => {
        kiezer.hidden = aantal < 2;
    });
}

// Vult het kaartje met dit punt en laat het zien. Zonder punt verdwijnt het kaartje.
export function toonPunt(nieuwPunt) {
    punt = nieuwPunt;

    if (punt) {
        document.querySelector('#info-titel').textContent = punt.titel;
        document.querySelector('#info-tekst').textContent = punt.tekst;
        document.querySelector('#info-tekst').hidden = !punt.tekst;
        kaartje.classList.toggle('zonder-tekst', !punt.tekst);
        infoKnop.querySelector('.knop-tekst').textContent = `Info: ${punt.titel}`;
        toonFoto(0);
        kaartje.scrollTop = 0;
    }
    openInfo(Boolean(punt));
}

export function openInfo(open) {
    kaartje.hidden = !open;
    infoKnop.hidden = open || !punt;
}

export function sluitFoto() {
    fotoVenster.close();
}

sluitKnop.addEventListener('click', () => {
    openInfo(false);
    infoKnop.focus();
});

infoKnop.addEventListener('click', () => {
    openInfo(true);
    sluitKnop.focus();
});

document.querySelector('#foto-knop').addEventListener('click', () => fotoVenster.showModal());

document.querySelectorAll('[data-stap]').forEach((knop) => {
    knop.addEventListener('click', () => toonFoto(fotoNummer + Number(knop.dataset.stap)));
});
