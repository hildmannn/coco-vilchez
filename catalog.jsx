/* global React, Bolt, Check, Cart, Arrow, PhotoPlaceholder, CATEGORIES, CAT_NAME, BRANDS */
// catalog.jsx — category grid, filter rail, product cards, catalog + featured grids.

function money(n) {
  return "$" + n.toLocaleString("es-AR");
}

/* ---------- Category grid (light zone) ---------- */
function CategoryCard({ cat, onPick }) {
  const cls = cat.size === "big" ? "cat-card big" : cat.size === "wide" ? "cat-card wide" : "cat-card";
  return (
    <button className={cls} onClick={() => onPick(cat.id)}>
      <div className="cat-photo"><PhotoPlaceholder cat={cat.id} label={cat.name.toUpperCase()} /></div>
      <div className="cat-overlay"></div>
      <svg className="cat-sketch-border" preserveAspectRatio="none" viewBox="0 0 100 100">
        <rect x="1" y="1" width="98" height="98" pathLength="900" />
      </svg>
      <Bolt className="cat-dot" />
      <div className="cat-body">
        <div className="cat-name">{cat.name}</div>
        <div className="cat-count">{cat.count} repuestos</div>
        <span className="cat-cta">VER REPUESTOS <Arrow style={{ width: 15, height: 15 }} /></span>
      </div>
    </button>
  );
}

function CategoryGrid({ onPick }) {
  return (
    <div className="cat-grid">
      {CATEGORIES.map(c => <CategoryCard key={c.id} cat={c} onPick={onPick} />)}
    </div>
  );
}

/* ---------- Filters ---------- */
function CheckRow({ on, label, count, onToggle }) {
  return (
    <button className={`check-row ${on ? "on" : ""}`} onClick={onToggle}>
      <span className="check-box"><Check /></span>
      <span>{label}</span>
      {count != null && <span className="count">{count}</span>}
    </button>
  );
}

function Filters({ cats, toggleCat, brands, toggleBrand, maxPrice, setMaxPrice, priceCap, onClear, vehicle }) {
  return (
    <aside className="filters">
      <h4>FILTROS</h4>
      <div className="sub">Afiná tu búsqueda</div>

      {vehicle && (
        <div className="filter-group">
          <span className="fg-label">Tu vehículo</span>
          <div className="finder-result" style={{ marginTop: 0 }}>
            <span className="check"><Check style={{ width: 11, height: 11 }} /></span>
            <span style={{ fontSize: 12 }}><strong>{vehicle.make} {vehicle.model}</strong> {vehicle.year}</span>
          </div>
        </div>
      )}

      <div className="filter-group">
        <span className="fg-label">Categoría</span>
        {CATEGORIES.map(c => (
          <CheckRow key={c.id} label={c.name} count={c.count}
                    on={cats.includes(c.id)} onToggle={() => toggleCat(c.id)} />
        ))}
      </div>

      <div className="filter-group">
        <span className="fg-label">Marca</span>
        {BRANDS.map(b => (
          <CheckRow key={b} label={b} on={brands.includes(b)} onToggle={() => toggleBrand(b)} />
        ))}
      </div>

      <div className="filter-group">
        <span className="fg-label">Precio máximo · {money(maxPrice)}</span>
        <div className="price-row">
          <input type="range" min={2000} max={priceCap} step={1000}
                 value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
        </div>
      </div>

      <button className="filter-clear" onClick={onClear}>Limpiar filtros</button>
    </aside>
  );
}

/* ---------- Product card ---------- */
function ProductCard({ p, vehicle, featured }) {
  const compatible = vehicle && p.fits.includes(vehicle.make);
  return (
    <article className={`product-card ${featured ? "featured" : ""}`}>
      <div className="product-media">
        {compatible && (
          <span className="product-badge-compat">
            <Check /> COMPATIBLE CON TU {vehicle.make.toUpperCase()}
          </span>
        )}
        <span className="product-sku">{p.sku}</span>
        <PhotoPlaceholder cat={p.cat} label={p.name.toUpperCase()} />
      </div>
      <div className="product-body">
        <div className="product-cat">{CAT_NAME[p.cat]} · {p.brand}</div>
        <h3 className="product-name">{p.name}</h3>
        <p className="product-desc">{p.desc}</p>

        <div className="product-meta">
          {p.inStock
            ? <span className="stock-in" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span className="stock-dot"></span>En stock</span>
            : <span className="stock-out" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span className="stock-dot"></span>Sin stock</span>}
          <span className="fits-label">fits: {p.fits.length > 4 ? "universal" : p.fits.slice(0, 2).join(", ")}{p.fits.length > 2 && p.fits.length <= 4 ? "…" : ""}</span>
        </div>

        <div className="product-foot">
          <div className="price">
            <span className="amount"><span className="cur">$</span>{p.price.toLocaleString("es-AR")}</span>
            {p.old && <span className="old">{money(p.old)}</span>}
          </div>
          <button className="buy-btn" disabled={!p.inStock}>
            {p.inStock ? <React.Fragment><Cart /> COMPRAR</React.Fragment> : "AVISARME"}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Catalog grid (main, dark) ---------- */
function CatalogGrid({ products, vehicle, sort, setSort }) {
  return (
    <div>
      <div className="catalog-toolbar">
        <span className="result-count"><strong>{products.length}</strong> repuestos encontrados</span>
        {vehicle && (
          <span className="compat-flag"><Bolt style={{ width: 11, height: 15 }} /> Filtrado para {vehicle.make} {vehicle.model}</span>
        )}
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rel">Ordenar: Relevancia</option>
          <option value="low">Precio: menor a mayor</option>
          <option value="high">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="display">SIN RESULTADOS</div>
            <p>Probá quitar algún filtro o cambiá el vehículo seleccionado.</p>
          </div>
        ) : products.map(p => <ProductCard key={p.id} p={p} vehicle={vehicle} />)}
      </div>
    </div>
  );
}

function FeaturedStrip({ products, vehicle }) {
  return (
    <div className="product-grid featured">
      {products.map(p => <ProductCard key={p.id} p={p} vehicle={vehicle} featured />)}
    </div>
  );
}

Object.assign(window, { CategoryGrid, Filters, ProductCard, CatalogGrid, FeaturedStrip, money });
