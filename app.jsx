/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakColor,
   Bolt, Search, Menu, PRODUCTS, Hero, CategoryGrid, Filters, CatalogGrid, FeaturedStrip,
   Educational, TrustBar, Contact, Footer, Logo, SketchLayer,
   Wrench, SparkPlug, BoltNut, Connector, Coil, Fuse, Screwdriver, Hammer */
// app.jsx — root component: state, filtering, tweaks, assembly.

const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "split",
  "heroScale": 1,
  "circuit": true,
  "gridOpacity": 0.07,
  "gridSize": 26,
  "accent": "#CC2222",
  "sketchDensity": "media"
}/*EDITMODE-END*/;

const PRICE_CAP = 160000;

const EDU_SKETCHES = [
  { C: Wrench, top: "-4%", left: "70%", size: 230, rot: 18 },
  { C: Fuse, top: "55%", left: "4%", size: 150, rot: -12 },
  { C: Connector, top: "10%", left: "30%", size: 120, rot: 8 },
  { C: BoltNut, top: "68%", left: "82%", size: 110, rot: -20 },
  { C: Coil, top: "30%", left: "54%", size: 130, rot: 14 },
];
const TRUST_SKETCHES = [
  { C: Screwdriver, top: "-10%", left: "8%", size: 200, rot: 24 },
  { C: SparkPlug, top: "30%", left: "88%", size: 140, rot: -10 },
  { C: Hammer, top: "50%", left: "44%", size: 130, rot: 16 },
];
const CAT_SKETCHES = [
  { C: SparkPlug, top: "-6%", left: "2%", size: 240, rot: -14 },
  { C: BoltNut, top: "62%", left: "90%", size: 160, rot: 20 },
  { C: Coil, top: "8%", left: "92%", size: 130, rot: 10 },
  { C: Wrench, top: "72%", left: "30%", size: 180, rot: -8 },
  { C: Connector, top: "40%", left: "60%", size: 120, rot: 16 },
  { C: Fuse, top: "20%", left: "40%", size: 110, rot: -18 },
];

const DENSITY_COUNT = { sutil: 2, media: 4, alta: 7 };
const DENSITY_OPACITY = { sutil: 0.07, media: 0.12, alta: 0.18 };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // ---- finder + vehicle ----
  const [draft, setDraft] = useState({ make: "", model: "", year: "" });
  const [vehicle, setVehicle] = useState(null);

  // ---- filters ----
  const [cats, setCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_CAP);
  const [sort, setSort] = useState("rel");

  const [scrolled, setScrolled] = useState(false);

  // apply tweaks → CSS vars
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--hero-scale", t.heroScale);
    r.setProperty("--grid-opacity", t.gridOpacity);
    r.setProperty("--grid-size", t.gridSize + "px");
    r.setProperty("--grid-strong", (t.gridOpacity * 1.9).toFixed(3));
    r.setProperty("--accent", t.accent);
    r.setProperty("--grid-color", "#0057B8");
    r.setProperty("--sketch-opacity", DENSITY_OPACITY[t.sketchDensity] ?? 0.12);
  }, [t]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };

  const focusFinder = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const sel = document.querySelector(".finder select");
      if (sel) sel.focus();
    }, 600);
  };

  const onSearch = () => {
    setVehicle({ make: draft.make, model: draft.model, year: draft.year });
    setTimeout(() => scrollTo("catalogo"), 80);
  };
  const onClearVehicle = () => { setVehicle(null); setDraft({ make: "", model: "", year: "" }); };

  const pickCategory = (id) => {
    setCats([id]);
    setTimeout(() => scrollTo("catalogo"), 40);
  };

  const toggleCat = (id) => setCats(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  const toggleBrand = (b) => setBrands(c => c.includes(b) ? c.filter(x => x !== b) : [...c, b]);
  const clearFilters = () => { setCats([]); setBrands([]); setMaxPrice(PRICE_CAP); };

  // ---- filtered products ----
  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (cats.length === 0 || cats.includes(p.cat)) &&
      (brands.length === 0 || brands.includes(p.brand)) &&
      (p.price <= maxPrice) &&
      (!vehicle || p.fits.includes(vehicle.make))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cats, brands, maxPrice, sort, vehicle]);

  const featured = useMemo(() => {
    let list = PRODUCTS.filter(p => p.featured);
    if (vehicle) {
      const fit = list.filter(p => p.fits.includes(vehicle.make));
      list = fit.length >= 3 ? fit : list;
    }
    return list.slice(0, 3);
  }, [vehicle]);

  const sliceN = DENSITY_COUNT[t.sketchDensity] ?? 4;

  return (
    <React.Fragment>
      {/* HEADER */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Logo />
          <button className="header-mini-search" onClick={focusFinder}>
            <Bolt className="bolt" /> Buscar tu vehículo
          </button>
          <nav className="header-nav">
            <a href="#categorias" onClick={(e) => { e.preventDefault(); scrollTo("categorias"); }}>Categorías</a>
            <a href="#catalogo" onClick={(e) => { e.preventDefault(); scrollTo("catalogo"); }}>Catálogo</a>
            <a href="#guia" onClick={(e) => { e.preventDefault(); scrollTo("guia"); }}>Cómo elegir</a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollTo("contacto"); }}>Contacto</a>
          </nav>
          <a className="header-cta" href="#contacto" onClick={(e) => { e.preventDefault(); scrollTo("contacto"); }}>WHATSAPP</a>
          <button className="nav-toggle" aria-label="Menú" onClick={() => scrollTo("categorias")}><Menu /></button>
        </div>
      </header>

      {/* HERO */}
      <Hero
        layout={t.heroLayout}
        circuit={t.circuit}
        onPickCategory={pickCategory}
        finderProps={{ draft, setDraft, vehicle, onSearch, onClear: onClearVehicle }}
      />

      {/* CATEGORY GRID (light) */}
      <section id="categorias" className="zone zone-light graph-paper">
        <SketchLayer items={CAT_SKETCHES.slice(0, sliceN + 1)} />
        <div className="zone-inner">
          <div className="section-head">
            <span className="section-kicker"><span className="tick"></span>Explorá por sistema</span>
            <h2 className="section-title">EL TABLERO<br />DE REPUESTOS</h2>
            <p className="section-lead">Todo el sistema eléctrico de tu vehículo, ordenado. Entrá a la categoría que necesitás y filtrá por tu modelo.</p>
          </div>
          <CategoryGrid onPick={pickCategory} />
        </div>
      </section>

      {/* CATALOG (dark) */}
      <section id="catalogo" className="zone zone-dark">
        <div className="zone-inner">
          <div className="section-head">
            <span className="section-kicker" style={{ color: "var(--azul-electrico)" }}><span className="tick"></span>Catálogo</span>
            <h2 className="section-title">ENCONTRÁ EL<br />REPUESTO EXACTO</h2>
          </div>
          <div className="catalog-layout">
            <Filters
              cats={cats} toggleCat={toggleCat}
              brands={brands} toggleBrand={toggleBrand}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice} priceCap={PRICE_CAP}
              onClear={clearFilters} vehicle={vehicle}
            />
            <CatalogGrid products={filtered} vehicle={vehicle} sort={sort} setSort={setSort} />
          </div>
        </div>
      </section>

      {/* EDUCATIONAL (light) */}
      <section id="guia" className="zone zone-light graph-paper">
        <SketchLayer items={EDU_SKETCHES.slice(0, sliceN)} />
        <div className="zone-inner">
          <Educational onFocusFinder={focusFinder} />
        </div>
      </section>

      {/* FEATURED (dark) */}
      <section className="zone zone-dark">
        <div className="zone-inner">
          <div className="section-head">
            <span className="section-kicker" style={{ color: "var(--azul-electrico)" }}><span className="tick"></span>Lo que más sale</span>
            <h2 className="section-title">LOS MÁS<br />PEDIDOS</h2>
          </div>
          <FeaturedStrip products={featured} vehicle={vehicle} />
        </div>
      </section>

      {/* TRUST (light) */}
      <section className="zone zone-light graph-paper">
        <SketchLayer items={TRUST_SKETCHES.slice(0, Math.max(2, sliceN - 1))} />
        <div className="zone-inner" style={{ paddingTop: "clamp(48px,6vw,88px)", paddingBottom: "clamp(48px,6vw,88px)" }}>
          <TrustBar />
        </div>
      </section>

      {/* CONTACT (dark) */}
      <Contact />

      {/* FOOTER */}
      <Footer />

      {/* TWEAKS */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Disposición" value={t.heroLayout}
                    options={["split", "centered", "stack"]}
                    onChange={(v) => setTweak("heroLayout", v)} />
        <TweakSlider label="Tamaño del título" value={t.heroScale} min={0.7} max={1.3} step={0.05}
                     onChange={(v) => setTweak("heroScale", v)} />
        <TweakToggle label="Patrón de circuito" value={t.circuit}
                     onChange={(v) => setTweak("circuit", v)} />

        <TweakSection label="Papel milimetrado" />
        <TweakSlider label="Intensidad de grilla" value={t.gridOpacity} min={0.03} max={0.14} step={0.005}
                     onChange={(v) => setTweak("gridOpacity", v)} />
        <TweakSlider label="Tamaño de grilla" value={t.gridSize} min={18} max={40} step={2} unit="px"
                     onChange={(v) => setTweak("gridSize", v)} />
        <TweakRadio label="Densidad de bocetos" value={t.sketchDensity}
                    options={["sutil", "media", "alta"]}
                    onChange={(v) => setTweak("sketchDensity", v)} />

        <TweakSection label="Acento" />
        <TweakColor label="Color de acento" value={t.accent}
                    options={["#CC2222", "#E8590C", "#0057B8", "#1F9D55"]}
                    onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
