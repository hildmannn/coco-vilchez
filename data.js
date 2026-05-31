// data.js — catalog data: vehicles, categories, products + compatibility.

const VEHICLES = {
  Volkswagen: { Gol: [2008, 2012, 2016, 2020], Amarok: [2012, 2016, 2020, 2023], Suran: [2010, 2014, 2018] },
  Chevrolet:  { Corsa: [2006, 2010, 2014], Onix: [2016, 2019, 2022], "S10": [2013, 2017, 2021] },
  Ford:       { Ranger: [2012, 2016, 2020, 2023], Ka: [2014, 2018, 2021], Focus: [2010, 2014, 2018] },
  Fiat:       { Palio: [2008, 2012, 2016], Cronos: [2018, 2021, 2024], Toro: [2017, 2020, 2023] },
  Renault:    { Clio: [2008, 2012, 2016], Kangoo: [2010, 2015, 2019], Sandero: [2015, 2019, 2022] },
  Toyota:     { Hilux: [2012, 2016, 2020, 2023], Etios: [2014, 2018, 2021], Corolla: [2014, 2018, 2022] },
  Peugeot:    { "208": [2013, 2017, 2021], "308": [2012, 2016, 2019], Partner: [2010, 2015, 2019] },
};

const MAKES = Object.keys(VEHICLES);

const CATEGORIES = [
  { id: "bujias",      name: "Bujías",      count: 42, size: "big" },
  { id: "bobinas",     name: "Bobinas",     count: 28 },
  { id: "sensores",    name: "Sensores",    count: 64, size: "wide" },
  { id: "alternadores",name: "Alternadores",count: 19 },
  { id: "arranques",   name: "Arranques",   count: 23 },
  { id: "fusibles",    name: "Fusibles",    count: 51 },
  { id: "reles",       name: "Relés",       count: 37 },
  { id: "cables",      name: "Cables",      count: 45 },
];

const CAT_NAME = Object.fromEntries(CATEGORIES.map(c => [c.id, c.name]));

const BRANDS = ["Bosch", "NGK", "Valeo", "Denso", "Magneti Marelli"];

// helper to build products
let _sku = 1000;
function P(o) {
  _sku += 7;
  return {
    id: o.id,
    name: o.name,
    cat: o.cat,
    brand: o.brand,
    desc: o.desc,
    price: o.price,
    old: o.old || null,
    inStock: o.inStock !== false,
    sku: "CV-" + o.cat.slice(0, 3).toUpperCase() + "-" + _sku,
    fits: o.fits,        // array of makes it's compatible with
    featured: !!o.featured,
  };
}

const ALL = MAKES; // compatible with all makes

const PRODUCTS = [
  P({ id: 1,  name: "Bujía Iridium IX", cat: "bujias", brand: "NGK", price: 8900, old: 11200,
      desc: "Encendido estable y menor consumo. Electrodo de iridio de larga duración.",
      fits: ["Volkswagen", "Chevrolet", "Ford", "Fiat"], featured: true }),
  P({ id: 2,  name: "Bobina de Encendido", cat: "bobinas", brand: "Bosch", price: 24500,
      desc: "Genera la alta tensión para la chispa. Repuesto directo, conector original.",
      fits: ["Volkswagen", "Renault", "Peugeot"], featured: true }),
  P({ id: 3,  name: "Sensor de Cigüeñal", cat: "sensores", brand: "Valeo", price: 18700,
      desc: "Mide la posición del cigüeñal para sincronizar el encendido y la inyección.",
      fits: ["Ford", "Chevrolet", "Toyota"] }),
  P({ id: 4,  name: "Alternador 90A", cat: "alternadores", brand: "Valeo", price: 142000, old: 159000,
      desc: "Carga la batería y alimenta el sistema eléctrico con el motor en marcha.",
      fits: ["Volkswagen", "Ford"], featured: true }),
  P({ id: 5,  name: "Motor de Arranque", cat: "arranques", brand: "Bosch", price: 118500,
      desc: "Hace girar el motor en el arranque. Engranaje reforzado, alto torque.",
      fits: ["Chevrolet", "Fiat", "Renault"] }),
  P({ id: 6,  name: "Kit de Fusibles", cat: "fusibles", brand: "Magneti Marelli", price: 4200,
      desc: "Surtido de fusibles de cuchilla 5–30A. Protegen cada circuito del vehículo.",
      fits: ALL }),
  P({ id: 7,  name: "Relé Universal 5 Patas", cat: "reles", brand: "Bosch", price: 5600,
      desc: "Conmuta cargas de alto amperaje con baja señal de control. 12V / 40A.",
      fits: ALL }),
  P({ id: 8,  name: "Cable de Bujía x4", cat: "cables", brand: "NGK", price: 21300,
      desc: "Conduce la alta tensión de la bobina a las bujías. Aislación siliconada.",
      fits: ["Volkswagen", "Chevrolet", "Fiat"] }),
  P({ id: 9,  name: "Sensor de Oxígeno", cat: "sensores", brand: "Denso", price: 32400,
      desc: "Mide el oxígeno en el escape para optimizar la mezcla aire-combustible.",
      fits: ["Toyota", "Ford", "Peugeot"], featured: true }),
  P({ id: 10, name: "Bujía de Precalentado", cat: "bujias", brand: "Bosch", price: 9800,
      desc: "Para motores diésel. Calienta la cámara para el arranque en frío.",
      fits: ["Ford", "Toyota", "Volkswagen"] }),
  P({ id: 11, name: "Bobina Doble Chispa", cat: "bobinas", brand: "Magneti Marelli", price: 27800,
      desc: "Alimenta dos cilindros por bobina. Mayor precisión de encendido.",
      fits: ["Fiat", "Peugeot"], inStock: false }),
  P({ id: 12, name: "Sensor MAP", cat: "sensores", brand: "Valeo", price: 16900,
      desc: "Mide la presión del múltiple de admisión para calcular la carga del motor.",
      fits: ["Chevrolet", "Renault", "Fiat"] }),
  P({ id: 13, name: "Regulador de Voltaje", cat: "alternadores", brand: "Bosch", price: 14600,
      desc: "Regula el voltaje del alternador para no dañar la batería ni la electrónica.",
      fits: ["Volkswagen", "Ford", "Chevrolet"], featured: true }),
  P({ id: 14, name: "Solenoide de Arranque", cat: "arranques", brand: "Valeo", price: 12900,
      desc: "Activa el motor de arranque y conecta el piñón con el volante del motor.",
      fits: ["Fiat", "Renault", "Peugeot"] }),
  P({ id: 15, name: "Caja Porta-Fusibles", cat: "fusibles", brand: "Magneti Marelli", price: 7400,
      desc: "Aloja y organiza los fusibles principales. Bornes anticorrosión.",
      fits: ALL }),
];

Object.assign(window, { VEHICLES, MAKES, CATEGORIES, CAT_NAME, BRANDS, PRODUCTS });
