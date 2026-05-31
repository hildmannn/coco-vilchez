/* global React, Bolt, WhatsApp, Instagram, Arrow, Search, IconVehicle, IconManual, IconChat, IconTools, IconShield, IconTruck, Logo */
// sections.jsx — educational break, trust bar, contact CTA, footer.

const EDU_STEPS = [
  { n: "01", Icon: IconVehicle, t: "Cargá tu vehículo", d: "Ingresá marca, modelo y año arriba. El catálogo filtra solo lo compatible." },
  { n: "02", Icon: IconManual, t: "Buscá el código original", d: "Comparalo con el número de la pieza en tu manual o en la pieza vieja." },
  { n: "03", Icon: IconChat, t: "Confirmá con nosotros", d: "Si tenés dudas, escribinos. Te respondemos rápido y sin vueltas." },
];

function Educational({ onFocusFinder }) {
  return (
    <div>
      <div className="section-head">
        <span className="section-kicker"><span className="tick"></span>Guía rápida</span>
        <h2 className="section-title">CÓMO SABER<br />SI TE SIRVE</h2>
        <p className="section-lead">No queremos venderte la pieza equivocada. En tres pasos verificás que el repuesto encaja en tu vehículo antes de comprar.</p>
      </div>
      <div className="edu-grid">
        {EDU_STEPS.map(s => (
          <div className="edu-card" key={s.n}>
            <div className="edu-num">{s.n}</div>
            <s.Icon className="edu-icon" />
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
      <button className="btn btn-accent" style={{ marginTop: 30 }} onClick={onFocusFinder}>
        <Search style={{ width: 15, height: 15 }} /> CONSULTAR COMPATIBILIDAD
      </button>
    </div>
  );
}

const TRUST = [
  { Icon: IconShield, t: "Originales y compatibles", d: "Cada repuesto está verificado. Si lo marcamos compatible, encaja." },
  { Icon: IconTools, t: "Respuesta técnica incluida", d: "Te orientamos sobre la instalación y el diagnóstico, sin costo." },
  { Icon: IconTruck, t: "Entrega rápida", d: "Despachamos el mismo día a todo el país. Seguimiento en cada envío." },
];

function TrustBar() {
  return (
    <div className="trust-grid">
      {TRUST.map((x, i) => (
        <div className="trust-item" key={i}>
          <x.Icon className="trust-icon" />
          <div>
            <h4>{x.t}</h4>
            <p>{x.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <section id="contacto" className="zone zone-dark contact">
      <Bolt className="giant-bolt" />
      <div className="zone-inner">
        <span className="hero-eyebrow"><span className="tick"></span>Estamos para ayudarte</span>
        <h2 className="contact-title">¿NO ENCONTRÁS<br />LO QUE BUSCÁS?</h2>
        <p className="contact-sub">Escribinos y te conseguimos la pieza. Mandanos el dato de tu vehículo o el código original y la ubicamos.</p>
        <div className="contact-actions">
          <a className="btn btn-wa" href="#contacto">
            <WhatsApp style={{ width: 18, height: 18 }} /> ESCRIBIR POR WHATSAPP
          </a>
          <a className="btn btn-ghost" href="#catalogo">
            VER TODO EL CATÁLOGO <Arrow style={{ width: 16, height: 16 }} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <React.Fragment>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-col footer-brand">
            <Logo />
            <p>Repuestos eléctricos para autos y camiones. Disponibles ahora, explicados claro, directo al grano.</p>
            <div className="footer-social">
              <a href="#contacto" aria-label="WhatsApp"><WhatsApp /></a>
              <a href="#contacto" aria-label="Instagram"><Instagram /></a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Catálogo</h5>
            <a href="#categorias">Bujías</a>
            <a href="#categorias">Bobinas</a>
            <a href="#categorias">Sensores</a>
            <a href="#categorias">Alternadores</a>
          </div>
          <div className="footer-col">
            <h5>Ayuda</h5>
            <a href="#guia">Cómo saber si te sirve</a>
            <a href="#contacto">Compatibilidad</a>
            <a href="#contacto">Envíos</a>
          </div>
          <div className="footer-col">
            <h5>Contacto</h5>
            <a href="#contacto">WhatsApp</a>
            <a href="#contacto">Instagram</a>
            <a href="#contacto">Mayoristas</a>
          </div>
        </div>
      </footer>
      <div className="footer-bar">
        <span>© 2026 COCO VILCHEZ · Repuestos Eléctricos</span>
        <a href="#top">Volver arriba ↑</a>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Educational, TrustBar, Contact, Footer });
