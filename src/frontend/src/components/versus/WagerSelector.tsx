import { WagerAmount } from "../../backend";

interface WagerSelectorProps {
  selected: WagerAmount;
  onChange: (wager: WagerAmount) => void;
  disabled?: boolean;
}

const WAGER_OPTIONS: { value: WagerAmount; label: string }[] = [
  { value: WagerAmount.Ten, label: "10 ICP" },
  { value: WagerAmount.Thirty, label: "30 ICP" },
  { value: WagerAmount.OneHundred, label: "100 ICP" },
];

export function WagerSelector({
  selected,
  onChange,
  disabled,
}: WagerSelectorProps) {
  return (
    <fieldset data-ocid="wager-selector" className="contents">
      <legend className="sr-only">Select wager amount</legend>
      <div className="flex gap-3 flex-wrap">
        {WAGER_OPTIONS.map(({ value, label }) => {
          const isActive = selected === value;
          const id = `wager-${value.toLowerCase()}`;
          return (
            <label
              key={value}
              htmlFor={id}
              className={`versus-wager-button cursor-pointer select-none${isActive ? " active" : ""}${disabled ? " opacity-40 cursor-not-allowed" : ""}`}
            >
              <input
                id={id}
                type="radio"
                name="wager"
                value={value}
                checked={isActive}
                disabled={disabled}
                onChange={() => onChange(value)}
                className="sr-only"
                data-ocid={`wager-btn-${value.toLowerCase()}`}
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
