import { SlotMachine } from "./SlotMachine";

const MACHINES = [
  { id: "lucky-reels", title: "Lucky Reels" },
  { id: "classic-slots", title: "Classic Slots" },
  { id: "golden-spin", title: "Golden Spin" },
] as const;

export function SlotMachineSection() {
  return (
    <section
      id="slot-machines"
      aria-label="Slot machines"
      className="py-4"
      data-ocid="slot-machine-section"
    >
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Slot Machines
        </h2>
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{
            background: "oklch(var(--primary) / 0.18)",
            color: "oklch(var(--primary))",
            border: "1px solid oklch(var(--primary) / 0.35)",
          }}
        >
          Demo
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Machines grid — 3 across on md+, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MACHINES.map((machine) => (
          <SlotMachine key={machine.id} title={machine.title} />
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        Demo mode — no real ICP is wagered. Spins are purely visual.
      </p>
    </section>
  );
}
