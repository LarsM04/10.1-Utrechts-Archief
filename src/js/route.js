// De vaarroute: waar is de boot op welk moment in de film?

// Elke regel is [seconde in de film, lat, lng]. De plekken volgen het midden van
// de Oudegracht, de tijden zijn afgelezen aan de bruggen in de film.
export const ROUTE = [
    [0, 52.0882, 5.12153],
    [4, 52.08836, 5.12147],      // Hamburgerbrug
    [10, 52.08844, 5.12144],
    [29, 52.08875, 5.12131],
    [53.5, 52.08915, 5.12119],   // Gaardbrug
    [59.5, 52.08925, 5.12115],
    [76.2, 52.0895, 5.12102],
    [76.3, 52.08985, 5.12074],   // hier slaat de film een stukje over
    [86.5, 52.09002, 5.12059],
    [104.5, 52.09032, 5.12042],  // Maartensbrug
    [110, 52.09046, 5.12037],
    [123, 52.09076, 5.12026],    // Kalisbrug
    [135.3, 52.09099, 5.1202],
    [137, 52.09104, 5.12018],
    [137.1, 52.09112, 5.12014],  // hier slaat de film weer een stukje over
    [148, 52.09129, 5.12001],
    [156, 52.09141, 5.11986],    // Stadhuisbrug
    [182.8, 52.09166, 5.11942],
];

// Geeft de plek van de boot als [lat, lng]. Tussen twee regels van de route wordt
// de plek uitgerekend: halverwege in de tijd is halverwege op de kaart.
export function plekOpTijd(tijd) {
    const volgende = ROUTE.findIndex(([seconde]) => seconde > tijd);

    if (volgende === -1) {
        return ROUTE.at(-1).slice(1);
    }
    if (volgende === 0) {
        return ROUTE[0].slice(1);
    }

    const [tijdA, latA, lngA] = ROUTE[volgende - 1];
    const [tijdB, latB, lngB] = ROUTE[volgende];
    const deel = (tijd - tijdA) / (tijdB - tijdA);

    return [latA + (latB - latA) * deel, lngA + (lngB - lngA) * deel];
}

// Geeft het laatste punt waar de boot langs is gekomen, of undefined als er nog geen is.
// De punten moeten op tijd gesorteerd zijn.
export function puntOpTijd(punten, tijd) {
    return punten.findLast((punt) => punt.tijd <= tijd);
}
