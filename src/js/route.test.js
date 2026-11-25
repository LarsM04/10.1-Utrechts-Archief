// Test van de vaarroute. Uitvoeren met: node src/js/route.test.js
import assert from 'node:assert';
import { ROUTE, plekOpTijd, puntOpTijd } from './route.js';

// De tijden in de route lopen op
ROUTE.slice(1).forEach(([tijd], i) => assert.ok(tijd > ROUTE[i][0]));

// Begin, einde en precies op een regel van de route
assert.deepStrictEqual(plekOpTijd(-1), [52.0882, 5.12153]);
assert.deepStrictEqual(plekOpTijd(0), [52.0882, 5.12153]);
assert.deepStrictEqual(plekOpTijd(123), [52.09076, 5.12026]);
assert.deepStrictEqual(plekOpTijd(999), [52.09166, 5.11942]);

// Halverwege in de tijd is halverwege op de kaart
const [lat, lng] = plekOpTijd(2);
assert.ok(Math.abs(lat - 52.08828) < 1e-9);
assert.ok(Math.abs(lng - 5.1215) < 1e-9);

// Het juiste punt bij de tijd
const punten = [{ tijd: 5 }, { tijd: 40 }];
assert.strictEqual(puntOpTijd(punten, 4), undefined);
assert.strictEqual(puntOpTijd(punten, 5), punten[0]);
assert.strictEqual(puntOpTijd(punten, 39.9), punten[0]);
assert.strictEqual(puntOpTijd(punten, 100), punten[1]);

console.log('Alle tests van de route zijn goed.');
