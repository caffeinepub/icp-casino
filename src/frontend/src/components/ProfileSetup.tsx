import { useState } from "react";
import { useSetProfile } from "../hooks/use-profile";

interface ProfileSetupProps {
  onComplete: () => void;
}

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const MIN_LEN = 3;
const MAX_LEN = 20;

const ICON_CATEGORIES: { label: string; icons: string[] }[] = [
  {
    label: "Casino & Luck",
    icons: [
      "🎰",
      "🃏",
      "🎲",
      "🎴",
      "🎳",
      "🎱",
      "🍀",
      "🔮",
      "🪙",
      "💎",
      "🏆",
      "👑",
    ],
  },
  {
    label: "Astrology",
    icons: [
      "♈",
      "♉",
      "♊",
      "♋",
      "♌",
      "♍",
      "♎",
      "♏",
      "♐",
      "♑",
      "♒",
      "♓",
      "⭐",
      "🌙",
      "☀️",
      "🌟",
    ],
  },
  {
    label: "Emoticons",
    icons: [
      "😎",
      "😈",
      "🤑",
      "🥳",
      "😤",
      "🤯",
      "🥶",
      "👻",
      "💀",
      "🤖",
      "👾",
      "🎭",
    ],
  },
  {
    label: "Country Flags",
    icons: [
      "🇺🇸",
      "🇬🇧",
      "🇩🇪",
      "🇫🇷",
      "🇯🇵",
      "🇨🇳",
      "🇧🇷",
      "🇨🇦",
      "🇦🇺",
      "🇲🇽",
      "🇰🇷",
      "🇮🇳",
      "🇷🇺",
      "🇮🇹",
      "🇪🇸",
      "🇸🇦",
    ],
  },
];

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [username, setUsername] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const { setProfile, isLoading, error } = useSetProfile();

  const isValidUsername =
    username.length >= MIN_LEN &&
    username.length <= MAX_LEN &&
    USERNAME_REGEX.test(username);

  const canSubmit = isValidUsername && selectedIcon !== null;

  async function handleSubmit() {
    if (!canSubmit) return;
    try {
      await setProfile(username, selectedIcon!);
      onComplete();
    } catch {
      // error shown via `error` state
    }
  }

  async function handleSkip() {
    onComplete();
  }

  const charCountClass =
    username.length === 0
      ? "profile-char-count"
      : isValidUsername
        ? "profile-char-count profile-char-count-valid"
        : "profile-char-count profile-char-count-invalid";

  return (
    <div className="profile-modal-overlay" data-ocid="profile-setup-overlay">
      <div
        className="profile-card"
        style={{ maxWidth: 560, maxHeight: "92vh", overflowY: "auto" }}
      >
        <div className="profile-card-content">
          {/* Header */}
          <div className="profile-header">
            <h1 className="tech-text glitch-text neon-glow">ACCOUNT SETUP</h1>
            <p>Choose a username and icon to identify yourself in the arena</p>
          </div>

          {/* Icon Picker */}
          <div className="profile-icon-picker" data-ocid="profile-icon-picker">
            <p className="profile-username-label mb-3">CHOOSE YOUR ICON</p>

            <div
              className="profile-icon-scroll"
              style={{ maxHeight: 260, overflowY: "auto" }}
            >
              {ICON_CATEGORIES.map((category) => (
                <div key={category.label} className="mb-4">
                  <p className="profile-icon-category-label">
                    {category.label}
                  </p>
                  <div className="profile-icon-grid">
                    {category.icons.map((icon) => {
                      const isSelected = selectedIcon === icon;
                      return (
                        <button
                          key={icon}
                          type="button"
                          className={`profile-icon-btn${isSelected ? " profile-icon-btn-selected" : ""}`}
                          onClick={() => setSelectedIcon(icon)}
                          aria-label={`Select icon ${icon}`}
                          aria-pressed={isSelected}
                          data-ocid="profile-icon-option"
                        >
                          <span className="profile-icon-emoji">{icon}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {selectedIcon && (
              <div className="profile-icon-selected-preview">
                <span className="profile-icon-preview-emoji">
                  {selectedIcon}
                </span>
                <span className="profile-icon-preview-label">Selected</span>
              </div>
            )}
          </div>

          {/* Username Input */}
          <div className="profile-username-group">
            <label htmlFor="username-input" className="profile-username-label">
              USERNAME
            </label>
            <input
              id="username-input"
              type="text"
              className="profile-username-input"
              placeholder="Enter your username..."
              value={username}
              maxLength={MAX_LEN}
              onChange={(e) => setUsername(e.target.value)}
              data-ocid="profile-username-input"
              autoComplete="off"
              spellCheck={false}
            />
            <div className={charCountClass}>
              <span>
                {username.length > 0 && !USERNAME_REGEX.test(username)
                  ? "Letters, numbers and _ only"
                  : username.length > 0 && username.length < MIN_LEN
                    ? `Min ${MIN_LEN} characters`
                    : isValidUsername
                      ? "✓ Valid username"
                      : "3–20 characters · letters, numbers, underscores"}
              </span>
              <span>
                {username.length}/{MAX_LEN}
              </span>
            </div>
            {error && (
              <p
                className="mt-2 text-sm"
                style={{ color: "oklch(0.4 0.15 300)" }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="profile-actions">
            <button
              type="button"
              className="profile-btn-complete plasma-button"
              disabled={!canSubmit || isLoading}
              onClick={handleSubmit}
              data-ocid="profile-submit-btn"
              aria-label="Enter the casino"
            >
              {isLoading ? "INITIALIZING..." : "ENTER THE CASINO"}
            </button>
            <button
              type="button"
              className="profile-btn-skip"
              onClick={handleSkip}
              disabled={isLoading}
              data-ocid="profile-skip-btn"
              aria-label="Skip profile setup"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
