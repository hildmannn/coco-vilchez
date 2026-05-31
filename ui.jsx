/* global React, Bolt, Wrench, SparkPlug, BoltNut, Connector, Coil, Fuse, Screwdriver, Hammer, productIcon */
// ui.jsx — shared building blocks: sketch background layer, photo placeholder, logo.

function Logo({ small }) {
  return (
    <a className="logo" href="#top" aria-label="COCO VILCHEZ inicio">
      <Bolt className="bolt" />
      <span className="wordmark">
        COCO VILCHEZ
        {!small && <small>REPUESTOS ELÉCTRICOS</small>}
      </span>
    </a>
  );
}

// Scattered fine-line tool sketches behind light sections.
const SKETCH_KINDS = [Wrench, SparkPlug, BoltNut, Connector, Coil, Fuse, Screwdriver, Hammer];

function SketchLayer({ items }) {
  return (
    <div className="sketch-layer" aria-hidden="true">
      {items.map((it, i) => {
        const C = it.C;
        return (
          <div key={i} className="sketch"
               style={{
                 top: it.top, left: it.left, width: it.size, height: it.size,
                 transform: `rotate(${it.rot}deg)`,
               }}>
            <C />
          </div>
        );
      })}
    </div>
  );
}

// Product / category photo placeholder with the unifying #0057B8 overlay.
function PhotoPlaceholder({ cat, label }) {
  const Icon = (productIcon && productIcon[cat]) || BoltNut;
  return (
    <div className="photo-ph">
      <Icon className="ph-icon" />
      <div className="overlay"></div>
      <span className="ph-tag">[ {label || "FOTO DEL REPUESTO"} ]</span>
    </div>
  );
}

Object.assign(window, { Logo, SketchLayer, PhotoPlaceholder, SKETCH_KINDS });
