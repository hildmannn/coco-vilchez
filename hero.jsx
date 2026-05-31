/* global React, Bolt, Check, Search, Arrow, VEHICLES, MAKES, CATEGORIES */
// hero.jsx — hero + vehicle finder. Three layout treatments via `layout` prop.

function VehicleFinder({ draft, setDraft, vehicle, onSearch, onClear }) {
  const models = draft.make ? Object.keys(VEHICLES[draft.make]) : [];
  const years = (draft.make && draft.model) ? VEHICLES[draft.make][draft.model] : [];
  const ready = draft.make && draft.model && draft.year;

  return (
    <div className="finder">
      <div className="finder-head">
        <Bolt className="bolt" />
        <h3>ENCONTRÁ TU REPUESTO</h3>
      </div>

      <div className="finder-fields">
        <div className="field">
          <label>Marca</label>
          <select value={draft.make}
                  onChange={(e) => setDraft({ make: e.target.value, model: "", year: "" })}>
            <option value="">Elegí marca</option>
            {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <span className="underline"></span>
        </div>

        <div className="field">
          <label>Modelo</label>
          <select value={draft.model} disabled={!draft.make}
                  onChange={(e) => setDraft({ ...draft, model: e.target.value, year: "" })}>
            <option value="">{draft.make ? "Elegí modelo" : "—"}</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <span className="underline"></span>
        </div>

        <div className="field">
          <label>Año</label>
          <select value={draft.year} disabled={!draft.model}
                  onChange={(e) => setDraft({ ...draft, year: e.target.value })}>
            <option value="">{draft.model ? "Elegí año" : "—"}</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <span className="underline"></span>
        </div>
      </div>

      <div className="finder-actions">
        <button className="btn btn-accent btn-block" disabled={!ready}
                style={!ready ? { opacity: 0.5, cursor: "not-allowed" } : null}
                onClick={() => ready && onSearch()}>
          <Search style={{ width: 16, height: 16 }} /> BUSCAR REPUESTOS
        </button>
      </div>

      {vehicle && (
        <div className="finder-result">
          <span className="check"><Check style={{ width: 11, height: 11 }} /></span>
          <span>Mostrando piezas para tu <strong>{vehicle.make} {vehicle.model} {vehicle.year}</strong></span>
          <button onClick={onClear}>Cambiar</button>
        </div>
      )}
    </div>
  );
}

function HeroPills({ onPick }) {
  const pills = CATEGORIES.slice(0, 6);
  return (
    <div className="hero-pills">
      <span className="pills-label">Más buscados</span>
      {pills.map(c => (
        <button key={c.id} className="pill" onClick={() => onPick(c.id)}>
          {c.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Hero({ layout, circuit, finderProps, onPickCategory }) {
  const headline = (
    <h1 className="hero-title">
      <span className="q">¿</span>QUÉ NECESITA<br />TU <span className="lit">VEHÍCULO</span><span className="q">?</span>
    </h1>
  );
  const eyebrow = (
    <span className="hero-eyebrow"><span className="tick"></span>Catálogo de repuestos eléctricos</span>
  );
  const sub = (
    <p className="hero-sub">Encontrá el repuesto eléctrico exacto para tu auto o camión. Decinos qué manejás y te mostramos sólo lo que encaja.</p>
  );

  return (
    <section id="top" className={`zone zone-dark hero circuit hero-layout-${layout} ${circuit ? "" : "circuit-off"}`}>
      <div className="zone-inner">
        <div className="hero-grid">
          {layout === "centered" ? (
            <React.Fragment>
              <div>
                {eyebrow}
                {headline}
                {sub}
              </div>
              <div style={{ maxWidth: 720, margin: "40px auto 0" }}>
                <VehicleFinder {...finderProps} />
              </div>
              <HeroPills onPick={onPickCategory} />
            </React.Fragment>
          ) : layout === "stack" ? (
            <React.Fragment>
              {eyebrow}
              {headline}
              {sub}
              <VehicleFinder {...finderProps} />
              <HeroPills onPick={onPickCategory} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>
                {eyebrow}
                {headline}
                {sub}
                <HeroPills onPick={onPickCategory} />
              </div>
              <div><VehicleFinder {...finderProps} /></div>
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, VehicleFinder });
