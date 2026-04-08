import { Filter } from "lucide-react";
import { GameCategory } from "../backend";
import type { CategoryFilter as CategoryFilterValue } from "../types/casino";

const FILTERS: { label: string; value: CategoryFilterValue }[] = [
  { label: "All Games", value: "All" },
  { label: "Slots", value: GameCategory.Slots },
  { label: "Table Games", value: GameCategory.TableGames },
  { label: "Card Games", value: GameCategory.CardGames },
];

interface CategoryFilterProps {
  active: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <fieldset
      className="flex items-center gap-2 flex-wrap border-0 p-0 m-0"
      aria-label="Filter games by category"
      data-ocid="category-filters"
    >
      <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onChange(f.value)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            active === f.value
              ? "bg-primary text-primary-foreground shadow"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
          aria-pressed={active === f.value}
          data-ocid={`filter-${f.value}`}
        >
          {f.label}
        </button>
      ))}
    </fieldset>
  );
}
