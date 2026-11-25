// De kaart met de vaarroute, de punten en het bootje. Leaflet staat in lib/leaflet.
// De vormen op de kaart staan in data/kaart.json en krijgen hun kleur in de CSS.
import { ROUTE, plekOpTijd } from './route.js';

// Verder uitgezoomd dan dit vallen de punten over elkaar heen
const KLEINSTE_ZOOM = 16.7;

// Zo lang (in milliseconden) blijft de kaart staan nadat de bezoeker hem heeft versleept
const WACHT_NA_SLEPEN = 8000;

const BOOT_SVG = `
    <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="#d72f19" stroke="#fff" stroke-width="5"/>
        <path d="M14 37h36l-6 11H20z" fill="#fff"/>
        <path d="M30 14v20H18zM34 18v16h12z" fill="#fff"/>
    </svg>`;

function tekenVormen(kaart, vormen) {
    L.geoJSON(vormen, {
        interactive: false,
        style: ({ properties }) => ({
            className: `kaart-${properties.soort}`,
            weight: 1,
            fillOpacity: 1,
        }),
        onEachFeature({ properties }, laag) {
            if (properties.naam) {
                laag.bindTooltip(properties.naam, { permanent: true, direction: 'right', offset: [12, 0], className: 'kaart-naam' });
            }
        },
    }).addTo(kaart);
}

// De bruggen (1, 2, 3) staan rechts van het water en de plekken ertussen (1a, 1b) links.
// Zo vallen punten die dicht bij elkaar liggen niet over elkaar.
function maakPunt(punt, bijKiezen) {
    const kant = /[a-z]/.test(punt.nummer) ? 'links' : 'rechts';

    const naam = document.createElement('span');
    naam.className = 'punt-naam';
    naam.textContent = punt.titel;

    const inhoud = document.createElement('span');
    inhoud.append(punt.nummer, ' ', naam);

    const marker = L.marker([punt.lat, punt.lng], {
        icon: L.divIcon({ className: `kaart-punt ${kant}`, html: inhoud, iconSize: null }),
    });
    marker.on('click', () => bijKiezen(punt));
    marker.on('add', () => {
        const knop = marker.getElement();
        knop.ariaLabel = `${punt.nummer} ${punt.titel}, vaar hierheen`;
        // Leaflet laat een punt niet met het toetsenbord bedienen
        knop.addEventListener('keydown', (toets) => {
            if (toets.key === 'Enter' || toets.key === ' ') {
                toets.preventDefault();
                bijKiezen(punt);
            }
        });
    });

    return marker;
}

export function maakKaart(element, vormen, punten, bijKiezen) {
    const kaart = L.map(element, { zoomSnap: 0, zoomDelta: 0.5, maxZoom: 20, zoomControl: false, inertia: false, maxBoundsViscosity: 1 });
    const lijn = ROUTE.map(([, lat, lng]) => [lat, lng]);
    const gebied = L.latLngBounds(lijn).extend(punten.map((punt) => [punt.lat, punt.lng]));

    // Laat de hele route zien. Is het vak daar te klein voor, dan volgt de kaart het bootje.
    function toonAlles() {
        const rand = 2.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        kaart.invalidateSize({ animate: false });
        kaart.setMinZoom(0);
        kaart.fitBounds(gebied, { padding: [rand, rand], animate: false });
        kaart.setMinZoom(kaart.getZoom());
        kaart.setZoom(Math.max(kaart.getZoom(), KLEINSTE_ZOOM), { animate: false });
    }

    toonAlles();
    new ResizeObserver(toonAlles).observe(element);

    // Verder weg slepen kan niet, zodat niemand de route kwijtraakt
    kaart.setMaxBounds(gebied.pad(0.6));

    L.control.zoom({ position: 'bottomleft', zoomInTitle: 'Kaart inzoomen', zoomOutTitle: 'Kaart uitzoomen' }).addTo(kaart);

    // Geen links in de kaart: op het digibord zou de bezoeker de applicatie verlaten
    kaart.attributionControl.setPrefix(false).addAttribution('© OpenStreetMap-bijdragers');

    tekenVormen(kaart, vormen);
    L.polyline(lijn, { className: 'kaart-route', weight: 5, interactive: false }).addTo(kaart);
    const gevaren = L.polyline([], { className: 'kaart-gevaren', weight: 6, interactive: false }).addTo(kaart);

    const markers = punten.map((punt) => maakPunt(punt, bijKiezen).addTo(kaart));

    const boot = L.marker(lijn[0], {
        icon: L.divIcon({ className: 'kaart-boot', html: BOOT_SVG, iconSize: null }),
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000,
    }).addTo(kaart);

    let volgenVanaf = 0;
    kaart.on('dragstart', () => {
        volgenVanaf = Date.now() + WACHT_NA_SLEPEN;
    });

    return {
        // Zet het bootje op de plek van deze tijd, kleurt het gevaren stuk en laat de kaart meelopen
        zetBoot(tijd) {
            const plek = plekOpTijd(tijd);

            boot.setLatLng(plek);
            gevaren.setLatLngs([...lijn.filter((_, i) => ROUTE[i][0] < tijd), plek]);
            if (Date.now() > volgenVanaf) {
                kaart.panInside(plek, { padding: [40, 40] });
            }
        },

        // Laat het bootje vloeiend naar een nieuwe plek varen in plaats van springen
        laatVaren() {
            boot.getElement().classList.add('vaart');
            setTimeout(() => boot.getElement().classList.remove('vaart'), 800);
            volgenVanaf = 0;
        },

        // Geeft het punt waar de boot nu is een andere kleur
        zetActief(actiefPunt) {
            markers.forEach((marker, i) => {
                const actief = punten[i] === actiefPunt;
                marker.getElement().classList.toggle('actief', actief);
                marker.getElement().ariaCurrent = actief ? 'true' : null;
                marker.setZIndexOffset(actief ? 500 : 0);
            });
        },
    };
}
