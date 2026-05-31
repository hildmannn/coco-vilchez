/* global React */
// icons.jsx — brand glyphs, UI icons, and fine-line tool sketches.

const S = ({ children, vb = "0 0 24 24", fill = "none", stroke = "currentColor", sw = 1.6, style, className }) => (
  <svg viewBox={vb} fill={fill} stroke={fill === "none" ? stroke : "none"}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
       style={style} className={className} aria-hidden="true">
    {children}
  </svg>
);

/* ---- Brand: lightning bolt (vertical, slightly tilted) ---- */
const Bolt = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 32 46" fill="currentColor" aria-hidden="true">
    <path d="M20.5 1 4 25.5h9.2L11 45l17-26.5h-9.4L20.5 1Z" />
  </svg>
);

/* ---- UI icons (solid/filled where possible) ---- */
const Check = ({ className, style }) => (
  <S className={className} style={style}><path d="M4 12.5l5 5L20 6" sw={2.4} /></S>
);
const Cart = ({ className, style }) => (
  <S className={className} style={style} sw={1.8}>
    <path d="M2 3h3l2.2 12.5a2 2 0 0 0 2 1.7h8.4a2 2 0 0 0 2-1.6L21.5 7H6" />
    <circle cx="10" cy="21" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="21" r="1.4" fill="currentColor" stroke="none" />
  </S>
);
const Search = ({ className, style }) => (
  <S className={className} style={style} sw={2}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></S>
);
const Menu = ({ className, style }) => (
  <S className={className} style={style} sw={2}><path d="M3 6h18M3 12h18M3 18h18" /></S>
);
const Arrow = ({ className, style }) => (
  <S className={className} style={style} sw={2}><path d="M4 12h15M13 6l6 6-6 6" /></S>
);
const WhatsApp = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.08c-.25.69-1.45 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.62-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .39 0 .57.01.18.01.43-.07.67.51.25.6.84 2.06.91 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.71.81 2 .96.3.15.49.22.56.35.07.12.07.71-.18 1.4Z" />
  </svg>
);
const Instagram = ({ className, style }) => (
  <S className={className} style={style} sw={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </S>
);

/* ---- Tool sketches (decorative, behind light sections) ---- */
const Wrench = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <path d="M52 14a13 13 0 0 0-13 21L17 57a5 5 0 0 0 7 7l22-22a13 13 0 0 0 14-21l-7 7-6-2-2-6 7-7a13 13 0 0 0-0 0Z" />
    <circle cx="22" cy="59" r="1.4" fill="currentColor" stroke="none" />
  </S>
);
const SparkPlug = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <path d="M40 6c-5 0-8 3-8 8v6h16v-6c0-5-3-8-8-8Z" />
    <path d="M30 20h20v8H30zM32 28h16l-2 10H34zM35 38h10v8H35zM37 46h6v9l-3 5-3-5z" />
    <path d="M40 14v-8M33 12l-3-3M47 12l3-3" />
  </S>
);
const BoltNut = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <path d="M40 14l13 7v15l-13 7-13-7V21z" />
    <circle cx="40" cy="28.5" r="6" />
    <path d="M27 44h26v6l-4 16h-18l-4-16z" />
  </S>
);
const Connector = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <rect x="16" y="28" width="34" height="24" rx="3" />
    <path d="M50 34h8v12h-8M58 38h6M58 42h6" />
    <path d="M22 34v12M30 34v12M38 34v12" />
  </S>
);
const Coil = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <path d="M26 16c8 0 8 6 0 6s-8 6 0 6 8 6 0 6 8 6 0 6 8 6 0 6 8 6 0 6 8 6 0 6" transform="translate(14 4) rotate(0)" />
    <path d="M30 14c10 0 10 7 0 7s-10 7 0 7 10 7 0 7 10 7 0 7 10 7 0 7" />
    <path d="M40 8v6M40 60v8M34 68h12" />
  </S>
);
const Fuse = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <rect x="22" y="30" width="36" height="20" rx="4" />
    <path d="M30 40c4-6 6 6 10 0s6 6 10 0" />
    <path d="M22 36h-7M22 44h-7M58 36h7M58 44h7" />
  </S>
);
const Screwdriver = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <path d="M54 14l12 12-6 6-12-12z" />
    <path d="M48 20L22 46l-4 12 12-4 26-26" />
    <path d="M18 58l-4 4" />
  </S>
);
const Hammer = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <path d="M44 14l18 6-4 10-18-6 1-5z" />
    <path d="M42 24L20 56a4 4 0 0 1-7-4l20-30" />
  </S>
);
const Battery = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <rect x="14" y="28" width="52" height="30" rx="3" />
    <path d="M24 28v-5h10v5M46 28v-5h10v5" />
    <path d="M28 43h8M32 39v8M46 43h8" />
  </S>
);
const Gauge = ({ className, style }) => (
  <S className={className} style={style} sw={1.4} vb="0 0 80 80">
    <path d="M16 50a24 24 0 0 1 48 0" />
    <path d="M40 50l14-10" />
    <circle cx="40" cy="50" r="3" fill="currentColor" stroke="none" />
    <path d="M16 50h6M58 50h6M40 26v6" />
  </S>
);

/* ---- Product placeholder icons (per category) ---- */
const productIcon = {
  bujias: SparkPlug, bobinas: Coil, sensores: Gauge, alternadores: Battery,
  arranques: Battery, fusibles: Fuse, reles: Connector, cables: Connector,
};

/* ---- Edu / trust icons ---- */
const IconVehicle = ({ className, style }) => (
  <S className={className} style={style} sw={1.7} vb="0 0 32 32">
    <path d="M5 20l2-7a3 3 0 0 1 3-2h12a3 3 0 0 1 3 2l2 7" />
    <path d="M3 20h26v5h-3v-2H6v2H3z" />
    <circle cx="9" cy="22" r="2" fill="currentColor" stroke="none" />
    <circle cx="23" cy="22" r="2" fill="currentColor" stroke="none" />
  </S>
);
const IconManual = ({ className, style }) => (
  <S className={className} style={style} sw={1.7} vb="0 0 32 32">
    <path d="M6 4h14l6 6v18H6z" /><path d="M20 4v6h6" /><path d="M11 16h10M11 20h10M11 12h5" />
  </S>
);
const IconChat = ({ className, style }) => (
  <S className={className} style={style} sw={1.7} vb="0 0 32 32">
    <path d="M5 7h22v15H14l-6 5v-5H5z" /><path d="M11 13h10M11 17h6" />
  </S>
);
const IconTools = ({ className, style }) => (
  <S className={className} style={style} sw={1.7} vb="0 0 32 32">
    <path d="M20 7a5 5 0 0 0-5 8l-9 9 3 3 9-9a5 5 0 0 0 8-5l-3 3-3-1-1-3z" />
  </S>
);
const IconShield = ({ className, style }) => (
  <S className={className} style={style} sw={1.7} vb="0 0 32 32">
    <path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7z" /><path d="M11 16l4 4 7-8" />
  </S>
);
const IconTruck = IconVehicle;

Object.assign(window, {
  Bolt, Check, Cart, Search, Menu, Arrow, WhatsApp, Instagram,
  Wrench, SparkPlug, BoltNut, Connector, Coil, Fuse, Screwdriver, Hammer, Battery, Gauge,
  productIcon, IconVehicle, IconManual, IconChat, IconTools, IconShield, IconTruck,
});
