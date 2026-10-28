import { Marquee } from './Marquee';

const clients = [
  'Lumen',
  'Orbit AI',
  'Kinfolk Coffee',
  'Nova Health',
  'Pulse Analytics',
  'Foundry Ventures',
  'Northwind',
  'Fable Studios',
  'Hexa Labs',
];

/** Social-proof band between hero and about. */
export function TrustedBy() {
  return (
    <section aria-label="Trusted by" className="relative border-y border-white/5 bg-abyss/60 py-10">
      <p
        data-reveal
        className="mb-7 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-ink-3"
      >
        Trusted by teams at
      </p>
      <Marquee items={clients} duration={38} />
    </section>
  );
}
